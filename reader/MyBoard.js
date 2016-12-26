
function MyBoard(scene){
	CGFobject.call(this,scene);
	this.scene = scene;
	this.initialized = false;
	this.ended = false;
	
	this.boardString = new getPrologRequest('board');
	
	this.board= "placeholder"
	console.log(this.boardString.response);
	//this.boardLines = this.boardString.match(/\[(.*?)\|/g);
	
	
	console.log("putaqpariu");
	
	//console.log(boradLines);
	
	
}

MyBoard.prototype.getPrologRequest = function(requestString, onSuccess, onError, port){
				
				var requestPort = port || 8081
				var request = new XMLHttpRequest();
				request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

				request.onload = onSuccess || function(data){
					console.log("Request successful. Reply: " + data.target.response);
					var response = data.target.response;
					console.log(response);
					
					
					
					};
				request.onerror = onError || function(){console.log("Error waiting for response");};

				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				request.send();
				
}
		