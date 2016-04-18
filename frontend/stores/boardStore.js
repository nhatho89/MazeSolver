var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatchers/dispatcher.js');
var BoardConstants = require('../constants/boardConstants.js');

var _board = [];

var BoardStore = new Store(AppDispatcher)

BoardStore.getStore = function() {
  return _board;
}

var resetBoard = function(board) {
  $('.wall').attr('class', 'board-item empty');
}

BoardStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case BoardConstants.UPDATE_BOARD:
    _board = payload
    BoardStore.__emitChange();
    break;
    case BoardConstants.BOARD_RESET:
    resetBoard(_board);
    break;
  }
}



module.exports = BoardStore;
