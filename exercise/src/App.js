import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {

  f1 = (a, b, event) => {
    console.log(this);
    console.log(a);
    console.log(b);
    console.log(event);

    event.preventDefault()
  }

  render() {
    return (
      <div className="App">
        <div onClick={() => {
          this.f1(1, 2)
        }}>123</div>
      </div>
    );
  }

}

export default App;
