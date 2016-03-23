const React = require('react');
const Waveform = require('./Waveform.jsx');

let WaveformEditor = React.createClass({
  render: function() {
    return (
      <div id="WaveformEditor" className="container">
        hi im the waveform editor
        <Waveform
          height={300} width={300}
          buffer={this.props.buffer}
        />
      </div>
    )
  }
});

module.exports = WaveformEditor;
