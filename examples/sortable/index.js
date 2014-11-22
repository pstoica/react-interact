'use strict';

var React = require('react');
var { Interactable, Draggable } = require('react-interact');

var exampleItems = ['blue', 'green', 'red', 'yellow', 'purple', 'black'];

var SortableItem = require('./SortableItem');

var Sortable = React.createClass({
  getInitialState() {
    return {
      items: exampleItems,
      currentDraggable: null
    };
  },

  render() {
    var children = [];

    this.state.items.forEach((item) => {
      var currentDraggable = this.state.currentDraggable;
      var placeholderKey = item + '-placeholder';

      var style = {
        color: item,
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: '#eee',
        borderBottom: '1px solid black',
        borderTop: '1px solid black'
      };

      var baseProps = { style: style };

      var placeholderProps = {
        ...baseProps,
        key: placeholderKey,
        item: placeholderKey,
        ref: placeholderKey
      };

      var draggableProps = {
        ...baseProps,
        key: item,
        ref: item,
        item: item,
        dragStart: this.dragStart,
        dragEnd: this.dragEnd,
        sort: this.sort
      };

      children.push(<SortableItem {...draggableProps}>{item}</SortableItem>);

      if (currentDraggable === item) {
        children.push (
          <SortableItem {...placeholderProps} isPlaceholder={true}>
            {item}
          </SortableItem>
        );
      }
    });

    return (
      <ul>{children}</ul>
    );
  },

  dragStart(e) {
    this.setState({ currentDraggable: e.target.dataset.key });
  },

  dragEnd(e) {
    this.setState({ currentDraggable: null });
  },

  sort(e) {
    var items = this.state.items.slice(0);

    var draggableKey = this.state.currentDraggable;
    var dropzoneKey = e.target.dataset.key;

    var direction = e.dy;

    var draggableIndex = items.indexOf(draggableKey);
    var dropzoneIndex = items.indexOf(dropzoneKey);

    // remove item from original position
    items.splice(draggableIndex, 1);

    if (draggableIndex < dropzoneIndex && direction > 0) {
      // insert after dropzone
      items.splice(dropzoneIndex, 0, draggableKey);
    } else if (draggableIndex > dropzoneIndex && direction < 0) {
      // insert before dropzone
      items.splice(dropzoneIndex, 0, draggableKey);
    } else {
      items.splice(draggableIndex, 0, draggableKey);
    }

    this.setState({items: items});
  }
});

module.exports = Sortable;