function MyBoard(scene){
	CGFobject.call(this,scene);
	
	this.tampo = new MyUnitCubeQuad(this.scene,0,1,0,1);
	this.perna=new MyUnitCubeQuad(this.scene,0,1,0,1);
	this.materialC = new CGFappearance(this.scene);
	this.materialD = new CGFappearance(this.scene);
    
    this.arr = [1, 2];
    
    /*
	this.chessShader = new CGFshader(this.scene.gl, "shaders/Chess.vert", "shaders/Chess.frag");
	this.chessShader.setUniformsValues({du : this.du});
	this.chessShader.setUniformsValues({dv : this.dv});
	this.chessShader.setUniformsValues({su : this.su});
	this.chessShader.setUniformsValues({sv : this.sv});
	this.chessShader.setUniformsValues({c1 : this.c1});
	this.chessShader.setUniformsValues({c2 : this.c2});
	this.chessShader.setUniformsValues({cs : this.cs});
    */
	//this.initBuffers();
}

MyBoard.prototype = Object.create(CGFobject.prototype);
MyBoard.prototype.constructor = MyChessboard;

MyBoard.prototype.display = function() {
    this.materialC.setAmbient(0.3,0.2,0,1,1);
	this.materialC.setDiffuse(0.3,0.2,0,1,1);
	this.materialC.setSpecular(0.1,0.1,0.1,1);

	this.materialD.setAmbient(0.67,0.67,0.67,1);
	this.materialD.setDiffuse(0.67,0.67,0.67,1);
	this.materialD.setSpecular(1,1,1,1);


	this.scene.pushMatrix();
	this.scene.translate(0, 2, 0);
	this.scene.scale(5, 0.3, 3);
	//this.materialC.apply();
	this.tampo.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-2.25, 1, -1.25);
	this.scene.scale(0.3, 2, 0.3);
	//this.materialD.apply();
	this.perna.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(2.25, 1, -1.25);
	this.scene.scale(0.3, 2, 0.3);
	//this.materialD.apply();
	this.perna.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-2.25, 1, 1.25);
	this.scene.scale(0.3, 2, 0.3);
	//this.materialD.apply();
	this.perna.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(2.25, 1, 1.25);
	this.scene.scale(0.3, 2, 0.3);
	//this.materialD.apply();
	this.perna.display();
	this.scene.popMatrix();    
}