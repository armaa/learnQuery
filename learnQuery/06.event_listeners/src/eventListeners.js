var eventListener = (function() {
  'use strict';
  // Callback je funkcija koju zovem nad elementom, tj. metoda
  // listenedEvent je koji event slusam
  var listenersList = {htmlElement: [], listenedEvent: [], callback: []};
  
  function addListener(htmlElement, eventToListen, callback) { // Mozda napraviti reference za sve ovo da mogu delete
	  if (listenersList.htmlElement.indexOf(htmlElement) === -1) {
		  listenersList.htmlElement.push(htmlElement);
		  var index = listenersList.htmlElement.indexOf(htmlElement);
		  listenersList.listenedEvent.push([]);
		  listenersList.callback.push([]);
		  listenersList.listenedEvent[index].push(eventToListen);
		  listenersList.callback[index].push(callback);
		  
	  } else {
		  var index = listenersList.htmlElement.indexOf(htmlElement);
		  listenersList.listenedEvent[index].push(eventToListen);
		  listenersList.callback[index].push(callback);
	  }
	  
	  htmlElement.addEventListener(eventToListen, callback.call(), false);
  }
  
  function removeListener(htmlElement, listenedEvent, callback) {
	  if (typeof listenedEvent !== 'undefined') {
		  if (typeof callback !== 'undefined') {
			  htmlElement.removeEventListener(listenedEvent, callback, false);
		  } else {
			  removeSelectedEvent(htmlElement, listenedEvent);
		  }
	  } else {
		  removeAllEvents(htmlElement);
	  }
  }
  
  function removeSelectedEvent(htmlElement, eventToRemove) {
	  var index = listenersList.htmlElement.indexOf(htmlElement);
	  
	  if (index === -1) {
		  throw new Error('Element doesnt exist.');
	  }
	  
	  var slicedEvent = Array.prototype.slice.call(listenersList.listenedEvent[index]);
	  var slicedCallback = Array.prototype.slice.call(listenersList.callback[index]);
	  var i;
	  
	  for (i = 0; i < slicedEvent.length; i++) {
		  if (slicedEvent[i] === eventToRemove) {
			  htmlElement.removeEventListener(slicedEvent[i], slicedCallback[i], false);
		  }
	  }
  }
  
  function removeAllEvents(htmlElement) {
	  var index = listenersList.htmlElement.indexOf(htmlElement);
	  var i;
	  
	  if (index === -1) {
		  throw new Error('Element doesnt exist.');
	  }
	  
	  var slicedEvent = Array.prototype.slice.call(listenersList.listenedEvent[index]);
	  var slicedCallback = Array.prototype.slice.call(listenersList.callback[index]);
	  
	  for (i = 0; i < slicedEvent.length; i++) {
		  htmlElement.removeEventListener(slicedEvent[i], slicedCallback[i], false);
	  }
  }
  
  function triggerEvent(htmlElement, eventToTrigger) {
	  var dispatch = new Event(eventToTrigger);
	  htmlElement.dispatchEvent(dispatch);
  }
  
  function delegateEventWithASpecificClass(htmlElement, className, eventToTrigger, callback) {
	  var childElements = htmlElement.getElementsByClassName(className);
	  var i = 0;
	  
	  for (i = 0; i < childElements.length; i++) {
		  childElements[i].addEventListener(eventToTrigger, callback.call(), false);
	  }
  }
  
  return {
	  on: function(htmlElement, listenedEvent, callback) {
		  addListener(htmlElement, listenedEvent, callback);
	  },
	  off: function(htmlElement, listenedEvent, callback) {
		  removeListener(htmlElement, listenedEvent, callback);
	  },
	  trigger: function(htmlElement, eventToTrigger) {
		  triggerEvent(htmlElement, eventToTrigger);
	  },
	  delegate: function(htmlElement, className, eventToTrigger, callback) {
		  delegateEventWithASpecificClass(htmlElement, className, eventToTrigger, callback);
	  }
  }
})();