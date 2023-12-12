import { Context1 } from './App'
import { useContext } from 'react'
function Son(props) {
  const value = useContext(Context1)
  console.log(value);
  return <div>
    Son
    <p>p is {props.msg}</p>
    <p>value is {value}</p>
  </div>
}

export default Son