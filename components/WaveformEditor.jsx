const React = require('react');
const Waveform = require('./Waveform.jsx');

let WaveformEditor = React.createClass({
  render: function() {
    return (
      <div id="WaveformEditor">
        <Waveform
          id="Waveform"
          height={window.innerHeight-30} width={window.innerWidth-3}
          buffer={this.props.buffer}
        />
        <p>hi im the waveform editor</p>
      </div>
    )
  }
});

module.exports = WaveformEditor;
