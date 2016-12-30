
function MyGameBoard(scene){
	CGFobject.call(this,scene);
	this.scene = scene;
	this.initialized = false;
	this.ended = false;
	
	this.boardString = "placeholder";
	this.boardString2;
	
	this.board= "placeholder"
	
	//this.boardLines = this.boardString.match(/\[(.*?)\|/g);
	
	this.getPrologRequest("board");
	
	this.currId;
	this.currPeca;
	this.currAnim;
	
	this.nodeRX = 4;
	this.nodeRY = 0;
	this.nodeWX = 4;
	this.nodeWY = 8;
	
	this.currPlayer = 0;
	
	this.playerCPU1 =2;
	this.playerCPU2 =2;
	
	this.gamestart = 0;
	this.gameover = 0;
	this.playerWon = 2;
	
}

MyGameBoard.prototype = Object.create(MyGameBoard.prototype);
MyGameBoard.prototype.constructor= MyGameBoard;

MyGameBoard.prototype.getPrologRequest = function(requestString, onSuccess, onError, port){
				var gBoard = this;
				var requestPort = port || 8081
				var request = new XMLHttpRequest();
				request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);
				
				request.onload = onSuccess || function(data){
					//console.log("Request successful. Reply: " + data.target.response);
					var response = data.target.response;
					//console.log(response);
					
					if(requestString == "board"){
						//console.log("machadinha");
						gBoard.boardString = response;
						//console.log(gBoard.boardString);
						gBoard.parseBoard(gBoard.boardString);
					}
					
					
					if(requestString.substring(0,9) == "moveCheck" && response == "1"){
						
							
						
						var subRequest = requestString.substring(requestString.indexOf("(")+1,requestString.indexOf(")"));
						
						subSubRequest = subRequest.substring(subRequest.indexOf("]]")+3,subRequest.length);
						//console.log(subRequest);
						var list = subSubRequest.split(",");
						//console.log(list);
						gBoard.confirmMove(list[0],list[1],list[2],list[3]);
						
					}
					else if(requestString.substring(0,9) == "moveCheck" && response == "0"){
						gBoard.currId = 0;
						gBoard.currPeca = 0;
						gBoard.currAnim =0;
						
					}
					
					if(requestString.substring(0,7) == "botMove"){
						var subRequestBot = response.substring(response.indexOf("[")+1,response.indexOf("]"));
						var listB = subRequestBot.split(",");
						//console.log("test");
						//console.log(listB);
						gBoard.confirmMove(listB[0],listB[1],listB[2],listB[3]);
						
					}
					
					
					
					if(requestString.substring(0,9) == "checkLose" && response == '0'){
						if(gBoard.currPlayer == gBoard.playerCPU1){
						var prSentence = "botMove(" + gBoard.boardString + ")";
						gBoard.getPrologRequest(prSentence);
						}
						else if(gBoard.currPlayer == gBoard.playerCPU2){
							var prSentence = "botMove2(" + gBoard.boardString + ")";
							gBoard.getPrologRequest(prSentence);
						}
					
					
					}
					
					if(requestString.substring(0,9) == "checkLose" && response == '1'){
						//console.log(this.gameover);
						gBoard.gameover = 1;
						//console.log(this.gameover);
						
						if(gBoard.currPlayer == 0){
							gBoard.playerWon = 0;
							//console.log("Player 1 won!");
						}
						else if(gBoard.currPlayer == 1){
							gBoard.playerWon = 1; 
							//console.log("Player 2 won!");
						}
					
					
					}
					if(requestString.substring(0,7) == "nMoves(" ){
						//console.log("oiiiimmm");
						//console.log(response);
						gBoard.scene.pointsP1 = response;
						var prSentence = "nMoves2(" + gBoard.boardString + ")";
						gBoard.getPrologRequest(prSentence);
					}
					if(requestString.substring(0,7) == "nMoves2" ){
						gBoard.scene.pointsP2 = response;
						
					}
					
				}
				request.onerror = onError || function(){console.log("Error waiting for response");};

				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				request.send();
				
}

MyGameBoard.prototype.changeMode = function(type){
	if(type == 0 && this.gamestart == 0){
		//console.log("still started");
		this.currPlayer = 0;
		this.playerCPU1 =2;
		this.playerCPU2 =2;
	}
	else if(type ==1 && this.gamestart == 0){
		this.currPlayer = 0;
	
		this.playerCPU1 =1;
		this.playerCPU2 =2;
	}
	else if(type == 2 && this.gamestart == 0){
		this.currPlayer = 0;
	
		this.playerCPU1 =1;
		this.playerCPU2 =0;
		this.gamestart = 1;
		var prSentence = "botMove2(" + this.boardString + ")";
		this.getPrologRequest(prSentence);
		
		
	}
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
	//console.log(lines);
	//console.log(board);
	this.board = board;
	this.setNewBS();
	
	var prSentence2 = "nMoves(" + this.boardString + ")";
	this.getPrologRequest(prSentence2);
	/*
	var prSentence = "moveCheck(" + this.boardString + ",4,2,4,3)";
	this.getPrologRequest(prSentence);
	*/
	//console.log(lines);
	//this.confirmMove(4,2,4,3);
	
	
	
}

MyGameBoard.prototype.setNewBS = function(){
	
	var bString = "[";
	var bString2 = "[";
	
	for(var i = 0; i < this.board.length; i++){
		bString += "[";
		bString2 += "[";
		if(i == this.board.length-1 || i ==0){
			bString += "-,-,";
			bString2 += "-,-,";
		}
		if(i == this.board.length-2 || i ==1){
			bString += "-,";
			bString2 += "-,";
		}
		for(var j =0; j < this.board[i].length; j++){
			
			if(j != this.board[i].length-1){
				if(this.board[i][j] == "W"){
					bString2 += "'W'" + ",";
				}
				else if(this.board[i][j] == "R"){
					bString2 += "'R'" + ",";
				}
				else{
					bString2 += this.board[i][j] + ",";
				}
				bString += this.board[i][j] + ",";
			}
			else{
				if(this.board[i][j] == "W"){
					bString2 += "'W'";
				}
				else if(this.board[i][j] == "R"){
					bString2 += "'R'";
				}
				else{
					bString2 += this.board[i][j];
				}
				bString += this.board[i][j];
			}
			
		}
		if(i == this.board.length-1 || i ==0){
			bString += ",-,-";
			bString2 += ",-,-";
		}
		if(i == this.board.length-2 || i ==1){
			bString += ",-";
			bString2 += ",-";
		}
		if(i == this.board.length-1){
		bString += "]";
		bString2 += "]";}else{
		bString += "],";
		bString2 += "],";}
	}
	
	bString += "]"
	bString2 += "]"
	//console.log(bString);
	this.boardString = bString;
	this.boardString2 = bString2;
	//var aioq = this.boardString.split(",");
	//console.log("testeteste")
	//console.log(aioq);
}

MyGameBoard.prototype.keepId = function(customId,piece,anim,X,Y,NX,NY){
	var prSentence;
	if(this.currPlayer == 0){
	prSentence = "moveCheck(" + this.boardString + "," + X + "," + Y+ "," + NX + "," + NY + ")";}
	else{
	prSentence = "moveCheck2(" + this.boardString + "," + X + "," + Y+ "," + NX + "," + NY + ")";
	}
	this.currPeca = piece;
	this.currId = customId;
	this.currAnim = anim; 
	this.getPrologRequest(prSentence);
	
}





MyGameBoard.prototype.confirmMove = function(X,Y,NX,NY){
	
	if(this.gameover == 0){
	//console.log("move confirmed, new coordinates :");
	//console.log(X);
	//console.log(Y);
	//console.log(this.nodeRX);
	this.gamestart = 1;
	
	if(this.currPlayer == this.playerCPU1 || this.currPlayer == this.playerCPU2){
		var cY = parseInt(Y) +1;
		var cX = parseInt(X) +1;
		var cId = cY*10 + cX;
		this.currPeca = parseInt(this.scene.map.getKeyByValue(cId));
		var cNY=parseInt(NY) +1;
		var cNX=parseInt(NX) +1;
		this.currId = cNY*10 + cNX;
		if(cNY > cY && cX == cNX){
			this.currAnim = 2;
		}
		else if(cNY < cY && cX == cNX){
			this.currAnim = 1;
		}
		else if(cNY == cY && cX > cNX){
			this.currAnim = 4;
		}
		else if(cNY == cY && cX < cNX){
			this.currAnim = 3;
		}
		
	}
	
	
	
	
	
	
	if( NY != Y || NX != X){
		
	if(this.nodeRX == X && this.nodeRY == Y){
		this.currPlayer = 1;
		this.nodeRX = NX;
		this.nodeRY = NY;
	}
	
	if(this.nodeWX == X && this.nodeWY == Y){
		this.currPlayer = 0;
		this.nodeWX = NX;
		this.nodeWY = NY;
	}
	
	if(Y == 0 || Y == 8){
		if(NY == 0 || NY == 8){
			this.board[NY][NX-2] = this.board[Y][X-2];
			this.board[Y][X-2] = "o";
		}else if(NY == 1 || NY == 7){
			this.board[NY][NX-1] = this.board[Y][X-2];
			this.board[Y][X-2] = "o";
		}
		else{
			this.board[NY][NX] = this.board[Y][X-2];
			this.board[Y][X-2] = "o";
		}
	}
	else if(Y == 1 || Y == 7){
		if(NY == 0 || NY == 8){
			this.board[NY][NX-2] = this.board[Y][X-1];
			this.board[Y][X-1] = "o";
		}else if(NY == 1 || NY == 7){
			this.board[NY][NX-1] = this.board[Y][X-1];
			this.board[Y][X-1] = "o";
		}
		else{
			this.board[NY][NX] = this.board[Y][X-1];
			this.board[Y][X-1] = "o";
		}
	}else{
		if(NY == 0 || NY == 8){
			this.board[NY][NX-2] = this.board[Y][X];
			this.board[Y][X] = "o";
		}else if(NY == 1 || NY == 7){
			this.board[NY][NX-1] = this.board[Y][X];
			this.board[Y][X] = "o";
		}
		else{
			this.board[NY][NX] = this.board[Y][X];
			this.board[Y][X] = "o";
		}
	}
	}
	
	//console.log(this.board);
	this.setNewBS();
	
	this.scene.setSelObjects(this.currId,this.currPeca,this.currAnim);
	
	this.currId = 0;
	this.currPeca = 0;
	this.currAnim =0;
	//console.log("aiaiaiaia");
	//console.log(this.boardString);
	//função pa mexer no board
	
	var prSentence2 = "nMoves(" + this.boardString + ")";
	this.getPrologRequest(prSentence2);
	
	//console.log("pqp");
	//console.log(this.scene.pointsP1);
	
	if(this.currPlayer == 0){
	var prSentence = "checkLose(" + this.boardString2 + ",'W')";
	this.getPrologRequest(prSentence);}
	
	if(this.currPlayer == 1){
	var prSentence = "checkLose(" + this.boardString2 + ",'R')";
	this.getPrologRequest(prSentence);}
	
	}
}
