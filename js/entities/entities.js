var curr_color = 'white'; //here's the global color variable
var redController = new gameController();
var blueController = new gameController();
var yellowController = new gameController();

/**
 * BS Camera
 */
game.VPCam = me.Entity.extend({

		/**
		 * constructor
		 */
		init:function (x, y, settings) {
				// call the constructor
				this._super(me.Entity, 'init', [x, y , settings]);
				this.body.setVelocity(3, 15);
				this.alwaysUpdate=true;
		},

		update : function (dt) {
				//always walk right
				this.body.vel.x += .2*dt;
				this.body.update(dt);
				me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
				return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
		},
	 
		onCollision : function (response, other) {
				// Make all other objects solid
				return true;
		}
});


/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

		/**
		 * constructor
		 */
		init:function (x, y, settings) {
				// call the constructor
				this._super(me.Entity, 'init', [x, y , settings]);
		this.alwaysUpdate = true;

		//this is gonna be HUUUGE
		this.renderable = game.texture.createAnimationFromName([
		"b/b1", "b/b2", "b/b3", "b/b4",
		"b/b5", "b/b6", "b/b7", "b/b8",
		"b/b9", "b/b90", "b/b91", "b/b92",
		"r/r1", "r/r2", "r/r3", "r/r4",
		"r/r5", "r/r6", "r/r7", "r/r8",
		"r/r9", "r/r90", "r/r91", "r/r92",
		"y/y1", "y/y2", "y/y3", "y/y4",
		"y/y5", "y/y6", "y/y7", "y/y8",
		"y/y9", "y/y90", "y/y91", "y/y92",
		"o/o1", "o/o2", "o/o3", "o/o4",
		"o/o5", "o/o6", "o/o7", "o/o8",
		"o/o9", "o/o90", "o/o91", "o/o92", 
		"g/g1", "g/g2", "g/g3", "g/g4",
		"g/g5", "g/g6", "g/g7", "g/g8",
		"g/g9", "g/g90", "g/g91", "g/g92",       
		"v/v1", "v/v2", "v/v3", "v/v4",
		"v/v5", "v/v6", "v/v7", "v/v8",
		"v/v9", "v/v90", "v/v91", "v/v92",
		"br/br1", "br/br2", "br/br3", "br/br4",
		"br/br5", "br/br6", "br/br7", "br/br8",
		"br/br9", "br/br90", "br/br91", "br/br92",
		"w/w1", "w/w2", "w/w3", "w/w4",
		"w/w5", "w/w6", "w/w7", "w/w8",
		"w/w9", "w/w90", "w/w91", "w/w92",
		"b2","b3", "b5", "b6", "b7", "b9",
		"r2","r3", "r5", "r6", "r7", "r9",     
		"o2","o3", "o5", "o6", "o7", "o9",
		"v2","v3", "v5", "v6", "v7", "v9",     
		"y2","y3", "y5", "y6", "y7", "y9",
		"g2","g3", "g5", "g6", "g7", "g10",     

]);

		this.renderable.alwaysUpdate = true;

		this.renderable.addAnimation("walk-w", 
				["w/w1", "w/w2", "w/w3", "w/w4",
				"w/w5", "w/w6", "w/w7", "w/w8",
				"w/w9", "w/w90", "w/w91", "w/w92"]);
		this.renderable.addAnimation("walk-b", 
				["b/b1", "b/b2", "b/b3", "b/b4",
				"b/b5", "b/b6", "b/b7", "b/b8",
				"b/b9", "b/b90", "b/b91", "b/b92"]);
		this.renderable.addAnimation("walk-br", 
				["br/br1", "br/br2", "br/br3", "br/br4",
				"br/br5", "br/br6", "br/br7", "br/br8",
				"br/br9", "br/br90", "br/br91", "br/br92"]);
		this.renderable.addAnimation("walk-r", 
				["r/r1", "r/r2", "r/r3", "r/r4",
				"r/r5", "r/r6", "r/r7", "r/r8",
				"r/r9", "r/r90", "r/r91", "r/r92"]);
		this.renderable.addAnimation("walk-o", 
				["o/o1", "o/o2", "o/o3", "o/o4",
				"o/o5", "o/o6", "o/o7", "o/o8",
				"o/o9", "o/o90", "o/o91", "o/o92"]);
		this.renderable.addAnimation("walk-v", 
				["v/v1", "v/v2", "v/v3", "v/v4",
				"v/v5", "v/v6", "v/v7", "v/v8",
				"v/v9", "v/v90", "v/v91", "v/v92"]);
		this.renderable.addAnimation("walk-g", 
				["g/g1", "g/g2", "g/g3", "g/g4",
				"g/g5", "g/g6", "g/g7", "g/g8",
				"g/g9", "g/g90", "g/g91", "g/g92"]);
		this.renderable.addAnimation("walk-y", 
				["y/y1", "y/y2", "y/y3", "y/y4",
				"y/y5", "y/y6", "y/y7", "y/y8",
				"y/y9", "y/y90", "y/y91", "y/y92"]);

		this.renderable.addAnimation("eat-b", 
				["b2","b3", "b5", "b6", "b7", "b9"]);
		this.renderable.addAnimation("eat-v", 
				["v2","v3", "v5", "v6", "v7", "v9"]);
		this.renderable.addAnimation("eat-o", 
				["o2","o3", "o5", "o6", "o7", "o9"]);
		this.renderable.addAnimation("eat-g", 
				["g2","g3", "g5", "g6", "g7", "g10"]);
		this.renderable.addAnimation("eat-y", 
				["y2","y3", "y5", "y6", "y7", "y9"]);
		this.renderable.addAnimation("eat-r", 
				["r2","r3", "r5", "r6", "r7", "r9"]);

		 this.renderable.setCurrentAnimation("walk-w");      

				// set the default horizontal & vertical speed (accel vector)
				this.body.setVelocity(3, 15);


		},

		/**
		 * update the entity
		 */
		update : function (dt) {
				
				//always walk right
				this.body.vel.x += .2*dt;


				if (shouldBeRed() || me.input.isKeyPressed('r')) {
					//change sprite to render
					if (!this.renderable.isCurrentAnimation("walk-r")) {
						this.renderable.setCurrentAnimation("walk-r");
					}
					//set global var
					curr_color='red';
				}
				if (shouldBeGreen() || me.input.isKeyPressed('g')) {
					if (!this.renderable.isCurrentAnimation("walk-g")) {
						this.renderable.setCurrentAnimation("walk-g");
					}
					curr_color='green';
				}
				if (me.input.isKeyPressed('w')) {
					if (!this.renderable.isCurrentAnimation("walk-w")) {
						this.renderable.setCurrentAnimation("walk-w");
					}
					curr_color='white';
				}
				if (shouldBeBrown() || me.input.isKeyPressed('br')) {
					if (!this.renderable.isCurrentAnimation("walk-br")) {
						this.renderable.setCurrentAnimation("walk-br");
					}
					curr_color='brown';
				}
				if (shouldBeOrange() || me.input.isKeyPressed('o')) {
					if (!this.renderable.isCurrentAnimation("walk-o")) {
						this.renderable.setCurrentAnimation("walk-o");
					}
					curr_color='orange';
				}
				if (shouldBeViolet() || me.input.isKeyPressed('v')) {
					if (!this.renderable.isCurrentAnimation("walk-v")) {
						this.renderable.setCurrentAnimation("walk-v");
					}
					curr_color='violet';
				}
				if (shouldBeYellow() || me.input.isKeyPressed('y')) {
					if (!this.renderable.isCurrentAnimation("walk-y")) {
						this.renderable.setCurrentAnimation("walk-y");
					}
					curr_color='yellow';
				}
				if (shouldBeBlue() || me.input.isKeyPressed('b')) {
					if (!this.renderable.isCurrentAnimation("walk-b")) {
						this.renderable.setCurrentAnimation("walk-b");
					}
					curr_color='blue';
				}

				if (me.input.isKeyPressed('eat')) {
				//define eating animations
					this.renderable.setCurrentAnimation("eat-b","walk-b");
				}

				// if (me.input.isKeyPressed('fin')) {
				//   this.body.vel = new me.Vector2d(0,0);
				//   this.renderables.eatingSheet.setCurrentAnimation("none");
				//   this.renderable.setCurrentAnimation("none");
				//   this.renderables.finSheet.setCurrentAnimation("done");
				//   return;

				// }


				// apply physics to the body (this moves the entity)
				this.body.update(dt);
		 
				// handle collisions against other shapes
				me.collision.check(this);
 
				// return true if we moved or if the renderable was updated
				return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
		},


	 /**
		 * colision handler
		 * (called when colliding with other objects)
		 */
		onCollision : function (response, other) {
			return true;
		}
});

/*----------------
  a Leaf
 ----------------- */
game.LeafB = me.CollectableEntity.extend({
	init : function(x, y, settings) {
		this._super(me.CollectableEntity, 'init', [x, y , settings]);
	},
	onCollision : function (response, other) {
		if (curr_color.localeCompare('blue') == 0) {
			me.audio.play("eat");
			other.renderable.setCurrentAnimation("eat-b","walk-w");
			game.data.score += 1;
			me.game.world.removeChild(this);
			// me.timer.setTimeout(function () { //ok w/e i cant get this to work
			// 	me.game.world.removeChild(game.LeafB);
			// 	console.log('removed?');
			// }, 1000);
		} else {
			game.data.score = 0;
		}
			this.body.setCollisionMask(me.collision.types.NO_OBJECT);
			setAllControllersUnpinged();
		return false
	}
});

game.LeafR = me.CollectableEntity.extend({
	init : function(x, y, settings) {
		this._super(me.CollectableEntity, 'init', [x, y , settings]);
	},
	onCollision : function (response, other) {
		if (curr_color.localeCompare('red') == 0) {
			me.audio.play("eat");
			other.renderable.setCurrentAnimation("eat-r","walk-w");
			game.data.score += 1;
			me.game.world.removeChild(this);
			// me.timer.setTimeout(function () { //ok w/e i cant get this to work
			// 	me.game.world.removeChild(game.LeafB);
			// 	console.log('removed?');
			// }, 1000);
		} else {
			game.data.score = 0;
		}
			this.body.setCollisionMask(me.collision.types.NO_OBJECT);
			setAllControllersUnpinged();
		return false
	}
});

game.LeafO = me.CollectableEntity.extend({
	init : function(x, y, settings) {
		this._super(me.CollectableEntity, 'init', [x, y , settings]);
	},
	onCollision : function (response, other) {
		if (curr_color.localeCompare('orange') == 0) {
			me.audio.play("eat");
			other.renderable.setCurrentAnimation("eat-o","walk-w");
			game.data.score += 1;
			me.game.world.removeChild(this);
			// me.timer.setTimeout(function () { //ok w/e i cant get this to work
			// 	me.game.world.removeChild(game.LeafB);
			// 	console.log('removed?');
			// }, 1000);
		} else {
			game.data.score = 0;
		}
			this.body.setCollisionMask(me.collision.types.NO_OBJECT);
			setAllControllersUnpinged();
		return false
	}
});

game.LeafV = me.CollectableEntity.extend({
	init : function(x, y, settings) {
		this._super(me.CollectableEntity, 'init', [x, y , settings]);
	},
	onCollision : function (response, other) {
		if (curr_color.localeCompare('violet') == 0) {
			me.audio.play("eat");
			other.renderable.setCurrentAnimation("eat-v","walk-w");
			game.data.score += 1;
			me.game.world.removeChild(this);
			// me.timer.setTimeout(function () { //ok w/e i cant get this to work
			// 	me.game.world.removeChild(game.LeafB);
			// 	console.log('removed?');
			// }, 1000);
		} else {
			game.data.score = 0;
		}
			this.body.setCollisionMask(me.collision.types.NO_OBJECT);
			setAllControllersUnpinged();
		return false
	}
});

game.LeafG = me.CollectableEntity.extend({
	init : function(x, y, settings) {
		this._super(me.CollectableEntity, 'init', [x, y , settings]);
	},
	onCollision : function (response, other) {
		if (curr_color.localeCompare('green') == 0) {
			me.audio.play("eat");
			other.renderable.setCurrentAnimation("eat-g","walk-w");
			game.data.score += 1;
			me.game.world.removeChild(this);
			// me.timer.setTimeout(function () { //ok w/e i cant get this to work
			// 	me.game.world.removeChild(game.LeafB);
			// 	console.log('removed?');
			// }, 1000);
		} else {
			game.data.score = 0;
		}
			this.body.setCollisionMask(me.collision.types.NO_OBJECT);
			setAllControllersUnpinged();
		return false
	}
});

game.LeafY = me.CollectableEntity.extend({
	init : function(x, y, settings) {
		this._super(me.CollectableEntity, 'init', [x, y , settings]);
	},
	onCollision : function (response, other) {
		if (curr_color.localeCompare('yellow') == 0) {
			me.audio.play("eat");
			other.renderable.setCurrentAnimation("eat-y","walk-w");
			game.data.score += 1;
			me.game.world.removeChild(this);
			// me.timer.setTimeout(function () { //ok w/e i cant get this to work
			// 	me.game.world.removeChild(game.LeafB);
			// 	console.log('removed?');
			// }, 1000);
		} else {
			game.data.score = 0;
		}
			this.body.setCollisionMask(me.collision.types.NO_OBJECT);
			setAllControllersUnpinged();
			//reset code
		return false
	}
});

//gameController methods
function setAllControllersUnpinged() {
	redController.pinged = false;
	blueController.pinged = false;
	yellowController.pinged = false;
}

//colorChecks
function shouldBeRed() {
	if (redController.pinged && !blueController.pinged && !yellowController.pinged) { return true };
	return false;
}

function shouldBeBlue() {
	if (!redController.pinged && blueController.pinged && !yellowController.pinged) { return true };
	return false;
}

function shouldBeYellow() {
	if (!redController.pinged && !blueController.pinged && yellowController.pinged) { return true };
	return false;
}

function shouldBeOrange() {
	if (redController.pinged && !blueController.pinged && yellowController.pinged) { return true };
	return false;
}

function shouldBeViolet() {
	if (redController.pinged && blueController.pinged && !yellowController.pinged) { return true };
	return false;
}

function shouldBeGreen() {
	if (!redController.pinged && blueController.pinged && yellowController.pinged) { return true };
	return false;
}

function shouldBeBrown() {
	if (redController.pinged && blueController.pinged && yellowController.pinged) { return true };
	return false;
}
