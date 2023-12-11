import React from "react";
import proptypes from 'proptypes'
import classnames from 'classnames/bind'

import sonStyle from './Son.module.css';
console.log(sonStyle);

const bindClassnames = classnames.bind(sonStyle)

const str = bindClassnames({
  son: true,
  son1: true
})

console.log(str);

class Son extends React.PureComponent {

  state = {
    sonMes: 'hello father',
    hasSon1: true
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <div className={
          bindClassnames({
            son: true,
            son1: this.state.hasSon1
          })
        }>1111</div>
        <button onClick={() => {
          this.setState({
            hasSon1: true
          })
        }}>add son1 class</button>
        <button onClick={() => {
          this.setState({
            hasSon1: false
          })
        }}>remove son1 class</button>
      </div>

    )
  }
}

Son.propTypes = {
  mes: proptypes.string
}
Son.defaultProps = {
  mes: 'i am default'
}
export default Son