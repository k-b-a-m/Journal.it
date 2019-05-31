import React, {Component} from 'react';
import GoogleApiWrapper from './GoogleMaps';

class App extends Component {
  render(){
    return(
      <div>
        <div className="container">
          <h5>Welcome to the app I will render a map now...</h5>
        </div>
        <div>
          <GoogleApiWrapper />
        </div>
      </div>
    );
  };
};

export default App;
