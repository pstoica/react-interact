'use strict';

var interact = require('interact');

interact.dynamicDrop(true);

var Interactable = {
  getInitialState() {
    return {
      interactState: { }
    };
  },

  componentDidMount() {
    this.interactable = interact(this.getDOMNode());
  },

  componentWillUnmount() {
    this.interactable.unset();
    this.interactable = null;
  },

  updateInteractable(options) {
    this.interactable.set(options);
  },

  setInteractState(state) {
    var interactState = this.state.interactState;

    this.setState({
      interactState: {
        data: {...interactState.data, ...state.data},
        style: {...interactState.style, ...state.style},
      }
    });
  },

  getInteractData() {
    return this.state.interactState.data;
  },

  getInteractStyle(style) {
    return {...this.state.interactState.style, ...style};
  }
};

module.exports = Interactable;