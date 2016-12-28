
function XMLscene(interface) {
    CGFscene.call(this);
    this.myInterface = interface;
    this.fileNo = 0;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    //this.grafo=[];    // TODO saber se e necessario ou basta usarmos this.graph?

    CGFscene.prototype.init.call(this, application);

    this.initCameras();


    this.enableLight = [];
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis=new CGFaxis(this);
    this.startTime = 0;
    this.anim = new MyLinearAnimation(this,"aiai",5,[[0,0,0],[1,1,1],[1,2,3],[0,0,0]]);
    var InitialAngle = 0;
    var RotationAngle= Math.PI*4;
    this.anim2 = new MyCircularAnimation(this,"aiai2", 5, [0,0,0],InitialAngle,RotationAngle,1);
    this.myMaterials = [];
    this.myTextures = [];
	
    this.myView = '';
    this.tempCam = null;
    this.elapsedTime = 0;
    
    this.status = 'a jogar';
    this.pointsP1 = 0;
    this.pointsP2 = 0;
	
    this.objects= [
		[
            //new CGFplane(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this)
        ],
        [
            //new CGFplane(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this)
        ],
        [
            //new CGFplane(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this)
        ],
        [
            //new CGFplane(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this)
        ],
        [
            //new CGFplane(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this)
        ],
        [
            //new CGFplane(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this)
        ],
        [
            //new CGFplane(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this)
        ],
        [
            //new CGFplane(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this)
        ],
        [
            //new CGFplane(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this),
            new MyCircle(this)
        ]
	];
    
    this.objectPlayers = [
        [
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100)
        ],
        [
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100),
            new MySphere(this,1,100,100)
        ]
    ];
   
    this.gameBoard = new MyGameBoard(this);
	
    this.setPickEnabled(true);
};

XMLscene.prototype.initLights = function () {
    for(var i =0; i < this.light.length; i++){
        if(this.light[i][0] == "omni"){
            this.lights[i].setPosition(parseFloat(this.light[i].location[0]),parseFloat(this.light[i].location[1]),parseFloat(this.light[i].location[2]),parseFloat(this.light[i].location[3]));
            this.lights[i].setAmbient(parseFloat(this.light[i].ambient[0]),parseFloat(this.light[i].ambient[1]),parseFloat(this.light[i].ambient[2]),parseFloat(this.light[i].ambient[3]));
            this.lights[i].setSpecular(parseFloat(this.light[i].specular[0]),parseFloat(this.light[i].specular[1]),parseFloat(this.light[i].specular[2]),parseFloat(this.light[i].specular[3]));
            this.lights[i].setDiffuse(parseFloat(this.light[i].diffuse[0]),parseFloat(this.light[i].diffuse[1]),parseFloat(this.light[i].diffuse[2]),parseFloat(this.light[i].diffuse[3]));

            if(this.light[i][2] == "true"){
                this.lights[i].enable();
            }

            this.lights[i].setVisible(true);
            this.lights[i].update();
            if(this.light[i][2] == "true"){
                this.enableLight[i] = true;
            }
            else{
                this.enableLight[i] = false;
            }
            this.myInterface.lightBox(i,this.light[i][1]);
        }

        if(this.light[i][0] == "spot"){
            this.lights[i].setPosition(parseFloat(this.light[i].location[0]),parseFloat(this.light[i].location[1]),parseFloat(this.light[i].location[2]),1);
            this.lights[i].setAmbient(parseFloat(this.light[i].ambient[0]),parseFloat(this.light[i].ambient[1]),parseFloat(this.light[i].ambient[2]),parseFloat(this.light[i].ambient[3]));
            this.lights[i].setSpecular(parseFloat(this.light[i].specular[0]),parseFloat(this.light[i].specular[1]),parseFloat(this.light[i].specular[2]),parseFloat(this.light[i].specular[3]));
            this.lights[i].setDiffuse(parseFloat(this.light[i].diffuse[0]),parseFloat(this.light[i].diffuse[1]),parseFloat(this.light[i].diffuse[2]),parseFloat(this.light[i].diffuse[3]));
            this.lights[i].setSpotDirection(parseFloat(this.light[i].target[0])- parseFloat(this.light[i].location[0]),parseFloat(this.light[i].target[1]) - parseFloat(this.light[i].location[1]),parseFloat(this.light[i].target[2]) - parseFloat(this.light[i].location[2]));
            if(this.light[i][2] == "true"){
                this.lights[i].enable();
            }

            this.lights[i].setVisible(true);
            this.lights[i].update();
            if(this.light[i][2] == "true"){
                this.enableLight[i] = true;
            }
            else{
                this.enableLight[i] = false;}
            this.myInterface.lightBox(i,this.light[i][1]);
        }
    }
};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
    this.myInterface.setActiveCamera(this.camera);
};

XMLscene.prototype.logPicking = function (){
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];				
					console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
}

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
};

// Handler called when the graph is finally loaded.
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function (){
    /*
    this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);
    this.lights[0].setVisible(true);
    this.lights[0].enable();
    */
    this.setUpdatePeriod(1);
    this.initLights();
};

XMLscene.prototype.update = function (currtime) {

    if (this.startTime == 0)
        this.startTime = currtime;

    this.elapsedTime = (currtime - this.startTime) / 1000;
    
    // TODO sistema de pontos
    
    if(Math.floor(this.elapsedTime) == 6){
        if(this.pointsP1 == this.pointsP2){
            this.status = 'empate !';
        }
        else if(this.pointsP1 > this.pointsP2){
            this.status = 'P1 ganhou !';
        }
        else{
            this.status = 'P2 ganhou !';
        }
    }
    // TODO terminar o jogo: nao deixar fazer mais jogadas
    if(Math.floor(this.elapsedTime) >= 6)
        this.elapsedTime = 6;
}
XMLscene.prototype.processaGrafo= function(nodeName){

    //console.log("-------------------------- "+nodeName+" --------------------------");
    var material = null;  // CGFappearance
    var texture = null;
    var length_t;
    var length_s;
    var confirmer = 0;



    if (nodeName!=null) {
        var node = this.graph[nodeName];
        //console.log("MATERIAL "+node.material+"    "+this.graph.materials[node.material]+" ____________ "+this.myMaterials);
        //console.log("TEXTURE "+node.texture+"    "+this.graph.materials[node.texture]+" ____________ "+this.myTextures);
        if(node.material != "inherit"){   // important: so tenho o 1o material guardado, o resto esta nos components
            //console.log("OTHER: "+node.material);
            this.myMaterials.push(node.material);
            material = this.graph.materials[this.myMaterials[this.myMaterials.length -1]];
        }
        else {
            //console.log("INHERIT");
            material=this.graph.materials[this.myMaterials[this.myMaterials.length -1]];
            this.myMaterials.push(this.myMaterials[this.myMaterials.length -1]);
        }

        if (node.texture != "none") {
            if (node.texture == "inherit") {
                texture = this.textures[this.myTextures[this.myTextures.length -1]];
                this.myTextures.push(this.myTextures[this.myTextures.length -1]);
            }
            else {
                this.myTextures.push(node.texture);
                texture = this.textures[this.myTextures[this.myTextures.length -1]];
                length_t = this.texSizes[this.myTextures[this.myTextures.length -1]][0];
                length_s = this.texSizes[this.myTextures[this.myTextures.length -1]][1];
                material.setTexture(texture);
                confirmer = 1;
                if(node == this.graph["horas_5"]){
                    //console.log("AQUIAQUIAQUI "+ Math.floor(this.elapsedTime) +"   "+this.graph["horas_1"].material);
                    /*
                    if(Math.floor(this.elapsedTime) % 60 == 2){
                        console.log("OLA")
                        texture = this.graph.scene.textures["time2A"];
                        material.setTexture(texture);
                    }
                    */
                    switch(Math.floor(this.elapsedTime) % 10 ){
                        case 1:
                            texture = this.graph.scene.textures["time1A"];
                            break;
                        case 2:
                            texture = this.graph.scene.textures["time2A"];
                            break;
                        case 3:
                            texture = this.graph.scene.textures["time3A"];
                            break;
                        case 4:
                            texture = this.graph.scene.textures["time4A"];
                            break;
                        case 5:
                            texture = this.graph.scene.textures["time5A"];
                            break;
                        case 6:
                            texture = this.graph.scene.textures["time6A"];
                            break;
                        case 7:
                            texture = this.graph.scene.textures["time7A"];
                            break;
                        case 8:
                            texture = this.graph.scene.textures["time8A"];
                            break;
                        case 9:
                            texture = this.graph.scene.textures["time9A"];
                            break;
                        default:
                            texture = this.graph.scene.textures["time0A"];
                            break;
                    }
                    material.setTexture(texture);
                }
                else if(node == this.graph["horas_4"]){
                    switch( Math.floor(Math.floor(this.elapsedTime)/10) % 6 ){
                        case 1:
                            texture = this.graph.scene.textures["time1A"];
                            break;
                        case 2:
                            texture = this.graph.scene.textures["time2A"];
                            break;
                        case 3:
                            texture = this.graph.scene.textures["time3A"];
                            break;
                        case 4:
                            texture = this.graph.scene.textures["time4A"];
                            break;
                        case 5:
                            texture = this.graph.scene.textures["time5A"];
                            break;
                        case 6:
                            texture = this.graph.scene.textures["time6A"];
                            break;
                        case 7:
                            texture = this.graph.scene.textures["time7A"];
                            break;
                        case 8:
                            texture = this.graph.scene.textures["time8A"];
                            break;
                        case 9:
                            texture = this.graph.scene.textures["time9A"];
                            break;
                        default:
                            texture = this.graph.scene.textures["time0A"];
                            break;
                    }
                    material.setTexture(texture);
                }
                else if(node == this.graph["horas_3"]){
                    switch( Math.floor(Math.floor(this.elapsedTime)/60) ){
                        case 1:
                            texture = this.graph.scene.textures["time1A"];
                            break;
                        case 2:
                            texture = this.graph.scene.textures["time2A"];
                            break;
                        case 3:
                            texture = this.graph.scene.textures["time3A"];
                            break;
                        case 4:
                            texture = this.graph.scene.textures["time4A"];
                            break;
                        case 5:
                            texture = this.graph.scene.textures["time5A"];
                            break;
                        case 6:
                            texture = this.graph.scene.textures["time6A"];
                            break;
                        case 7:
                            texture = this.graph.scene.textures["time7A"];
                            break;
                        case 8:
                            texture = this.graph.scene.textures["time8A"];
                            break;
                        case 9:
                            texture = this.graph.scene.textures["time9A"];
                            break;
                        default:
                            texture = this.graph.scene.textures["time0A"];
                            break;
                    }
                    material.setTexture(texture);
                }
                else if(node == this.graph["horas_2"]){
                    switch( Math.floor(Math.floor(this.elapsedTime)/600) %6 ){
                        case 1:
                            texture = this.graph.scene.textures["time1A"];
                            break;
                        case 2:
                            texture = this.graph.scene.textures["time2A"];
                            break;
                        case 3:
                            texture = this.graph.scene.textures["time3A"];
                            break;
                        case 4:
                            texture = this.graph.scene.textures["time4A"];
                            break;
                        case 5:
                            texture = this.graph.scene.textures["time5A"];
                            break;
                        case 6:
                            texture = this.graph.scene.textures["time6A"];
                            break;
                        case 7:
                            texture = this.graph.scene.textures["time7A"];
                            break;
                        case 8:
                            texture = this.graph.scene.textures["time8A"];
                            break;
                        case 9:
                            texture = this.graph.scene.textures["time9A"];
                            break;
                        default:
                            texture = this.graph.scene.textures["time0A"];
                            break;
                    }
                    material.setTexture(texture);
                }
                else if(node == this.graph["horas_1"]){
                    switch( Math.floor(Math.floor(this.elapsedTime)/3600) %24 ){
                        case 1:
                            texture = this.graph.scene.textures["time1A"];
                            break;
                        case 2:
                            texture = this.graph.scene.textures["time2A"];
                            break;
                        case 3:
                            texture = this.graph.scene.textures["time3A"];
                            break;
                        case 4:
                            texture = this.graph.scene.textures["time4A"];
                            break;
                        case 5:
                            texture = this.graph.scene.textures["time5A"];
                            break;
                        case 6:
                            texture = this.graph.scene.textures["time6A"];
                            break;
                        case 7:
                            texture = this.graph.scene.textures["time7A"];
                            break;
                        case 8:
                            texture = this.graph.scene.textures["time8A"];
                            break;
                        case 9:
                            texture = this.graph.scene.textures["time9A"];
                            break;
                        default:
                            texture = this.graph.scene.textures["time0A"];
                            break;
                    }
                    material.setTexture(texture);
                }
                
                if(node == this.graph["pointsP1"]){
                    switch( this.pointsP1 ){
                        case 1:
                            texture = this.graph.scene.textures["time1A"];
                            break;
                        case 2:
                            texture = this.graph.scene.textures["time2A"];
                            break;
                        case 3:
                            texture = this.graph.scene.textures["time3A"];
                            break;
                        case 4:
                            texture = this.graph.scene.textures["time4A"];
                            break;
                        case 5:
                            texture = this.graph.scene.textures["time5A"];
                            break;
                        case 6:
                            texture = this.graph.scene.textures["time6A"];
                            break;
                        case 7:
                            texture = this.graph.scene.textures["time7A"];
                            break;
                        case 8:
                            texture = this.graph.scene.textures["time8A"];
                            break;
                        case 9:
                            texture = this.graph.scene.textures["time9A"];
                            break;
                        default:
                            texture = this.graph.scene.textures["time0A"];
                            break;
                    }
                    material.setTexture(texture);
                }
                else if(node == this.graph["pointsP2"]){
                    switch( this.pointsP2 ){
                        case 1:
                            texture = this.graph.scene.textures["time1A"];
                            break;
                        case 2:
                            texture = this.graph.scene.textures["time2A"];
                            break;
                        case 3:
                            texture = this.graph.scene.textures["time3A"];
                            break;
                        case 4:
                            texture = this.graph.scene.textures["time4A"];
                            break;
                        case 5:
                            texture = this.graph.scene.textures["time5A"];
                            break;
                        case 6:
                            texture = this.graph.scene.textures["time6A"];
                            break;
                        case 7:
                            texture = this.graph.scene.textures["time7A"];
                            break;
                        case 8:
                            texture = this.graph.scene.textures["time8A"];
                            break;
                        case 9:
                            texture = this.graph.scene.textures["time9A"];
                            break;
                        default:
                            texture = this.graph.scene.textures["time0A"];
                            break;
                    }
                    material.setTexture(texture);
                }
            }
        }

        //console.log("MATERIAL ARRAY "+this.myMaterials+" || TEXTURE ARRAY "+this.myTextures);
        //console.log("\tPRIMITIVE "+node.primitive);
        //console.log("\tNÓ: "+node+" CHILDREN: "+node.children);

        if (node.primitive != null) {
            //console.log("MATERIAL PRIM "+nodeName+" emission: "+material.emission+" ambient: "+material.ambient+" diffuse: "+material.diffuse+" specular: "+material.specular+" shininess: "+material.shininess);
            this.pushMatrix();
            this.multMatrix(node.m);
            if (node.children.length == 0) {
                for(var j =0; j < node.animations.length; j++){
                    if( this.graph.animations[node.animations[j]] != null){
                        if(j ==0){
                            this.graph.animations[node.animations[j]].apply(this.elapsedTime);
                        }
                        else{
                            var currElapsedTime = this.elapsedTime;
                            for(var k = j -1 ; k >= 0; k--){
                                currElapsedTime -= this.graph.animations[node.animations[k]].time;
                            }
                            this.graph.animations[node.animations[j]].apply(currElapsedTime);
                        }
                        //console.log("ending condition " + this.graph.animations[node.animations[j]].endCond);
                        if(this.graph.animations[node.animations[j]].endCond == 0){
                            //console.log("why isnt it working?");
                            break;
                        }else{

                        }
                    }
                }
            }


            material.apply();
            if(this.graph.primitives[node.primitive].textResize != null && confirmer ==1 ){
                //console.log("--------RESIZING---------------");
                //console.log(this.graph.primitives[node.primitive]);
                //console.log(length_t);
                //console.log(length_s);
                this.graph.primitives[node.primitive].textResize(length_t,length_s);
            }

            this.graph.primitives[node.primitive].display();
            
            
            //console.log("AQUIIIIIIIII "+this.graph.primitives[node.primitive]);
            this.popMatrix();
            this.myMaterials.pop();
            this.myTextures.pop();
            texture=this.textures[this.myTextures[this.myTextures.length -1]];
            if (typeof texture == "undefined") {
                material.setTexture();
            }
            else {
                material.setTexture(texture);
            }
            //console.log("\tFINAL MATERIAL: "+this.myMaterials+" || FINAL TEXTURE "+this.myTextures);
        }
        else {

            for(var i = 0; i < node.children.length; i++){
                //console.log("MATERIAL FOR "+nodeName+" emission: "+material.emission+" ambient: "+material.ambient+" diffuse: "+material.diffuse+" specular: "+material.specular+" shininess: "+material.shininess);
                this.pushMatrix();    // comecamos a processar o descendente
                this.multMatrix(node.m);


                material.apply();
                if (node.flag == 0) {
                    for(var j = 0; j < node.animations.length; j++){
                        this.graph[node.children[i]].animations.push(node.animations[j]);
                    }
                    node.flag = 1;
                }


                this.processaGrafo(node.children[i]);
                this.popMatrix();     // recuperamos o descendente
            }
            this.myMaterials.pop();
            this.myTextures.pop();
            texture=this.textures[this.myTextures[this.myTextures.length -1]];
            if (typeof texture == "undefined") {
                material.setTexture();
            }
            else {
                material.setTexture(texture);
            }
        }
    }
};

XMLscene.prototype.updateLights = function () {
    //this.lights[1].enable();
    for(var i =0; i < this.lights.length; i++ ){
        if(this.enableLight[i] == true){
            this.lights[i].enable();
        }
        else{
            this.lights[i].disable();
        }
        this.lights[i].update();
    }
};

XMLscene.prototype.loadView = function () {
    this.camera = this.views[this.myView];
    this.myInterface.setActiveCamera(this.camera);
};

XMLscene.prototype.updateView = function () {
    var size = Object.keys(this.views).length;
    var myViews = Object.keys(this.views);

    var next=0;
    for (var i = 0; i < myViews.length; i++) {
        if (this.myView == myViews[i]) {
            next = 1;
        }
        if(next == 1){
            this.myView = myViews[(i+1)%size];
            break;
        }
    }

    this.camera = this.views[this.myView];
    this.myInterface.setActiveCamera(this.camera);
    //console.log("VIEW CHANGED TO: "+this.myView);

};

XMLscene.prototype.changeView = function (cam) {
    //console.log("CHANGE VIEW "+cam);
    //TODO animation through views
    this.camera = this.views[cam];
    this.myInterface.setActiveCamera(this.camera);
};


XMLscene.prototype.display = function () {
    // ---- BEGIN Background, camera and axis setup
    
    this.logPicking();
	this.clearPickRegistration();

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    this.enableTextures(true);

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    this.axis.display();

    this.setDefaultAppearance();


    // ---- END Background, camera and axis setup

    // it is important that things depending on the proper loading of the graph
    // only get executed after the graph has loaded correctly.
    // This is one possible way to do it

    if (this.graph.loadedOk)
    {

        this.updateLights();
        if (this.myView == '') {
            this.myView = this.views_default;
        }
        this.loadView();
        this.processaGrafo(this.scene_root);
        this.changeView(this.myInterface.camera);
        
        
        var count=1;
        
        // draw objects
        this.myMaterial = this.graph.materials["2"];
        this.translate(10.656, 2.53, 8.35);
        
        for (i =0; i<this.objects.length; i++) {
            for(var j = 0; j<this.objects[i].length; j++){
                this.pushMatrix();
                
                if(i<3){
                    this.translate(-i*.65+j*.665, 0, i*.67);
                }
                else if(i<7)
                    this.translate(-2*.65+j*.665, 0, i*.67);
                else{
                    switch(i){
                        case 7:
                            this.translate(-1*.65+j*.665, 0, i*.67);
                            break;
                        case 8:
                            this.translate(j*.665, 0, i*.67);
                            break;
                    }
                }
                    
                this.scale(.20,.20,.20);
                this.rotate(-Math.PI/2, 1, 0 ,0);
                this.registerForPick(count, this.objects[i][j]);

                this.myMaterial.apply();
                this.objects[i][j].display();
                this.popMatrix();
                count++;
            }
        }
        
        //console.log("AQUIIIIIIIIIIIII "+this.objectPlayers.length);
        
        this.translate(0, .18, 0);
        count=1;
        var l=0,o=1;
        for(var m=0; m<this.objectPlayers.length; m++){
            l=1;
            for(var n=0;n<this.objectPlayers[m].length; n++){
                this.pushMatrix();
                
                if(m==0){   //p1
                    if(n<=4){
                        this.translate(n*.665, 0, 0);
                    }
                    else if(n<=7){
                        this.translate(l*.665, 0, .67);
                        l++;
                    }
                    else{
                        this.translate(2*.665, 0, 2*.67);
                    }
                    this.myMaterial = this.graph.materials['p1'];
                    this.myMaterial.apply();
                }
                else{       //p2
                    this.myMaterial = this.graph.materials['p2'];
                    this.myMaterial.apply();
                    this.translate(0, 0, 6*.67);
                    if(n==0){
                        this.translate(2*.665, 0, 0);
                    }
                    else if(n<=3){
                        this.translate(o*.665, 0, .67);
                        o++;
                    }
                    else{
                        this.translate((n-4)*.665, 0, 2*.67);
                    }
                }
                
                if(n==2 && m==0){
                    this.translate(0, .1, 0);
                    this.scale(.3,.3,.3);
                }
                else if(n==6 && m==1){
                    this.translate(0, .1, 0);
                    this.scale(.3,.3,.3);
                }
                else{
                    this.scale(.2,.2,.2);
                }
                    
                
                this.rotate(-Math.PI/2, 1, 0 ,0);
                this.registerForPick(100+count, this.objectPlayers[m][n]);

                
                this.objectPlayers[m][n].display();
                this.popMatrix();
                count++;
            }
        }
        
        
        
        
    };

};

XMLscene.prototype.changeScene = function(){
    console.log("Do something...");
    /*
    var myInterface = new MyInterface();
    myInterface.cl();
    this.myInterface = myInterface
    var myScene = new XMLscene(myInterface);
    */

    var filename = null;
    switch (this.fileNo) {
        case 0:
            filename = getUrlVars()['file'] || "cena2.xml";
            this.fileNo = 1;
            break;
        case 1:
            filename = getUrlVars()['file'] || "cena1.xml";
            this.fileNo = 0;
            break;
    }
    
    this.graph.reader.open('scenes/'+filename, this.graph);
    console.log("Changed to other scene !");
}

XMLscene.prototype.undoFunc = function(){
    console.log("Undoing...");
    console.log("Undo done !");
}


