

import { Routes, Route, NavLink } from 'react-router-dom'
import Page1 from "./Page1"
import Page2 from "./Page2"
import Page3 from "./Page3"
// import Page4 from "./Page4"
import Page1Son1 from './Page1Son1'
import Page1Son2 from './Page1Son2'

import { lazy, Suspense } from 'react'

const lazyPage4 = lazy(() => import('./Page4'))

function App() {

  return (
    <div>
      <p>App.js</p>
      <div>
        <NavLink to='/page1'>page1</NavLink>
        <NavLink to='/page2'>page2</NavLink>
        <NavLink to='/page3'>page3</NavLink>
        <NavLink to='/page4'>page4</NavLink>
      </div>
      <Suspense fallback={<h2>loadding</h2>}>
        <Routes>
          {/* element receive a component tag */}
          <Route path='/page1' element={<Page1 />} >
            <Route path='son1' Component={Page1Son1}></Route>
            <Route path='son2' Component={Page1Son2}></Route>
          </Route>
          {/* Component recevie a component variable */}
          <Route path='/page2/:id' Component={Page2} ></Route>
          <Route path='/page3' Component={Page3} ></Route>
          <Route path='/page4' Component={lazyPage4} ></Route>

        </Routes>
      </Suspense>
    </div>
  )
}

export default App