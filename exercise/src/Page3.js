import { useSearchParams } from 'react-router-dom'

function Page3() {
  let [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams);
  console.log(searchParams.get('id'));
  console.log(searchParams.get('name'));
  return (
    <div>
      Page3
      {/* When click, query will be updated to a=1&b=2 */}
      <button onClick={() => {
        setSearchParams({
          a: 1,
          b: 2
        })
      }}>modify query</button>
    </div>
  )
}

export default Page3