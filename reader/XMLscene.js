
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
    this.myTime = this.elapsedTime;
    
    this.status = 'a jogar';
    this.pointsP1 = 0;
    this.pointsP2 = 0;
    
    this.selectObjects=[];
	
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
    
    this.map = {
        101: 13,
        102: 14,
        103: 15,
        104: 16,
        105: 17,
        106: 24,
        107: 25,
        108: 26,
        109: 35,
        110: 75,
        111: 84,
        112: 85,
        113: 86,
        114: 93,
        115: 94,
        116: 95,
        117: 96,
        118: 97
    };
    
    this.mapAnimations = {
        101: 0,
        102: 0,
        103: 0,
        104: 0,
        105: 0,
        106: 0,
        107: 0,
        108: 0,
        109: 0,
        110: 0,
        111: 0,
        112: 0,
        113: 0,
        114: 0,
        115: 0,
        116: 0,
        117: 0,
        118: 0
    };
   
    this.gameBoard = new MyGameBoard(this);
    
    this.animationPlayers = [null, new MyPieceAnimation(this, 2, 2, 'N'), new MyPieceAnimation(this, 2, 2, 'S'), new MyPieceAnimation(this, 2, 2, 'E'), new MyPieceAnimation(this, 2, 2, 'W')];
	
	
	
    this.count=0;
    this.ppp_1 = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
    this.ppp_2 = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
    this.setPickEnabled(true);
	//console.log("wowzers");
	//var key = this.map.getKeyByValue(97);
	//console.log(key);
};

Object.prototype.getKeyByValue = function(value) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}

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
    var peca, vert=null, vert_a=null, vert_n=null, hor=null, hor_a=null, hor_n=null;
    var anim = null, p;
    
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];				
					console.log("Picked object: " + obj + ", with pick id " + customId);
                    if(customId<100){
                        console.log("SELECIONEI LUGAR");
                        if(this.selectObjects[this.selectObjects.length-1]>=100){
                            peca = this.selectObjects[this.selectObjects.length-1];
                            
                            vert_a=Math.floor(this.map[peca]/10);
                            vert_n=Math.floor(customId/10);
                            vert = vert_n - vert_a;
                            //console.log("Va: "+vert_a+" Vn: "+vert_n+" V: "+vert);
                            hor_a=this.map[peca]%10;
                            hor_n=customId%10;
                            hor = hor_n - hor_a;
                            //console.log("Ha: "+hor_a+" Hn: "+hor_n+" H: "+hor);
                            
                            if(vert > 0){
                                console.log("MOVE PECA (S) "+peca+" ACTUAL: "+this.map[peca]+" PROX: "+customId);
                                this.mapAnimations[peca] = 2;
                            }
                            else if(vert < 0){
                                console.log("MOVE PECA (N) "+peca+" ACTUAL: "+this.map[peca]+" PROX: "+customId);
                                this.mapAnimations[peca] = 1;
                            }
                            if(hor > 0){
                                console.log("MOVE PECA (E) "+peca+" ACTUAL: "+this.map[peca]+" PROX: "+customId);
                                this.mapAnimations[peca] = 3;
                            }
                            else if(hor < 0){
                                console.log("MOVE PECA (O) "+peca+" ACTUAL: "+this.map[peca]+" PROX: "+customId);
                                this.mapAnimations[peca] = 4;
                            }
							
							
                            // TODO mover peca com animacao : arco
                            // TODO check movimento
                            //this.map[peca] = customId;
                            this.gameBoard.keepId(customId,peca,this.mapAnimations[peca],hor_a-1,vert_a-1,hor_n-1,vert_n-1);
                        }
                    }
                    else{
                        console.log("SELECIONEI PECA");
                        // TODO extra: animacao 
                    }
                    this.selectObjects.push(customId);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
}

XMLscene.prototype.setSelObjects = function(customId,peca,anim){
	this.map[peca] = customId;
	this.mapAnimations[peca] = anim;
	//console.log( this.mapAnimations[peca]);
	//console.log(this.map[peca]);
	//console.log(peca);
	//this.selectObjects.push(customId);
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
    //console.log(this.gameBoard.playerWon);
    if(this.gameBoard.playerWon == 2){      // ainda ninguem ganhou
        this.myTime = this.elapsedTime;
    }
    else{                                   // alguem ganhou
        if(this.gameBoard.playerWon == 0){
            this.status = 'P1 ganhou !';
        }
        else if(this.gameBoard.playerWon == 1){
            this.status = 'P2 ganhou !';
        }
    }
	
	
    if(Math.floor(this.myTime) == 5400){
        if(this.pointsP1 == this.pointsP2){
            this.status = 'empate !';
        }
    }
    // TODO terminar o jogo: nao deixar fazer mais jogadas
   
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
                    switch(Math.floor(this.myTime) % 10 ){
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
                    switch( Math.floor(Math.floor(this.myTime)/10) % 6 ){
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
                    switch( Math.floor(Math.floor(this.myTime)/60) ){
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
                    switch( Math.floor(Math.floor(this.myTime)/600) %6 ){
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
                    switch( Math.floor(Math.floor(this.myTime)/3600) %24 ){
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
					//console.log("WELL ILL BE");
					//console.log(this.pointsP1);
                    switch( parseInt(this.pointsP1) ){
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
                    switch(  parseInt(this.pointsP2) ){
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

XMLscene.prototype.updateView2 = function (cam) {
    var size = Object.keys(this.views).length;
    var myViews = Object.keys(this.views);
	this.myView = myViews[cam];
     
        


};

XMLscene.prototype.changeView = function (cam) {
    //console.log("CHANGE VIEW "+cam);
    //TODO animation through views
	
	
	
	if(this.camera.position[0] >= this.views[cam].position[0] + 1 || this.camera.position[0] <= this.views[cam].position[0] - 1 || this.camera.position[1] >= this.views[cam].position[1] + 1 || this.camera.position[1] <= this.views[cam].position[1] - 1 || this.camera.position[2] >= this.views[cam].position[2] + 1 || this.camera.position[2] <= this.views[cam].position[2] - 1 ){
		var currPos = this.camera.position[2];
		var currPos1 = this.camera.position[1];
		var currPos2 = this.camera.position[0];
		
		if(this.camera.position[2] > this.views[cam].position[2]){
			currPos = this.camera.position[2] - 1;}
		else if(this.camera.position[2] < this.views[cam].position[2]){
			currPos = this.camera.position[2] + 1;
		}
		
		if(this.camera.position[1] > this.views[cam].position[1]){
		currPos1 = this.camera.position[1] - 1;
		}
		else if(this.camera.position[1] < this.views[cam].position[1]){
			currPos1 = this.camera.position[1] + 1;
		}
		
		if(this.camera.position[0] > this.views[cam].position[0]){
		currPos2 = this.camera.position[0] - 1;}
		else if(this.camera.position[0] < this.views[cam].position[0]){
			currPos2 = this.camera.position[0] + 1;
		}
		
		this.camera.position = [currPos2,currPos1,currPos,0];
		
		this.camera.far = this.views[cam].far;
		this.camera.target = this.views[cam].target;
		this.camera.direction = this.views[cam].direction;
		 this.myInterface.setActiveCamera(this.camera);
	}
	else{
		
		this.updateView2(5);
		this.myInterface.setActiveCamera(this.camera);
	}
	//console.log()
	//console.log(this.camera);
		//console.log(this.views[cam]);
		//console.log(cam);
		/*if(this.cam == 0){
			this.initCameras();
		}*/
    //this.camera = this.views[cam];
	//this.currCamera;
	
   
};


XMLscene.prototype.display = function () {
    var p, pp, pp_1, pp_2;
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
	this.gameBoard.changeMode(this.myInterface.type);
	
    if (this.graph.loadedOk)
    {

        this.updateLights();
        if (this.myView == '') {
            this.myView = this.views_default;
        }
        this.loadView();
        this.processaGrafo(this.scene_root);
        this.changeView(this.myInterface.camera);
        
		if(this.camerafirststatus = 0){
		this.initialcamera = this.camera;
	}
	
	this.camerafirststatus = 1;
        
        var count=1;
        
        // draw objects
        this.myMaterial = this.graph.materials["2"];
        this.translate(10.656, 2.53, 8.35);
        
        for (i =0; i<this.objects.length; i++) {
            count=1;
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
                if(i==0 && j==0){
                    count=3;
                }
                else if(i==1 && j==0){
                    count=2;
                }
                else if(i==7 && j==0){
                    count=2;
                }
                else if(i==8 && j==0){
                    count=3;
                }
                this.registerForPick((i+1)*10+count, this.objects[i][j]);

                this.myMaterial.apply();
                this.objects[i][j].display();
                this.popMatrix();
                count++;
            }
        }
        
        
        this.translate(0, .18, 0);
        count=1;
        var l=0,o=1;
        for(var m=0; m<this.objectPlayers.length; m++){
            l=1;
            for(var n=0;n<this.objectPlayers[m].length; n++){
                this.pushMatrix();
                
                if(m==0){   //p1
                    
                    p=101+n;
                    pp = this.map[p];
                    pp_1 = Math.floor(pp/10)-1;
                    pp_2 = (pp % 10)-3;
					
					if(p == 103 && this.mapAnimations[p] != 0){
					console.log("testingmax");
					console.log(this.mapAnimations[p]);
					console.log(pp);
					console.log(pp_1);
					console.log(pp_2);}
					
                    switch(this.mapAnimations[p]){
						
                        case 0:
                            this.translate(pp_2*.665, 0, pp_1*.67);
                            this.ppp_1[m][n] = pp_1;
                            this.ppp_2[m][n] = pp_2;
                            break;
                        case 1:
                            //console.log("NORTE");
                            if(this.ppp_1[m][n] != pp_1){
                                this.ppp_1[m][n] -= .05;
                                this.ppp_1[m][n] = Math.round(this.ppp_1[m][n] * 100) / 100;
                                //console.log( Math.round(this.ppp_1[m][n] * 100) / 100);
                                this.count+=.005;
                                this.translate(pp_2*.665, 0, this.ppp_1[m][n]*.67);
                            }
                            else{
                                this.mapAnimations[p] = 0;
                            }
                            break;
                        case 2:
                            //console.log('SUL pp_1:'+pp_1+" ppp_1:"+this.ppp_1[m][n]);
                            if(this.ppp_1[m][n] != pp_1){
                                this.ppp_1[m][n] += .05;
                                this.ppp_1[m][n] = Math.round(this.ppp_1[m][n] * 100) / 100;
                                //console.log( Math.round(this.ppp_1[m][n] * 100) / 100);
                                this.count+=.005;
                                this.translate(pp_2*.665, 0, this.ppp_1[m][n]*.67);
                            }
                            else{
                                this.mapAnimations[p] = 0;
                            }
                            //console.log('SUL__ pp_1:'+pp_1+" ppp_1:"+this.ppp_1[m][n]);
                            break;
                        case 3:
                            //console.log('ESTE');
                            if(this.ppp_2[m][n] != pp_2){
                                this.ppp_2[m][n] += .05;
                                this.ppp_2[m][n] = Math.round(this.ppp_2[m][n] * 100) / 100;
                                //console.log( Math.round(this.ppp_2[m][n] * 100) / 100);
                                this.count+=.005;
                                this.translate(this.ppp_2[m][n]*.665, 0, pp_1*.67);
                            }
                            else{
                                this.mapAnimations[p] = 0;
                            }
                            break;
                        case 4:
							
                            //console.log('OESTE');
                            if(this.ppp_2[m][n] != pp_2){
                                this.ppp_2[m][n] -= .05;
                                this.ppp_2[m][n] = Math.round(this.ppp_2[m][n] * 100) / 100;
                                //console.log( Math.round(this.ppp_2[m][n] * 100) / 100);
                                this.count+=.005;
                                this.translate(this.ppp_2[m][n]*.665, 0, pp_1*.67);
                            }
                            else{
                                this.mapAnimations[p] = 0;
                            }
                            break;
                    }
                    this.myMaterial = this.graph.materials['p1'];
                    this.myMaterial.apply();
                }
                else{       //p2
                    this.myMaterial = this.graph.materials['p2'];
                    this.myMaterial.apply();
                    
                    p=110+n;
                    pp = this.map[p];
                    pp_1 = Math.floor(pp/10)-1;
                    pp_2 = (pp % 10)-3;
                    
					
					if(p == 116 && this.mapAnimations[p] != 0){
					console.log("testingmax");
					console.log(this.mapAnimations[p]);
					console.log(pp);
					console.log(pp_1);
					console.log(pp_2);}
                    switch(this.mapAnimations[p]){
                        case 0:
						
                            //this.pushMatrix();
                            this.translate(pp_2*.665, 0, pp_1*.67);
                            //this.popMatrix();
                            this.ppp_1[m][n] = pp_1;
                            this.ppp_2[m][n] = pp_2;
                            //console.log("zzz "+this.ppp_1[m][n]+" "+this.ppp_2[m][n]+" "+pp_1+" "+pp_2);
                            break;
                        case 1:
						if(p == 116){
							console.log("omg working!");
						}
                            //console.log("NORTE");
                            if(this.ppp_1[m][n] != pp_1){
                                this.ppp_1[m][n] -= .05;
                                this.ppp_1[m][n] = Math.round(this.ppp_1[m][n] * 100) / 100;
                                //console.log( Math.round(this.ppp_1[m][n] * 100) / 100);
                                this.count+=.005;
                                this.translate(pp_2*.665, 0, this.ppp_1[m][n]*.67);
                            }
                            else{
								if(p == 116)
								console.log("zoinks finished!");
                                this.mapAnimations[p] = 0;
                            }
                            break;
                        case 2:
							if(p == 116)
							console.log("omg working!");
                            //console.log('SUL pp_1:'+pp_1+" ppp_1:"+this.ppp_1[m][n]);
                            if(this.ppp_1[m][n] != pp_1){
                                this.ppp_1[m][n] += .05;
                                this.ppp_1[m][n] = Math.round(this.ppp_1[m][n] * 100) / 100;
                                //console.log( Math.round(this.ppp_1[m][n] * 100) / 100);
                                this.count+=.005;
                                this.translate(pp_2*.665, 0, this.ppp_1[m][n]*.67);
                            }
                            else{
								if(p == 116)
								console.log("zoinks finished!");
                                this.mapAnimations[p] = 0;
                            }
                            //console.log('SUL__ pp_1:'+pp_1+" ppp_1:"+this.ppp_1[m][n]);
                            break;
                        case 3:
                            //console.log('ESTE');
							if(p == 116)
							console.log("omg working!");
                            if(this.ppp_2[m][n] != pp_2){
                                this.ppp_2[m][n] += .05;
                                this.ppp_2[m][n] = Math.round(this.ppp_2[m][n] * 100) / 100;
                                //console.log( Math.round(this.ppp_2[m][n] * 100) / 100);
                                this.count+=.005;
                                this.translate(this.ppp_2[m][n]*.665, 0, pp_1*.67);
                            }
                            else{
								if(p == 116)
								console.log("zoinks finished!");
                                this.mapAnimations[p] = 0;
                            }
                            break;
                        case 4:
						if(p == 116)
						console.log("omg working!");
                            //console.log('OESTE');
                            if(this.ppp_2[m][n] != pp_2){
                                this.ppp_2[m][n] -= .05;
                                this.ppp_2[m][n] = Math.round(this.ppp_2[m][n] * 100) / 100;
                                //console.log( Math.round(this.ppp_2[m][n] * 100) / 100);
                                this.count+=.005;
                                this.translate(this.ppp_2[m][n]*.665, 0, pp_1*.67);
                            }
                            else{
								if(p == 116)
								console.log("zoinks finished!");
                                this.mapAnimations[p] = 0;
                            }
                            break;
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
                    
                
                
                this.registerForPick(100+count, this.objectPlayers[m][n]);
                if(m==0){
                    p=101+n;
                }
                else{
                    p=110+n;
                }
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


