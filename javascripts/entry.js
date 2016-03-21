require('../less/main.less');

'use strict';

import React from "react";
const ReactDOM = require('react-dom');

let StartButton = React.createClass({
  playSound: function() {
    let src = this.props.source;
    src.connect(this.props.context.destination);
    src.start();
  },
  render: function() {
    return (
      <div>
        <button onClick={this.playSound} />
      </div>
    )
  }
});

let Wave = React.createClass({
  parse: function() {
    let parsed = this.props.children.toString();
    return {__html: parsed};
  },

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
        this.setState({buff: buffer});
        let source = context.createBufferSource();
        source.buffer = this.state.buff;
        this.setState({audioSource: source});
      }.bind(this));
    }.bind(this);
    bufRequest.send();
  },

  play: function() {
    this.state.audioSource.start();
  },


  componentDidMount: function() {
    let audioContext = new (window.AudioContext || window.webkitAudioContext);
    this.setState({context: audioContext});
  },
  getInitialState: function() {
    return {
      track: null, //  objectURL representing original track
      buff: null,  //  AudioBuffer containing staged track
      context: null,//  WebAudioContext
      audioSource: null// bufferSource
    }
  },
  render: function() {
    return (
      <div className="foo">
        <p dangerouslySetInnerHTML={this.parse()} />
        <input type="file" onChange={this.loadFile}/>
        <StartButton
          source={this.state.audioSource}
          context={this.state.context}
          play={this.play}
        />
        <audio id="audio" src={this.state.track} controls ></audio>
      </div>
    )
  }
});



const App = {
  start() {
    ReactDOM.render(
      <Wave>
        foobarrrrrrrrzz
      </Wave>,
      document.getElementById('content')
    )
  }
}

App.start();
