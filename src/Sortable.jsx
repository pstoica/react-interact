'use strict';

var React = require('react');
var Interactable = require('./Interactable');
var Draggable = require('./Draggable');
var Dropzone = require('./Dropzone');

var Sortable = {
  mixins: [Interactable, Draggable, Dropzone],

  componentDidMount() {
    this.updateDraggable({
      onstart: (e) => {
        this.lockStartPosition(e);
        this.props.sortStart(e);
      },

      onend: (e) => {
        this.props.sortEnd(e);
        this.resetDrag();
      },

      fixAxis: 'y'
    });

    this.updateDropzone({
      dragenter: this.props.sortDragEnter,
      dragleave: this.props.sortDragLeave
    });
  },

  isDragging() {
    return this.props.data.dragging === this.props['data-key'];
  }
};

module.exports = Sortable;