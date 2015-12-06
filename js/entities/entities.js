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
    },

    /**
     * update the entity
     */
    update : function (dt) {

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(3, 15);
     
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
     
        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;
     
        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        
        // handle collisions against other shapes
        me.collision.check(this);
 
        // set the standing animation as default
        this.renderable.setCurrentAnimation("walk");

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

/* -----
 
  update the player pos
 
  ------ */
  update: function(dt) {
 
    //always walk right
    this.body.vel.x += this.body.accel.x * me.timer.tick;

 
    if (me.input.isKeyPressed('red')) {
      //change sprite to render
      //this.renderable.setCurrentAnimation("walk-red");
        //TODO- define walking in all colors :)
    }
 
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
        // Make all other objects solid
        return true;
    }
});
