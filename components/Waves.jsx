import React from "react";
const ReactDOM = require('react-dom');
const SourceSelector = require('./SourceSelector.jsx');
const Menu = require('./Menu.jsx');
const WaveformEditor = require('./WaveformEditor.jsx');

let Waves = React.createClass({

  loadFile: function(e) {
    let context = this.state.context;
    //  save an objectURL containing the file as state.track
    let file = e.currentTarget.files[0];
    let pointer = URL.createObjectURL(file);
    this.setState({track: pointer});

    // load objectURL into buffer
    let bufRequest = new XMLHttpRequest();
    bufRequest.open("GET", pointer, true);
    bufRequest.responseType = 'arraybuffer';
    bufRequest.onload = function() {
      context.decodeAudioData(bufRequest.response, function(buffer) {
        //  create buffer, source, analyser, connect to destination
        this.setState({buffer: buffer});
        console.log(buffer);
        console.log(buffer.sampleRate);

        let source = context.createBufferSource();
        source.buffer = this.state.buffer;
        source.connect(this.state.context.destination);

        let analyser = context.createAnalyser();
        source.connect(analyser);

        analyser.fftSize = 2048;
        let bufferLength = analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);


        this.setState({audioSource: source});
        this.setState({analyser: analyser});

      }.bind(this));
    }.bind(this);
    bufRequest.send();
  },


  componentDidMount: function() {
    let audioContext = new (window.AudioContext || window.webkitAudioContext);
    this.setState({context: audioContext});
  },
  getInitialState: function() {
    return {
      track: null,        //  objectURL representing original track
      buffer: null,         //  AudioBuffer containing staged track
      context: null,      //  WebAudioContext
      audioSource: null,  // bufferSource
      analyser: null
    }
  },
  render: function() {
    return (
      <div className="waves-container">
        <Menu source={this.state.audioSource} />
        <div className="window">
          <SourceSelector loadFile={this.loadFile} />
          <WaveformEditor
            source={this.state.audioSource}
            context={this.state.context}
            analyser={this.state.analyser}
            buffer={this.state.buffer}
          />
        </div>
      </div>
    )
  }
});

module.exports = Waves;
