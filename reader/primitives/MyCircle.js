/**
* MyCircle
* @param gl {WebGLRenderingContext}
* @constructor
*/
function MyCircle(scene) {
	CGFobject.call(this,scene);
    
    this.arr = [0,1];

	this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor=MyCircle;
/*
MyCircle.prototype.textResize = function(length_s, length_t){
	this.texCoords = [
		0, 0,
		(this.maxX - this.minX)/length_s, 0,
		0, (this.minY - this.maxY)/length_t,
		(this.maxX - this.minX)/length_s, (this.minY - this.maxY)/length_t

	];
	this.updateTexCoordsGLBuffers();
}
*/
MyCircle.prototype.initBuffers = function () {

    var numVert = 100;
    var angle = 2*Math.PI/numVert;
    
    this.vertices = [];
    this.vertices.push(0, 0, 0);
    for(var i = 0; i <=numVert; i++){
        this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), 0);
    }
    //this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), 0);
    
    this.indices = [];
    /*
    this.indices.push(0, 1, 2);
    this.indices.push(0, 2, 3);
    this.indices.push(0, 3, 4);
    this.indices.push(0, 98, 99);
    this.indices.push(0, 99, 100);
    */
    //console.log("OI "+ this.vertices.length);
    //console.log("VERT: "+this.vertices);
    
    for(var j = 1; j<numVert+1; j++){
        this.indices.push(0, j, j+1);
        //console.log("OLA "+ 0+" "+j+" "+(j+1));
    }
    
    /*
	this.vertices = [
		this.minX, this.minY, 0,
		this.maxX, this.minY, 0,
		this.minX, this.maxY, 0,
		this.maxX, this.maxY, 0
	];

	this.indices = [
		0, 1, 2,
		3, 2, 1
	];



	this.normals = [	//1.3 -> vetores normais - homogenizar luz
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
	];

	this.texCoords = [
		this.minS, this.maxT,0,
        this.maxS, this.maxT,0,
        this.minS, this.minT,0,
        this.maxS, this.minT,0
	];
    */
	this.primitiveType=this.scene.gl.TRIANGLES;

	this.initGLBuffers();
};
