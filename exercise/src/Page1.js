import { Outlet, useLocation } from 'react-router-dom'

function Page1() {
  let locationValue = useLocation()
  console.log(locationValue);
  console.log(locationValue.state);
  return (
    <div>
      Page1
      {/* Outlet to show the child component view */}
      <Outlet />
    </div>
  )
}

export default Page1