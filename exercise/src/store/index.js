import { legacy_createStore, combineReducers } from 'redux'

function msgReducer(state = { mes: 'hello' }, action) {
  switch (action.type) {
    case 'changeMes':
      state.mes = action.playload
      return { ...state }
    default:
      return state
  }

}

function numReducer(state = { num: 0 }, action) {
  switch (action.type) {
    case 'changeMes':
      state.num++
      return { ...state }
    default:
      return state
  }
}

const reducer = combineReducers({
  msgReducer,
  numReducer
})

const store = legacy_createStore(reducer)

export default store