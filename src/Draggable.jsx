'use strict';

var React = require('react');
var Interactable = require('./Interactable');

var warning = 'Interactable mixin must be included first.';

module.exports = {
  dragMove(e, options) {
    if (!this.interactable) {
      console.warn(warning);
      return;
    }

    var interactData = this.getInteractData();

    var dx = (options.fixAxis !== 'y' ? e.dx : 0);
    var dy = (options.fixAxis !== 'x' ? e.dy : 0);

    var data = {
      x: (interactData.x || 0) + dx,
      y: (interactData.y || 0) + dy
    };

    this.setInteractState({
      data: data,
      style: getTranslateStyle(data)
    });
  },

  resetDrag() {
    if (!this.interactable) {
      console.warn(warning);
      return;
    }

    var interactData = this.getInteractData();
    var interactStyle = this.getInteractStyle();

    var data = { x: 0, y: 0 };

    var style = {
      ...getTranslateStyle(data),
      position: null,
      left: null,
      top: null
    };

    this.setInteractState({
      data: data,
      style: style
    });
  },

  fixToTarget(target) {
    var style = {
      ...getTranslateStyle({ x: 0, y: 0 }),
      position: 'absolute',
      left: target.offsetLeft,
      top: target.offsetTop
    };

    this.setInteractState({
      style: style
    });
  }
};

function getTranslateStyle(data) {
  var translate = (data.x === 0 && data.y === 0) ?
    null :
    'translate(' + data.x + 'px, ' + data.y + 'px)';

  return transform(translate);
}

function transform(translate) {
  return {
    msTransform: translate,
    mozTransform: translate,
    webkitTransform: translate,
    transform: translate
  };
}