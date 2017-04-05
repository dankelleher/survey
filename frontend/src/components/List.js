/**
 * Created by daniel on 14/11/2016.
 */
import React, { Component } from 'react';
import { sortable } from 'react-sortable';

import Element from './Element';

const SortableElement = sortable(Element);

const listFactory = (ListElement, sorted) => class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      draggingIndex: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.children
    })
  }

  render() {
    const augmentedListElement = (el, idx) => sorted ?
      <ListElement
        key={idx}
        updateState={this.setState.bind(this)}
        draggingIndex={this.state.draggingIndex}
        items={this.state.items}
        sortId={idx}
        outline="list"
      >{el}</ListElement>
      :
      <ListElement key={idx}>{el}</ListElement>;

    return (
      <div className="list">
        <ol>
          {this.state.items.map(augmentedListElement)}
        </ol>
      </div>
    )
  }
}

const List = listFactory(Element);
const SortableList = listFactory(SortableElement, true);

export {List, SortableList};