game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

        // load a level
        me.levelDirector.loadLevel("level-01");

        me.audio.playTrack("bg");

        // reset the score
        game.data.score = 0;
        game.data.high_score = 0;

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.audio.stopTrack();
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
