var cssClass = (function() {
  'use strict';
  
  function addClass(htmlElement, className) {
	  
	  // Ensures that it doesnt overwrite an existing className
	  if (!htmlElement.classList.contains(className)) {
		  htmlElement.classList.add(className);
	  }
  }
  
  function removeClass(htmlElement, className) {
	  htmlElement.classList.remove(className);
  }
  
  function toggleClass(htmlElement, className) {
	  htmlElement.classList.toggle(className);
  }
  
  function hasClass(htmlElement, className) {
	  return htmlElement.classList.contains(className);
  }
  
  // Checks if the arguments sent into the function are valid
  function checkArguments(htmlElement, className) {
	  if (!(htmlElement && className)) {
		  throw new Error('Invalid arguments.');
	  }
  } 
  
  return {
	  add: function (htmlElement, className) {
		  checkArguments(htmlElement, className);
		  addClass(htmlElement, className);
	  },
	  remove: function (htmlElement, className) {
		  checkArguments(htmlElement, className);
		  removeClass(htmlElement, className);
	  },
	  toggle: function (htmlElement, className) {
		  checkArguments(htmlElement, className);
		  toggleClass(htmlElement, className);
	  },
	  has: function (htmlElement, className) {
		  checkArguments(htmlElement, className);
		  return hasClass(htmlElement, className);
	  }
  };
})();