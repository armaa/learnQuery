var domSelector = function(selectors) {
  'use strict';
  
  var selectedNodes = document.querySelectorAll(selectors);
  
  return Array.prototype.slice.call(selectedNodes);
};