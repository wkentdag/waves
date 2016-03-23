const React = require('react');
const classNames = require('classnames');

import Draggable from 'react-draggable';


let SourceSelector = React.createClass({
  toggleDisplay: function(e) {
    console.log('togl');
    console.log(e.target.value);
    this.state.displayed = !this.state.displayed;
  },
  getInitialState: function() {
    return {
      displayed: true,
    }
  },
  render: function() {
    return (
      <Draggable>
        <div
          className={classNames('container', {'visible': this.state.displayed})}
          id="SourceSelector"
        >
          <input
            className={classNames('toggle', {'checked': this.state.displayed})}
            type="checkbox"
            onChange={this.toggleDisplay}
          />
          <label htmlFor="checkbox" />

          <div className="io container">
            <p>'io selector goes here'</p>
          </div>

          <div className="file container">
            <p>'file selector'</p>
            <input type="file" id="fileSelector" onChange={this.props.loadFile}/>
          </div>

          <div className="container" id="fileBrowser">
            <p>'fiel browser goes here'</p>
          </div>
        </div>
      </Draggable>
    )
  }
});

module.exports = SourceSelector;
