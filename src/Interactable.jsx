'use strict';

var interact = require('interact');

interact.dynamicDrop(true);

var Interactable = {
  getInitialState() {
    return {
      interactData: { },
      interactStyle: { }
    };
  },

  componentDidMount() {
    this.interactable = interact(this.getDOMNode());
  },

  componentWillUnmount() {
    this.interactable.unset();
    this.interactable = null;
  }
};

module.exports = Interactable;