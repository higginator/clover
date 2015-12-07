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

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        
        // set the standing animation as default
        this.renderable.setCurrentAnimation("walk");


        // Create a vector that represents the player center point
        this.center = new me.Vector2d(this.hWidth, this.hHeight);

        // Create the "tracking vector"
        this.tracking = this.pos.clone();
        //me.game.viewport.move(300,0);
        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(3, 15);


    },

    /**
     * update the entity
     */
    update : function (dt) {

 //always walk right
        this.body.vel.x += this.body.accel.x * me.timer.tick;

        if (me.input.isKeyPressed('red')) {
          //change sprite to render
          //this.renderable.setCurrentAnimation("walk-red");
            //TODO- define walking in all colors :)
        }
     
        // apply physics to the body (this moves the entity)
        this.body.update(dt);
     
        // set the display to follow our position on both axis
        //off = new me.Vector2d(-1, 0);
        //console.log("x, ", this.pos.x);
        //console.log("y, ", this.pos.y);
        //me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        //me.game.viewport.setDeadzone(0,0);

       //  // Update the "tracking vector"
       //  this.tracking.copy(this.pos).add(this.center);
       //  // Set viewport to follow the "tracking vector"
      

       // // me.game.viewport.follow(this.tracking, me.game.viewport.AXIS_BOTH);


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
        // Make all other objects solid
        return true;
    }
});
