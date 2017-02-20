/**
 * Created by daniel on 14/11/2016.
 */
import React, { Component } from 'react';
import classNames from 'classnames';

export default class EmptySlot extends Component {
  componentWillMount() {
    this.setState({selected: false});
  }

  onDragOver() {
    this.setState({selected: true});
    this.props.select();
  }

  onDragOut() {
    this.setState({selected: false});
  }

  render() {
    const classes = classNames(
      'empty-slot',
      {
        shown: this.props.shown,
        selected: this.state.selected
      });
    return (
      <div
        onDragOver={this.onDragOver.bind(this)}
        onDragLeave={this.onDragOut.bind(this)}
        className={classes}>
      </div>
    )
  }
}