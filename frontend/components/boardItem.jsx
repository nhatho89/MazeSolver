var React = require('react');
var BoardStore = require('../stores/boardStore');

var BoardItem = React.createClass({

  getInitialState: function() {
    return ({
      classNames: "board-item empty"
      // reset: false
    });
  },

  componentWillReceiveProps: function(reset) {
    this.setState({
      reset: reset
    })
  },

  wallHandler: function() {
    if (this.freeTile()) {
      if (this.state.classNames === "board-item empty") {
        this.setState({
          classNames: "board-item wall"
        })
      } else {
        this.setState({
          classNames: "board-item empty"
        })
      }
    }
  },

  freeTile: function() {
    if (this.state.classNames === "board-item wall" || this.state.classNames === "board-item empty") {
      return true
    }
    return false
  },

  componentWillUnmount: function() {
    this.boardItemListener.remove();
  },

  componentDidMount: function() {
    // this.boardItemListener = BoardStore.addListener(this.updateBoardItem());
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

  // updateBoardItem: function() {
  //   if (this.state.reset) {
  //     this.setState({
  //       classNames: "board-item"
  //     })
  //   }
  // },

  render: function() {

    return (
      <div className={this.state.classNames} onClick={this.wallHandler}>
      </div>
    );
  }

});

module.exports = BoardItem;
