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


        //always walk right
        this.body.vel.x += this.body.accel.x * me.timer.tick;


        if (me.input.isKeyPressed('red')) {
          //change sprite to render
          //this.renderable.setCurrentAnimation("walk-red");
            //TODO- define walking in all colors :)
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(3, 15);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

        // handle collisions against other shapes
        me.collision.check(this);


        // set the standing animation as default
        this.renderable.setCurrentAnimation("walk");

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },


   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
      switch (response.b.body.collisionType) {
        case me.collision.types.ENEMY_OBJECT:
          if (LeafEntity.color == button.color) {
            // eat the leaf!
          }
          else {
            // do nothing?
          }
          return false;
          break;

        default:
          // Do not respond to other objects (e.g. coins)
          return false;
      }
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
    var button_color = me.input //color of button pressed
    if LeafEntity.color == button_color { // if leaf color is same as button(s) pressed color
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
