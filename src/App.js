import React, {Component} from 'react';
import './App.css';
import Header from './components/Header/Header';
import WindContainer from './containers/WindContainer';
class App extends Component{
  render(){
    return (
      <div className='App'>
        <Header />
        <WindContainer />
      </div>
    );
  }
}

export default App;
