
function MyGameBoard(scene){
	CGFobject.call(this,scene);
	this.scene = scene;
	this.initialized = false;
	this.ended = false;
	
	this.boardString = "placeholder";
	
	this.board= "placeholder"
	
	//this.boardLines = this.boardString.match(/\[(.*?)\|/g);
	
	this.getPrologRequest("board");
	
	
}

MyGameBoard.prototype = Object.create(MyGameBoard.prototype);
MyGameBoard.prototype.constructor= MyGameBoard;

MyGameBoard.prototype.getPrologRequest = function(requestString, onSuccess, onError, port){
				var gBoard = this;
				var requestPort = port || 8081
				var request = new XMLHttpRequest();
				request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);
				
				request.onload = onSuccess || function(data){
					console.log("Request successful. Reply: " + data.target.response);
					var response = data.target.response;
					console.log(response);
					
					if(requestString == "board"){
						console.log("machadinha");
						gBoard.boardString = response;
						console.log(gBoard.boardString);
						gBoard.parseBoard(gBoard.boardString);
					}
					
					};
				request.onerror = onError || function(){console.log("Error waiting for response");};

				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				request.send();
				
}


MyGameBoard.prototype.parseBoard = function(plBoard){
		
	plBoard = plBoard.substring(plBoard.indexOf("[")+1, plBoard.lastIndexOf("]"));
 	plBoard = plBoard.replace(/\]\,/g, "\|\]\,").replace(/\]$/, "\|\]");
 	var lines = plBoard.match(/\[(.*?)\|/g);
 	var board = [];
	
	for (var i = 0; i < lines.length; i++) {
	//var trueline = JSON.parse(lines[i]);
	
	
	
	board.push(lines[i].match(/(\w|-\w+)/g));
	
	}
	console.log(lines);
	console.log(board);
	
	
	//console.log(lines);
	
	
}
		