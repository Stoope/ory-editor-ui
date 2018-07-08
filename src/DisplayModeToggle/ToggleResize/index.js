import React from "react";
import { connect } from "react-redux";
import { resizeMode } from "ory-editor-core/lib/actions/display";
import { isResizeMode } from "ory-editor-core/lib/selector/display";
import { createStructuredSelector } from "reselect";

import Button from "../Button";

const Inner = ({ isResizeMode, resizeMode }) => (
  <Button
    icon={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z" />
      </svg>
    }
    description="Изменить размер"
    active={isResizeMode}
    onClick={resizeMode}
  />
);

const mapStateToProps = createStructuredSelector({ isResizeMode });
const mapDispatchToProps = { resizeMode };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inner);
