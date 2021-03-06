/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

// @flow
import React, { Component } from "react";
import { Provider as ReduxProvider } from "react-redux";
import dragDropContext from "ory-editor-core/lib/components/DragDropContext";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    secondary: {
      light: "#3a7ad9",
      main: "#3a7ad9",
      dark: "#3a7ad9"
    }
  }
});

class Provider extends Component {
  constructor(props) {
    super(props);
    this.DragDropContext = dragDropContext(props.editor.dragDropContext);
  }

  render() {
    const { editor, children = [] } = this.props;
    const DragDropContext = this.DragDropContext;
    return (
      <ReduxProvider store={editor.store}>
        <DragDropContext>
          <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </DragDropContext>
      </ReduxProvider>
    );
  }
}

export default Provider;
