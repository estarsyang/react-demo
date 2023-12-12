import Son from "./Son"
import TestHoc from './TestHoc'

const HocSon = TestHoc(Son)

function App() {
  return (
    <div>
      123
      <HocSon />
    </div>
  )
}

export default App