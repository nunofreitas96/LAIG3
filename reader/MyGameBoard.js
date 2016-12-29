
function MyGameBoard(scene){
	CGFobject.call(this,scene);
	this.scene = scene;
	this.initialized = false;
	this.ended = false;
	
	this.boardString = "placeholder";
	
	this.board= "placeholder"
	
	//this.boardLines = this.boardString.match(/\[(.*?)\|/g);
	
	this.getPrologRequest("board");
	
	this.currId;
	this.currPeca;
	this.currAnim;
	
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
					
					
					if(requestString.substring(0,9) == "moveCheck" && response == "1"){
						var subRequest = requestString.substring(requestString.indexOf("(")+1,requestString.indexOf(")"));
						
						subSubRequest = subRequest.substring(subRequest.indexOf("]]")+3,subRequest.length);
						console.log(subRequest);
						var list = subSubRequest.split(",");
						console.log(list);
						gBoard.confirmMove(list[0],list[1],list[2],list[3]);
						
					}
					else if(requestString.substring(0,9) == "moveCheck" && response == "0"){
						this.currId = 0;
						this.currPeca = 0;
						this.currAnim =0;
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
	this.board = board;
	this.setNewBS();
	/*
	var prSentence = "moveCheck(" + this.boardString + ",4,2,4,3)";
	this.getPrologRequest(prSentence);
	*/
	//console.log(lines);
	//this.confirmMove(4,2,4,3);
	
}

MyGameBoard.prototype.setNewBS = function(){
	
	var bString = "[";
	
	for(var i = 0; i < this.board.length; i++){
		bString += "[";
		if(i == this.board.length-1 || i ==0){
			bString += "-,-,";
		}
		if(i == this.board.length-2 || i ==1){
			bString += "-,";
		}
		for(var j =0; j < this.board[i].length; j++){
			
			if(j != this.board[i].length-1){
			bString += this.board[i][j] + ",";}
			else{
				bString += this.board[i][j];
			}
			
		}
		if(i == this.board.length-1 || i ==0){
			bString += ",-,-";
		}
		if(i == this.board.length-2 || i ==1){
			bString += ",-";
		}
		if(i == this.board.length-1){
		bString += "]";}else
		bString += "],";
	}
	
	bString += "]"
	console.log(bString);
	this.boardString = bString;
	//var aioq = this.boardString.split(",");
	//console.log("testeteste")
	//console.log(aioq);
}

MyGameBoard.prototype.keepId = function(customId,piece,anim,X,Y,NX,NY){
	var prSentence = "moveCheck(" + this.boardString + "," + X + "," + Y+ "," + NX + "," + NY + ")";
	this.currPeca = piece;
	this.currId = customId;
	this.currAnim = anim; 
	this.getPrologRequest(prSentence);
	
}

MyGameBoard.prototype.confirmMove = function(X,Y,NX,NY){
	
	console.log("move confirmed, new coordinates :");
	console.log(NX);
	console.log(NY);
	
	this.board[NY][NX] = this.board[Y][X];
	this.board[Y][X] = "o";
	
	console.log(this.board);
	this.setNewBS();
	
	this.scene.setSelObjects(this.currId,this.currPeca,this.currAnim);
	
	this.currId = 0;
	this.currPeca = 0;
	this.currAnim =0;
	
	//função pa mexer no board
	
	
}
