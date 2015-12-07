var curr_color = 'white'; //here's the global color variable

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


        if (me.input.isKeyPressed('r')) {
          //change sprite to render
          this.renderable.setCurrentAnimation("walk-r");
          //set global var
          curr_color='red';
        }
        if (me.input.isKeyPressed('g')) {
          this.renderable.setCurrentAnimation("walk-g");
          curr_color='green';
        }
        if (me.input.isKeyPressed('w')) {
          this.renderable.setCurrentAnimation("walk-w");
          curr_color='white';
        }
        if (me.input.isKeyPressed('br')) {
          this.renderable.setCurrentAnimation("walk-br");
          curr_color='brown';
        }
        if (me.input.isKeyPressed('o')) {
          this.renderable.setCurrentAnimation("walk-o");
          curr_color='orange';
        }
        if (me.input.isKeyPressed('v')) {
          this.renderable.setCurrentAnimation("walk-v");
          curr_color='violet';
        }
        if (me.input.isKeyPressed('y')) {
          this.renderable.setCurrentAnimation("walk-y");
          curr_color='yellow';
        }
        if (me.input.isKeyPressed('b')) {
          this.renderable.setCurrentAnimation("walk-b");
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
  a Coin entity
 ----------------- */
game.LeafEntity = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
    // call the parent constructor
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
  },

  // this function is called by the engine, when
  // an object is touched by something
  onCollision : function (response, other) {
    if (LeafEntity.color == button_color) { // if leaf color is same as button(s) pressed color
      // do something when leaf is eaten by chameleon

      // play a "leaf eating" sound
      // me.audio.play("eating-sound");

      // make sure it cannot be eaten again
      this.body.setCollisionMask(me.collision.types.NO_OBJECT);

      // remove the leaf if buttons pressed correspond to color of leaf
      me.game.world.removeChild(this);
    }
  }
});

