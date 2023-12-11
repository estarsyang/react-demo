
import './App.css';
import React from 'react';

import Son from './Son';


class App extends React.PureComponent {

  state = {
    mes: 'hello son'
  }

  changeMes(sonMes) {
    this.setState({
      mes: sonMes
    })
  }
  render() {
    return (
      <div style={{
        color: 'red',
        fontSize: '20px'
      }}>
        i am App
        <Son>
        </Son>
      </div>)

  }
}
export default App;
