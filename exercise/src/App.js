import { connect } from 'react-redux'
import { changeMes } from './store/toolkitIndex';

function App(props) {
  console.log(props);
  return (
    <div>
      <p>App.js</p>
      {props.mes}
      <button onClick={() => {
        props.changeMes()
      }}>update store mes</button>
    </div>
  )
}
function mapStateToProps(state) {
  console.log(state);
  return { ...state.msgReducer }
}

function mapDispatchToProps(dispatch) {
  return {
    changeMes() {
      // dispatch({
      //   type: 'msgSlice/changeMes',
      //   playload: 'test'
      // })
      dispatch(changeMes('test'))

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)