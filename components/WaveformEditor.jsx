const React = require('react');
const Waveform = require('./Waveform.jsx');

let WaveformEditor = React.createClass({
  render: function() {
    return (
      <div id="WaveformEditor" className="container">
        <Waveform
          id="Waveform"
          height={600} width={1200}
          buffer={this.props.buffer}
        />
        <p>hi im the waveform editor</p>
      </div>
    )
  }
});

module.exports = WaveformEditor;
