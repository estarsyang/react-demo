import React from "react"
export default function TestHoc(WrappedComponent) {
  return class extends React.Component {

    render() {
      return < WrappedComponent additionalProps={"hello from hoc"} {...this.props} />
    }
  }
}
