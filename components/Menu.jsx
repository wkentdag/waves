const React = require('react');

let StartButton = React.createClass({
  playSound: function() {
    let src = this.props.source;
    src.start();
  },
  render: function() {
    return (
      <div className='wrapper'>
        <button
          onClick={this.playSound}
          className="button startButton"
        />
      </div>
    )
  }
});

let Menu = React.createClass({
  render: function() {
    return (
      <div className="menu">
        <StartButton source={this.props.source} />
      </div>
    )
  }
});

module.exports = Menu;
