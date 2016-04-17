var React = require('react');
var BoardItem = require('./boardItem');

var Board = React.createClass({
  getIntialState: function() {
    return {
      start: [40,0],
      end: [40,40]
    }
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
					{this.generateBoardItem()}
				</div>
      </div>
    );
  }

});

module.exports = Board;
