# state control

## types

1. redux
2. mobx
3. ...

## redux

1. Introduction: redux is a library which use to state control. In `react`, people often use `react-redux` and `redux` together to do state control.
2. install
   ```js
   npm i redux react-redux
   ```
3. define a store.

   ```js
   // store/index.js
   import { legacy_createStore } from "redux";

   function msgReducer(state = { mes: "hello" }, action) {
     switch (action.type) {
       case "changeMes":
         state.mes = action.playload;
         return { ...state }; // destructuring, generate a new memory address.
       default:
         return state;
     }
   }

   const store = legacy_createStore(msgReducer);
   export default store;
   ```

4. injecting store

   ```js
   // index.js
   import { Provider } from "react-redux";
   import store from "./store";

   // ...
   {
     /* pass store into App */
   }
   <Provider store={store}>
     <App />
   </Provider>;

   // App.js that component which use store

   import { connect } from "react-redux";

   function App(props) {
     console.log(props); // {mes:'hello', dispatch: function(){...}}
     return (
       <div>
         <p>App.js</p>
         {props.mes}
         <button
           onClick={() => {
             props.dispatch({
               type: "changeMes",
               playload: "test",
             });
           }}
         >
           update store mes
         </button>
       </div>
     );
   }
   let connectApp = connect((state) => {
     return { ...state }; // state into props,need to destructuring
   })(App);
   export default connectApp;
   ```
