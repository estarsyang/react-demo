import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {

  function FnCom() {
    return <div>222</div>
  }

  class ClassCom extends React.Component {
    render() {
      return <div>class component</div>;
    }
  }
  return (
    <div className="App">
      111
      <FnCom />
      <ClassCom />
    </div>
  );

}

export default App;
