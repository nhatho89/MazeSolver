var React = require('react');
var ReactDOM = require('react-dom');
var Window = require('./javascript/components/window');


var Maze = React.createClass({

  render: function() {

    return (
      <div>
        <Window/>
      </div>
    );
  }

});


document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Maze />, document.getElementById('root'));
});
