import React from 'react'
import { Context1 } from './App'

class GrandSon extends React.PureComponent {
  render() {
    return (
      <div>
        this is  grandSon
        <Context1.Consumer>
          {
            (value) => {
              console.log(value);
              return (
                <>
                  <div>{value.mes}</div>
                  <div>{value.name}</div>
                </>
              )
            }
          }
        </Context1.Consumer>
      </div>
    )
  }
}
export default GrandSon