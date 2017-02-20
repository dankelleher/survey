/**
 * Created by daniel on 14/11/2016.
 */
import React, { Component } from 'react';

export default class Element extends Component {

  // Needed for firefox
  handleDragStart(event) {
    console.log(event)

    event.dataTransfer.setData('Text', this.props.children)
  }

  render() {
    return (
      <li
        draggable
        onDragStart={this.handleDragStart.bind(this)}
      >{this.props.children}</li>
    )
  }
}