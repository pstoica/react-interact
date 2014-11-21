'use strict';

var React = require('react'),
    {
      Interactable,
      Draggable,
      Sortable
    } = require('react-interact');

var SortableItem = React.createClass({
  mixins: [Sortable],

  render() {
    var { data, children, style, ...props } = this.props;

    style.visibility = this.isDragging() ? 'hidden' : 'visible';

    style = {...style, ...this.state.interactStyle};

    return <li style={style} {...props}>
      {children}
    </li>;
  }
});

var Sortable = React.createClass({
  getInitialState() {
    return {
      data: {
        items: [
          "blue",
          "green",
          "red",
          "yellow",
          "purple",
          "black"
        ],

        dragging: null,
        dropzone: null,
        pageY: null
      }
    };
  },

  sortStart(e) {
    var data = this.state.data;

    data.dragging = e.target.dataset.key + '-proxy';
    this.setState({data: data});
  },

  sortDragEnter(e) {
    var data = this.state.data;

    var dropzoneKey = e.target.dataset.key;
    console.log('enter ' + dropzoneKey);

    data.dropzone = dropzoneKey;
    data.pageY = e.pageY;

    this.setState({data: data});
  },

  sortDragLeave(e) {
    var data = this.state.data;

    var draggableKey = data.dragging;
    var dropzoneKey = e.target.dataset.key;
    console.log('leave ' + dropzoneKey);

    var draggableIndex = data.items.indexOf(draggableKey);
    var dropzoneIndex = data.items.indexOf(dropzoneKey);

    data.items[draggableIndex] = dropzoneKey;
    data.items[dropzoneIndex] = draggableKey;

    data.dropzone = null;

    this.setState({data: data});
    // this.refs[draggableKey].resetDrag();
  },

  sortEnd(e) {
    var data = this.state.data;
    data.dragging = null;

    this.setState({data: data});
    console.log('end');
    console.log(e);
  },

  render() {
    var items = [];

    this.state.data.items.forEach((item) => {
      var style = {
        color: item,
        marginTop: 10,
        marginBottom: 10
      };

      var props = {
        key: item,
        ref: item,
        data-key: item,

        data: this.state.data,
        sortStart: this.sortStart,
        sortDragEnter: this.sortDragEnter,
        sortDragLeave: this.sortDragLeave,
        sortEnd: this.sortEnd,
        style: style
      }

      items.push(
        <SortableItem {...props}>
          {item}
        </SortableItem>
      );
    });

    return (
      <ul>{items}</ul>
    );
  }
});

module.exports = Sortable;