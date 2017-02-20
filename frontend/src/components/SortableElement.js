/**
 * Created by daniel on 12/12/2016.
 */
import React, { Component } from 'react';
import Element from './Element';
import EmptySlot from './EmptySlot';

export default class SortableElement extends Component {
  componentWillMount() {
    this.setEmptySlotsVisible(false);
    this.dragTargetCounter = 0;
  }

  handleDragEnter() {
    this.dragTargetCounter++;

    this.setEmptySlotsVisible(true);
  }

  handleDragLeave() {
    this.dragTargetCounter--;
    if (this.dragTargetCounter === 0) {
      this.setEmptySlotsVisible(false);
    }
  }

  setEmptySlotsVisible(visible) {
    this.setState({showEmptySlots: visible});
  }

  handleDragEnd() {
    return this.props.dragEnd(this.props.text);
  }

  setTargetIndex(index) {
    return this.props.setTargetIndex(index);
  }

  render() {
    return (
      <div
        onDragEnter={this.handleDragEnter.bind(this)}
        onDragLeave={this.handleDragLeave.bind(this)}
        onDragEnd={this.handleDragEnd.bind(this)}>

        <EmptySlot
          shown={this.state.showEmptySlots}
          select={this.setTargetIndex.bind(this, this.props.slotIndex)}/>
        <Element>{this.props.text}</Element>
        <EmptySlot
          shown={this.state.showEmptySlots}
          select={this.setTargetIndex.bind(this, this.props.slotIndex + 1)}/>

      </div>
    )
  }
}
