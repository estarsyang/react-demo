import { legacy_createStore } from 'redux'

function msgReducer(state = { mes: 'hello' }, action) {
  switch (action.type) {
    case 'changeMes':
      state.mes = action.playload
      return { ...state }
    default:
      return state
  }

}


const store = legacy_createStore(msgReducer)

export default store