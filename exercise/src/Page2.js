import { useParams, } from 'react-router-dom'
function Page2() {
  let params = useParams()
  console.log(params);


  return (
    <div>
      Page2

    </div>
  )
}

export default Page2