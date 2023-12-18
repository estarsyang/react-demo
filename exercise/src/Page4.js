import { useNavigate } from 'react-router-dom'

function Page4() {
  let nav = useNavigate()
  return (
    <div>
      Page4
      <button onClick={() => {
        nav('/page1', {
          state: {
            a: 1,
            b: 2
          }
        })
      }}>to page1</button>
    </div>
  )
}

export default Page4