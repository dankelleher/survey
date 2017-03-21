/**
 * Created by daniel on 19/03/2017.
 */
import React, { Component } from 'react';

export default class Subtitle extends Component {
  content() {
    switch (this.props.submissionStatus) {
      case 'SUBMITTED':
        return 'Thank you! Here are the results so far.';
      default:
        return 'Drag and drop your Hamilton songs into your favourite order...';
    }
  }

  render() {
    return (
      <h2 className="subtitlebar">{this.content()}</h2>
    )
  }
}