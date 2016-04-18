var AppDispatcher = require('../dispatchers/dispatcher.js');
var BoardConstants = require('../constants/boardConstants.js');

var BoardActions = {
  updateBoard: function(board) {
    AppDispatcher.dispatch({
      actionType: BoardConstants.UPDATE_BOARD,
      board: board
    });
  },

  clearMaze: function() {
    AppDispatcher.dispatch({
      actionType: BoardConstants.BOARD_RESET
    });
  }

};

module.exports = BoardActions;
