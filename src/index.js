'use strict';

require('./utils/object-assign');

module.exports = require('./Interactable');

module.exports = {
  Interactable: require('./Interactable'),
  Draggable: require('./Draggable'),
  Sortable: require('./Sortable')
};