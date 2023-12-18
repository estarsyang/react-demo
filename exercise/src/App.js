


import { connect } from 'react-redux'



function App(props) {
  console.log(props);
  return (
    <div>
      <p>App.js</p>
      {props.mes}
      <button onClick={() => {


        props.dispatch({
          type: 'changeMes',
          playload: 'test'
        })

      }}>update store mes</button>
    </div>
  )
}
let connectApp = connect((state) => {
  return { ...state }
})(App)
export default connectApp