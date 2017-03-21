/**
 * Created by daniel on 12/03/2017.
 */
import React, { Component } from 'react';

export default class Submit extends Component {

  buttonContent() {
    switch (this.props.submissionStatus) {
      case 'UNSUBMITTED':
        return this.unsubmitted();
      case 'SUBMITTING':
        return this.submitting();
      case 'SUBMITTED':
        return this.submitted();
      default:
        return this.unsubmitted();
    }
  }

  unsubmitted() {
    return (
      <button onClick={this.props.onClick}>
        Submit
      </button>
    )
  }

  submitting() {
    return (
      <button>
        <i className="fa fa-circle-o-notch fa-spin fa-fw"/>
        Submit
      </button>
    )
  }

  submitted() {
    return (
      <button disabled>
        Thank you!
      </button>
    )
  }

  render() {
    return (
      <div className="submitbar">
        {this.buttonContent()}
      </div>
    )
  }
}