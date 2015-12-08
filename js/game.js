
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(1200, 700, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("VPCam", game.VPCam);
        me.pool.register("LeafB", game.LeafB);
        me.pool.register("LeafR", game.LeafR);
        me.pool.register("LeafY", game.LeafY);
        me.pool.register("LeafO", game.LeafO);
        me.pool.register("LeafV", game.LeafV);
        me.pool.register("LeafG", game.LeafG);

          // enable the keyboard
          me.input.bindKey(me.input.KEY.A, "r", true);
          me.input.bindKey(me.input.KEY.S, "b", true);
          me.input.bindKey(me.input.KEY.D, "y", true);                   
          me.input.bindKey(me.input.KEY.Q, "o", true);
          me.input.bindKey(me.input.KEY.W, "v", true);
          me.input.bindKey(me.input.KEY.E, "g", true);                   
          me.input.bindKey(me.input.KEY.R, "br", true); 
          me.input.bindKey(me.input.KEY.Z, "w", true);
          me.input.bindKey(me.input.KEY.P, "eat", true); //DEBUG- DELETE ME!
          me.input.bindKey(me.input.KEY.UP, "fin", true); //game is over
                  
          //try sprites pt 2

          game.texture = new me.video.renderer.Texture(
                    me.loader.getJSON("texture"),
                    me.loader.getImage("texture")
                );
        // Start the game.
        me.state.change(me.state.MENU);
    }
};
