const React = require('react');
const ReactDOM = require('react-dom');
import Wave from './Waves.jsx';



const Bootstrapper = {
  start() {
    ReactDOM.render(
      <Wave>
        foobarrrrrrrrzz
      </Wave>,
      document.getElementById('content')
    )
  }
}
export default Bootstrapper;
