/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene,minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);
	
	this.quad=new MyQuad(this.scene,minS, maxS, minT, maxT);
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;



MyUnitCubeQuad.prototype.display = function () {

	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.translate(0,0,-0.5);
	this.scene.rotate(-0.5*Math.PI,1,0,0);
	this.scene.translate(0,0,0.5);
	this.scene.rotate(-0.5*Math.PI,0,0,1);
	this.quad.display();
	this.scene.translate(0,0,-1);
	this.scene.rotate(Math.PI,0,1,0);
	this.scene.rotate(0.5*Math.PI,0,0,1);
	this.quad.display();
	this.scene.translate(0,0,-0.5);
	this.scene.rotate(0.5*Math.PI,1,0,0);
	this.scene.translate(0,0,0.5);
	this.scene.rotate(1.5*Math.PI,0,0,1);
	this.quad.display();
	this.scene.translate(0,0,-0.5);
	this.scene.rotate(1.5*Math.PI,1,0,0);
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.translate(0,0,-1);
	this.scene.rotate(0.5*Math.PI,0,1,0);
	this.scene.rotate(2*Math.PI,0,0,1);
	this.scene.rotate(0.5*Math.PI,0,1,0);
	this.quad.display();
	
};