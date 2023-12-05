import logo from './logo.svg';
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
      <div>
        i am App
        <Son mes={this.state.mes} changeMes={this.changeMes.bind(this)}>
        </Son>
      </div>)

  }
}
export default App;
