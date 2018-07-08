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
import React from "react";
import Button from "../Button";

import { connect } from "react-redux";

import { layoutMode } from "ory-editor-core/lib/actions/display";
import { isLayoutMode } from "ory-editor-core/lib/selector/display";
import { createStructuredSelector } from "reselect";

const Inner = ({ isLayoutMode, layoutMode }) => (
  <Button
    icon={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    }
    description="Переместить"
    active={isLayoutMode}
    onClick={layoutMode}
  />
);

const mapStateToProps = createStructuredSelector({ isLayoutMode });
const mapDispatchToProps = { layoutMode };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inner);
