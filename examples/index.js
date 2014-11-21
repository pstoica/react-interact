'use strict';

var React = require('react'),
    interactable = require('react-interact'),
    SortableList = require('./sortable');

var App = React.createClass({

  render() {
    return (
      <div>
        <h1>React + InteractJS</h1>

        <SortableList />
      </div>
    );
  }
});

var timer = 0;

React.render(<App count={timer} />, document.body);

setInterval(function() {
  React.render(<App count={++timer} />, document.body);
}, 1000);