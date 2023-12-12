
import Son from './Son';
import { useState, useEffect, useMemo, useCallback, useRef, useContext, createContext } from 'react'
import React from 'react';

export const Context1 = createContext()

function App() {
  const div1 = useRef()
  useEffect(() => {
    console.log(div1);
    console.log(div1.current);
  }, [])

  return (
    <div>
      App
      <p ref={div1}>App</p>
      <Context1.Provider value={'hello world'}>
        <Son />
      </Context1.Provider>
    </div>
  )
}

export default App