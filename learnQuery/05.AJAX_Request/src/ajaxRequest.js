function ajaxReq() {
  'use strict';
  
  var httpRequest = new XMLHttpRequest();
	
  var url = arguments[0];
  var options = arguments[1];
  var method = options.method ? options.method.toUpperCase() : 'GET';
  
  function onReadyStateChange() {
	  
	  if (this.readyState === this.DONE) {
		  var data;
		  
		  try {
			  data = JSON.parse(this.responseText);
		  } catch (e) {
			  data = this.responseText;
		  }
		  
		  if (this.status === 200) {
			  options.success.call(options.context, data, this.status, this);
			  
		  } else {
			  options.failure.call(options.context, this, this.status, data);
		  }
		  
		  options.complete.call(options.context, this, this.status);
	  }
  }
  
  httpRequest.onreadystatechange = onReadyStateChange;
  
  httpRequest.open(method, url);
  
  if (method === 'GET') {
	  httpRequest.send();
  } else if (method === 'POST') {
	  httpRequest.send(options.data ? options.data : null);
  }
}