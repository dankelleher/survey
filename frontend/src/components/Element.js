/**
 * Created by daniel on 14/11/2016.
 */
import React, { Component } from 'react';

export default class Element extends Component {

  render() {
    return (
      <li {...this.props} className="list-item">{this.props.children}</li>
    )
  }
}