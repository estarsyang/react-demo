import React from "react";
import proptypes from 'proptypes'
class Son extends React.PureComponent {

  state = {
    sonMes: 'hello father'
  }
  render() {
    console.log(this.props);
    return (
      <div>
        i am son of App
        <div>{this.props.mes}</div>
        <button onClick={() => {
          this.props.changeMes(this.state.sonMes)
        }}>passing data to parent</button>
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