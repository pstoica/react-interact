'use strict';

var React = require('react');
var Interactable = require('./Interactable');

var Draggable = {
  componentDidMount() {
    this.draggableOptions = {};

    this.updateDraggable();
  },

  // componentWillReceiveProps() {
  //   this.draggableOptions = {
  //     ...this.draggableOptions,
  //     ...this.props.draggableOptions
  //   };

  //   this.interactable.draggable(this.draggableOptions);
  // },

  updateDraggable(options) {
    var draggableDefaults = {
      onmove: onmove.bind(this)
    };

    this.draggableOptions = {
      ...draggableDefaults,
      ...this.props.draggableOptions,
      ...options
    };

    this.interactable.draggable(this.draggableOptions);
  },

  lockStartPosition(e) {
    console.log(e);
    var { interactStyle } = this.state;

    var styles = {
      position: 'absolute',
      height: e.target.offsetHeight,
      left: e.target.offsetLeft,
      top: e.target.offsetTop
    };

    this.setState({
      interactStyle: {...interactStyle, ...styles}
    });
  },

  resetDrag() {
    var { interactData, interactStyle } = this.state;

    var coordinates = { x: 0, y: 0 };

    var positionStyle = {
      position: 'static',
      left: null,
      top: null
    };

    var styles = {...transform(null), ...positionStyle};

    this.setState({
      interactData: {...interactData, ...coordinates},
      interactStyle: {...interactStyle, ...styles}
    });
  }
};

function onmove(e) {
  var options = this.draggableOptions;
  var interactData = this.state.interactData;
  var interactStyle = this.state.interactStyle;

  var target = e.target;

  var x = (interactData.x || 0) +
    (options.fixAxis !== 'y' ? e.dx : 0);

  var y = (interactData.y || 0) +
    (options.fixAxis !== 'x' ? e.dy : 0);

  var translate = 'translate(' + x + 'px, ' + y + 'px)';
  var styles = transform(translate);

  var coordinates = {
    x: x,
    y: y
  };

  // update the posiion attributes
  this.setState({
    interactData: {...interactData, ...coordinates},
    interactStyle: {...interactStyle, ...styles}
  });
}

function transform(translate) {
  return {
    msTransform: translate,
    mozTransform: translate,
    webkitTransform: translate,
    transform: translate
  };
}

module.exports = Draggable;