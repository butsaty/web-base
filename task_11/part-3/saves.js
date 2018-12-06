let saves = {
  init: () => {
    'use strict';

    const gameName = 'ticTacToeState';

    let save = (player, state) => {
        let savedState = new SaveState(player, state);
        localStorage.setItem(gameName, JSON.stringify(savedState));
    }

    let load = () => {
        let gameState = JSON.parse(localStorage.getItem(gameName));
        if(!gameState){
            return null;
        }
        return new SaveState(gameState.player, gameState.state);
    }

    let reset = () => {
      localStorage.removeItem(gameName);
      load();    
    }

    function SaveState(player, state){
      this.player = player;//current player
      this.state = state;//D-array like [[]]
    }

    return {
        save: save,
        load: load,
        reset: reset
    };
  }
};