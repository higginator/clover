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


    },

    update : function (dt) {
        //always walk right
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.body.update(dt);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.alwaysUpdate = true;
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

    this.renderables = {};
    this.renderables.walkingSheet = this.renderable;
    this.renderables.eatingSheet = new me.AnimationSheet(0, 0, {
            image : "eat",
            framewidth : 640,
            frameheight : 308
        });

    var spriteContainer = new me.Container(0,0,640,308);
    spriteContainer.addChild(this.renderables.walkingSheet);
    spriteContainer.addChild(this.renderables.eatingSheet);

    this.renderable = spriteContainer;
    this.renderable.alwaysUpdate = true;


        // define color walking animations using frame indexing
        this.renderables.walkingSheet.addAnimation("walk-b", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        this.renderables.walkingSheet.addAnimation("walk-br", [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
        this.renderables.walkingSheet.addAnimation("walk-g", [24, 25, 26, 27, 28,29,30,31,32,33,34,35]);
        this.renderables.walkingSheet.addAnimation("walk-o", [36,37,38,39,40,41,42,43,44,45,46,47]);
        this.renderables.walkingSheet.addAnimation("walk-r", [48,49,50,51,52,53,54,55,56,57,58,59]);
        this.renderables.walkingSheet.addAnimation("walk-v", [60,61,62,63,64,65,66,67,68,69,70,71]);
        this.renderables.walkingSheet.addAnimation("walk-w", [72,73,74,75,76,77,78,79,80,81,82,83]);
        this.renderables.walkingSheet.addAnimation("walk-y", [84,85,86,87,88,89,90,91,92,93,94,95]);
        this.renderables.walkingSheet.addAnimation("none", [96,96,96,96,96,96,96,96,96,96,96,96]);

        
        this.renderables.eatingSheet.addAnimation("eat-b", [0, 1, 2, 3, 4, 5]);
        this.renderables.eatingSheet.addAnimation("eat-g", [6, 7, 8, 9, 10, 11]);

        this.renderables.eatingSheet.addAnimation("none", [37,37,37,37,37,37]);

        // set the white animation as default
        this.renderables.walkingSheet.setCurrentAnimation("walk-w");
        this.renderables.eatingSheet.setCurrentAnimation("none");

        // Create a vector that represents the player center point
        this.center = new me.Vector2d(this.hWidth, this.hHeight);

        // Create the "tracking vector"

        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(3, 15);


    },

    /**
     * update the entity
     */
    update : function (dt) {
        
        old = this.renderable;

        //always walk right
        this.body.vel.x += this.body.accel.x * me.timer.tick;


        if (me.input.isKeyPressed('r')) {
          //change sprite to render
          this.renderables.walkingSheet.setCurrentAnimation("walk-r");
          //set global var
          curr_color='red';
        }
        if (me.input.isKeyPressed('g')) {
          this.renderables.walkingSheet.setCurrentAnimation("walk-g");
          curr_color='green';
        }
        if (me.input.isKeyPressed('w')) {
          this.renderables.walkingSheet.setCurrentAnimation("walk-w");
          curr_color='white';
        }
        if (me.input.isKeyPressed('br')) {
          this.renderables.walkingSheet.setCurrentAnimation("walk-br");
          curr_color='brown';
        }
        if (me.input.isKeyPressed('o')) {
          this.renderables.walkingSheet.setCurrentAnimation("walk-o");
          curr_color='orange';
        }
        if (me.input.isKeyPressed('v')) {
          this.renderables.walkingSheet.setCurrentAnimation("walk-v");
          curr_color='violet';
        }
        if (me.input.isKeyPressed('y')) {
          this.renderables.walkingSheet.setCurrentAnimation("walk-y");
          curr_color='yellow';
        }
        if (me.input.isKeyPressed('b')) {
          this.renderables.walkingSheet.setCurrentAnimation("walk-b");
          curr_color='blue';
        }
        
        if (me.input.isKeyPressed('eat')) {
        //define eating animations
          this.renderables.eatingSheet.setCurrentAnimation("eat-b","none");
          this.renderables.walkingSheet.setCurrentAnimation("none","walk-w");
          curr_color='blue';
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;
     
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

// register our object entities in the object pool
me.pool.register("LeafEntity", game.LeafEntity);
