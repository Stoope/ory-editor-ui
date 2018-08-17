import React, { Component, Fragment } from "react";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import { isInsertMode } from "ory-editor-core/lib/selector/display";
import { createStructuredSelector } from "reselect";
import List from "@material-ui/core/List";
import Subheader from "@material-ui/core/ListSubheader";
import TextField from "@material-ui/core/TextField";
import Close from "@material-ui/icons/Close";
import {
  LayoutPlugin,
  ContentPlugin
} from "ory-editor-core/lib/service/plugin/classes";
import Item from "./Item";
import Provider from "../Provider";

class Raw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: a => a,
      isSearching: false
    };

    this.onSearch = this.onSearch.bind(this);
  }

  componentDidUpdate() {
    const input = this.input;
    if (input && this.props.isInsertMode && input instanceof HTMLElement) {
      setTimeout(() => {
        const e = input.querySelector("input");
        if (e) {
          e.focus();
        }
      }, 100);
    }
  }

  onRef = component => {
    this.input = component;
  };

  onSearch = e => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      this.setState({
        searchFilter: (v => ({ text = "" }) =>
          text.toLowerCase().indexOf(v) > -1)(target.value.toLowerCase()),
        isSearching: target.value.length > 0
      });
    }
  };

  render() {
    const {
      isInsertMode,
      editor: { plugins }
    } = this.props;
    const { searchFilter } = this.state;
    const content = plugins.plugins.content.filter(searchFilter);
    const layout = plugins.plugins.layout.filter(searchFilter);
    return (
      <Drawer
        SlideProps={{
          unmountOnExit: true
        }}
        variant="persistent"
        className="ory-toolbar-drawer"
        open={isInsertMode}
      >
        <Fragment>
          <Subheader
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            Добавить плагин
            <Close
              onClick={() =>
                this.props.dispatch({
                  type: "SET_DISPLAY_MODE",
                  ts: new Date().toISOString(),
                  mode: "preview",
                  remember: false
                })
              }
              style={{
                width: 40,
                height: 40,
                color: "black",
                padding: 5,
                cursor: "pointer"
              }}
            />
          </Subheader>
          <div style={{ padding: "0 16px" }} ref={this.onRef}>
            <TextField
              placeholder="Поиск плагина"
              fullWidth
              onChange={this.onSearch}
            />
          </div>
          <List
            subheader={content.length ? <Subheader>Плагины</Subheader> : null}
          >
            {content.map((plugin, k) => {
              const initialState = plugin.createInitialState();

              return (
                <Item
                  plugin={plugin}
                  key={k}
                  insert={{
                    content: {
                      plugin,
                      state: initialState
                    }
                  }}
                />
              );
            })}
          </List>
          <List
            subheader={layout.length ? <Subheader>Секции</Subheader> : null}
          >
            {layout.map((plugin, k) => {
              const initialState = plugin.createInitialState();
              const children = plugin.createInitialChildren();

              return (
                <Item
                  plugin={plugin}
                  key={k}
                  insert={{
                    ...children,
                    layout: {
                      plugin,
                      state: initialState
                    }
                  }}
                />
              );
            })}
          </List>
        </Fragment>
      </Drawer>
    );
  }
}

const mapStateToProps = createStructuredSelector({ isInsertMode });

const Decorated = connect(mapStateToProps)(Raw);

const Toolbar = props => (
  <Provider {...props}>
    <Decorated {...props} />
  </Provider>
);

export default Toolbar;
