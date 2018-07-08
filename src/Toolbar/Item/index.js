import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import draggable from "../Draggable";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "rc-tooltip";

class Item extends Component {
  state = { tooltipVisible: false };

  onMouseEnter = () => {
    this.setState({ tooltipVisible: true });
  };

  onMouseLeave = () => {
    this.setState({ tooltipVisible: false });
  };

  render() {
    const { plugin, insert } = this.props;
    if (!plugin.IconComponent && !plugin.text) {
      return null;
    }

    const Draggable = draggable(plugin.name);

    return (
      <ListItem className="ory-toolbar-item">
        <Avatar>{plugin.IconComponent}</Avatar>
        <ListItemText primary={plugin.text} secondary={plugin.description} />
        <ListItemSecondaryAction>
          <span
            className="ory-toolbar-item-drag-handle-button"
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onMouseDown={this.onMouseLeave}
          >
            <IconButton>
              <Draggable insert={insert}>
                <Tooltip
                  visible={this.state.tooltipVisible}
                  placement="bottomLeft"
                  overlay={<span>Drag me!</span>}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ory-toolbar-item-drag-handle"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
                  </svg>
                </Tooltip>
              </Draggable>
            </IconButton>
          </span>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Item;
