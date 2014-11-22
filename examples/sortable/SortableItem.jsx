'use strict';

var React = require('react');
var { Interactable, Draggable } = require('react-interact');

var SortableItem = React.createClass({
  mixins: [Interactable, Draggable],

  propTypes: {
    dragStart: React.PropTypes.func,
    dragEnd: React.PropTypes.func,
    sort: React.PropTypes.func,
    isPlaceholder: React.PropTypes.bool
  },

  getDefaultProps() {
    return { isPlaceholder: false };
  },

  componentDidMount() {
    if (this.isPlaceholder) {
      return;
    }

    this.updateInteractable({
      draggable: {
        onstart: (e) => {
          this.fixToTarget(e.target);
          this.props.dragStart(e);
        },

        onmove: (e) => {
          this.dragMove(e, {
            fixAxis: 'y'
          });
        },

        onend: (e) => {
          this.props.dragEnd(e);
          this.resetDrag();
        }
      },

      dropzone: {
        dragleave: this.props.sort,
        overlap: 'center'
      }
    });
  },

  render() {
    var { item, style, children, ...props } = this.props;

    style.visibility = this.props.isPlaceholder ? 'hidden' : 'visible';

    return <li {...props} data-key={item} style={this.getInteractStyle(style)}>
      {children}
    </li>;
  }
});

module.exports = SortableItem;