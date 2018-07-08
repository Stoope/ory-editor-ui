import React from "react";
import { DropTarget as dropTarget } from "react-dnd";
import FloatingActionButton from "@material-ui/core/Button";
import { connect } from "react-redux";
import classNames from "classnames";
import { removeCell } from "ory-editor-core/lib/actions/cell/core";
import throttle from "lodash.throttle";
import {
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode
} from "ory-editor-core/lib/selector/display";
import { createStructuredSelector } from "reselect";

import Provider from "../Provider";

const target = {
  hover: throttle(
    (props, monitor) => {
      const item = monitor.getItem();
      if (monitor.isOver({ shallow: true })) {
        item.clearHover();
      }
    },
    200,
    { trailing: false }
  ),

  drop(props, monitor) {
    const item = monitor.getItem();
    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return;
    }

    props.removeCell(item.id);
  }
};

const connectMonitor = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
});

const Raw = ({ isLayoutMode, connectDropTarget, isOverCurrent }) => {
  return connectDropTarget(
    <div
      className={classNames("ory-controls-trash", {
        "ory-controls-trash-active": isLayoutMode
      })}
    >
      <FloatingActionButton
        color="secondary"
        disabled={!isOverCurrent}
        variant="fab"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill={!isOverCurrent ? "rgba(255,255,255,.87)" : undefined}
            color={!isOverCurrent ? "rgba(255,255,255,.87)" : undefined}
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </FloatingActionButton>
    </div>
  );
};

const types = ({ editor }) => {
  const plugins = [
    ...Object.keys(editor.plugins.plugins.layout),
    ...Object.keys(editor.plugins.plugins.content)
  ].map(
    p =>
      editor.plugins.plugins.content[p].name ||
      editor.plugins.plugins.layout[p].name
  );

  if (editor.plugins.hasNativePlugin()) {
    plugins.push(editor.plugins.getNativePlugin()().name);
  }

  return plugins;
};

const mapDispatchToProps = {
  removeCell
};

const mapStateToProps = createStructuredSelector({
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode
});

const Decorated = connect(
  mapStateToProps,
  mapDispatchToProps
)(dropTarget(types, target, connectMonitor)(Raw));

const Trash = props => (
  <Provider {...props}>
    <Decorated {...props} />
  </Provider>
);

export default Trash;
