function cssProp() {
  'use strict';
  
	var htmlElement = arguments[0];
	var cssProperty = arguments[1];
	var cssValue = arguments[2];
	
	if (htmlElement && cssProperty && cssValue) {
		if (htmlElement instanceof Element) {
			htmlElement.style[cssProperty] = cssValue;
	} else {
		throw new Error('Element doesnt exist.');
		}
	} else if (cssProperty instanceof Object) {
	
	// Checks if the second argument the function takes is an object
	// Since multiple properties and values are stored in an object
	
		for (var prop in cssProperty) {
			if (cssProperty.hasOwnProperty(prop)) {
				htmlElement.style[prop] = cssProperty[prop];
			}
		}
	} else if (typeof cssProperty === 'string') {
		
		// If it isnt an object and the function didnt take three arguments
		// So it has to show the property requested
		
		return htmlElement.style[cssProperty];
	} else {
		throw new Error('Wrong arguments.');
	}
}