'use strict';

var React = require('react');
var Interactable = require('./Interactable');

var Dropzone = {
  componentDidMount() {
    this.dropzoneOptions = {};

    this.updateDropzone();
  },

  // componentWillReceiveProps() {
  //   this.dropzoneOptions = {
  //     ...this.dropzoneOptions,
  //     ...this.props.dropzoneOptions
  //   };

  //   this.interactable.dropzone(this.dropzoneOptions);
  // },

  updateDropzone(options) {
    var dropzoneDefaults = {};

    this.dropzoneOptions = {
      ...dropzoneDefaults,
      ...this.props.dropzoneOptions,
      ...options
    };

    this.interactable.dropzone(this.dropzoneOptions);
  }
};

module.exports = Dropzone;