/**
 * Created by daniel on 14/11/2016.
 */
import React, { Component } from 'react';
import SortableElement from './SortableElement';

export default class List extends Component {

  componentWillMount() {
    this.setState({targetIndex:null})
  }

  dragEnd(source) {
    const target = this.getTarget();

    if (source === target) return;

    this.props.onUpdate(source, target);
  }

  getTarget() {
    const targetIndex = this.state.targetIndex;

    if (targetIndex < this.props.children.length) {
      return this.props.children[targetIndex];
    }

    return null;
  }

  setTargetIndex(targetIndex) {
    this.setState({targetIndex});
  }

  render() {
    return (
      <div className="list">
        <ol>
          {this.props.children.map((el, idx) => (
            <SortableElement
              slotIndex={idx}
              key={idx}
              text={el}
              dragEnd={this.dragEnd.bind(this)}
              setTargetIndex={this.setTargetIndex.bind(this)}
            />
          ))}
        </ol>
      </div>
    )
  }
}