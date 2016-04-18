var React = require('react');
var Board = require('./board');
var BoardActions = require('../actions/boardActions');

var Menu = React.createClass({

  playMaze: function() {

  },

  clearMaze: function() {
    BoardActions.clearMaze();
  },

  render: function() {
    return (
      <div className="menu">
        Menu
        <button onClick={this.playMaze}>Play</button>
        <button onClick={this.clearMaze}>Clear</button>
      </div>
    );
  }

});

module.exports = Menu;
