const React = require('react');
const ReactDOM = require('react-dom');

let Waveform = React.createClass({
  zoom: function() {
    console.log('cmon and zoooom!!');
  },
  draw: function(buffer) {
    if (!buffer) {
      console.log('exiting draw function - no buffer detected');
      return;
    }

    // h/t: https://stackoverflow.com/questions/22073716/create-a-waveform-of-the-full-track-with-web-audio-api
    //  setup channel
    let leftChannel = buffer.getChannelData(0);

    //  setup canvas
    let width = this.props.width;
    let height = this.props.height;
    let canvas = this.state.canvas;
    let ctx = canvas.getContext('2d');
    let lineOpacity = width / leftChannel.length;
    ctx.save();
    ctx.fillStyle = 'blue' ;
    ctx.fillRect(0,0,width,height);
    ctx.strokeStyle = 'white';
    ctx.globalCompositeOperation = 'lighter';
    ctx.translate(0, height / 2);
    ctx.globalAlpha = 0.06 ; // lineOpacity ;

    console.log(leftChannel.length);
    for (var i=0; i<leftChannel.length; i++) {
      // on which line do we get ?
      var x = Math.floor ( width * i / leftChannel.length ) ;
      var y = leftChannel[i] * height / 2 ;
      ctx.beginPath();
      ctx.moveTo( x  , 0 );
      ctx.lineTo( x+1, y );
      ctx.stroke();
    }
    ctx.restore();
    console.log('done');
  },
  componentDidMount: function() {
    if (this.props.buffer) {
      this.setState({
        canvas: ReactDOM.findDOMNode(this.refs.Waveform)
      });
      this.draw(this.props.buffer);

    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.buffer) {
      this.setState({buffer: nextProps.buffer});
      this.draw(nextProps.buffer);
    }
  },
  getInitialState: function() {
    return {
      buffer: null,
      canvas: null
    }
  },
  render: function() {
    return (
      <canvas
        height={this.props.height} width={this.props.width}
        ref="Waveform"
        onClick={this.zoom}
      >

      </canvas>
    )
  }
});

module.exports = Waveform;
