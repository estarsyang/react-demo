function Son(props) {
  console.log('child componet update');

  return (
    <div>{props.additionalProps}</div>
  )
}
export default Son