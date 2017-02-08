var dom = (function(){
	'use strict';

	function removeElement(targetElement) {
		var parentElement = targetElement.parentElement;

		if (parentElement) {
			parentElement.removeChild(targetElement);
		}
	}

	function appendElement(targetElement, newElement) {
		targetElement.appendChild(newElement);
	}

	function afterElement(targetElement, newElement) {
		var parentElement = targetElement.parentElement;

		if (parentElement) {
			parentElement.insertBefore(newElement, targetElement.nextSibling);
		}
	}

	function prependElement(targetElement, newElement) {
		var firstChild = targetElement.firstChild;
		targetElement.insertBefore(newElement, firstChild);
	}

	function beforeElement(targetElement, newElement) {
		var parentElement = targetElement.parentElement;

		if (parentElement) {
			parentElement.insertBefore(newElement, targetElement);
		}
	}

	function valElement(targetElement) {
		return targetElement.value;
	}

	function checkArguments(params) {
		var areArgumentsValid = params.every(function(argument) {
			return argument;
		});

		if (!areArgumentsValid) {
			throw new Error('Wrong arguments.');
		}
	}

	return {
		remove: function(targetElement) {
			checkArguments([targetElement]);
			removeElement(targetElement);
		},
		append: function(targetElement, newElement) {
			checkArguments([targetElement, newElement]);
			appendElement(targetElement, newElement);
		},
		after: function(targetElement, newElement) {
			checkArguments([targetElement, newElement]);
			afterElement(targetElement, newElement);
		},
		prepend: function(targetElement, newElement) {
			checkArguments([targetElement, newElement]);
			prependElement(targetElement, newElement);
		},
		before: function(targetElement, newElement) {
			checkArguments([targetElement, newElement]);
			beforeElement(targetElement, newElement);
		},
		val: function(targetElement) {
			checkArguments([targetElement]);
			return valElement(targetElement);
		}
	};
})();
