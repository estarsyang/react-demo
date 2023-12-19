import { useSelector, useDispatch } from 'react-redux'
import { changeNum, getNumThunk } from './store/toolkitIndex'
function App2() {
  const num = useSelector((state) => { return state.numReducer.num })
  const dispatch = useDispatch()
  return (
    <div>
      {num}
      <button onClick={() => {
        dispatch(changeNum())
      }}>num + 1</button>

      <button onClick={() => {
        dispatch(getNumThunk())
      }}>get Num</button>
    </div>
  )
}

export default App2