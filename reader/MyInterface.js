function MyInterface() {
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
    
    

	this.gui = new dat.GUI();
    this.guiControls = new dat.GUI();
    
    this.camera = 0;
    this.difficulty = 1;
    this.type = 0;
    var Controls = function() {
        this.time = 0;
    };
    var controls = new Controls();
    var cena = this.scene;
    
	this.Lights = this.gui.addFolder("Lights");
	this.Lights.open();
    
    this.Scenes = this.gui.addFolder("Scenes");
    this.Scenes.add(this.scene, 'changeScene');
    this.Scenes.open();
    
    this.Options = this.guiControls.addFolder("Options");
    this.Options.add(this, 'difficulty', 1, 3).step(1);
    this.Options.add(this, 'type', { HvsH: 0, HvsM: 1, MvsM: 2 });
    this.Options.add(this.scene, 'undoFunc');
    this.Options.add(this, 'camera', { p1: 0, right: 1, p2: 2 , left: 3});
    this.Options.add(controls, 'time').listen();
    this.Options.open();
    
    
    var update = function() {
        requestAnimationFrame(update);
        controls.time = cena.elapsedTime;
    };
    update();

	return true;
};

MyInterface.prototype.lightBox = function(i,id){
	this.Lights.add(this.scene.enableLight,i,this.scene.enableLight[i]).name(id);
}

MyInterface.prototype.processKeyboard = function(event){
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

	// Check key codes e.g. here:
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):		// 'A'
			console.log("Key 'A' pressed");
			//console.log(this.scene.scene_root+"  "+this.scene.scene_axis);
			break;
		case (77):		// 'M'
			console.log("Key 'M' pressed");
			break;
		case (86):		// 'V'
			console.log("Key 'V' pressed");
			this.scene.updateView();	//XMLscene
			break;
		case (97):		// 'a'
			console.log("Key 'a' pressed");
			break;
		case (109):		// 'm'
			console.log("Key 'm' pressed");
			break;
		case (118):		// 'v'
			console.log("Key 'v' pressed");
			this.scene.updateView();	//XMLscene
			break;
	};
}
