var React = require('react');
var Board = require('./board');
var Menu = require('./menu');

var Window = React.createClass({

  render: function() {
    return (
      <div className="game-window">
        <Board/>
        <Menu/>
      </div>
    );
  }

});

module.exports = Window;
