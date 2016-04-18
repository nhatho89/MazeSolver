var React = require('react');
var BoardItem = require('./boardItem');
var BoardStore = require('../stores/boardStore');
var BoardActions = require('../actions/boardActions');

var Board = React.createClass({

  getInitialState: function() {
    return ({
      board: BoardStore.getStore(),
      classNames: "board-item empty"
    });
  },

  componentWillUnmount: function() {
    this.boardListener.remove();
  },

  componentWillMount: function() {
    this.boardListener = BoardStore.addListener(this.updateBoard);
  },

  updateBoard: function() {
    if (BoardStore.reset) {
      this.setState({
        reset: true
      })
    }

    this.setState({
      board: this.generateBoardItem()
    })
  },

  componentDidMount: function() {
    BoardActions.updateBoard(this.generateBoardItem());
  },

  generateBoardItem: function() {

		items = []
		var key = 0
		for (var i = 0; i < 40; i++){
			for (var j = 0; j < 40; j++){
				items.push(
          <BoardItem
            key={key}
						pos={[i,j]}
            reset={this.state.reset}
            />)
				key++;
			}
		}
		return items
  },

  render: function() {
    return (
      <div className="board-container">
        <div className="board">
					<div>
					<span className="board-helper"/>
					</div>
					{this.state.board}
				</div>
      </div>
    );
  }

});

module.exports = Board;
