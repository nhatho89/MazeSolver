var React = require('react');

var BoardItem = React.createClass({

  getInitialState: function() {
    return ({
      classNames: "board-item"
    });
  },

  wallHandler: function() {
    if (this.freeTile()) {
      if (this.state.classNames === "board-item") {
        this.setState({
          classNames: "board-item wall"
        })
      } else {
        this.setState({
          classNames: "board-item"
        })
      }
    }
  },

  freeTile: function() {
    if (this.state.classNames === "board-item wall" || this.state.classNames === "board-item") {
      return true
    }
    return false
  },

  componentDidMount: function() {
    if (this.props.pos[0] === 0 && this.props.pos[1] === 39) {
      this.setState({
        classNames: "board-item start"
      })
    } else if (this.props.pos[0] === 39 && this.props.pos[1] === 0) {
      this.setState({
        classNames: "board-item end"
      })
    }
  },

  render: function() {
    return (
      <div className={this.state.classNames} onClick={this.wallHandler}>
      </div>
    );
  }

});

module.exports = BoardItem;
