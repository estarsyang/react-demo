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
   ```

5. Use store and update store.

   1. mapStateToProps. As the first argument passed in to connect, mapStateToProps is used for selecting the part of the data from the store that the connected component needs.

      ```js
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
      // u can directly defined a arrow function
      let connectApp = connect((state) => {
        return { ...state }; // state into props,need to destructuring
      })(App);
      export default connectApp;

      // or defined a function named mapStateToProps
      // function mapStateToProps(state, ownProps?)
      function mapStateToProps(state) {
        return { ...state };
      }

      export default connect(mapStateToProps)(App)
      ```

   2. mapDispatchToProps. As the second argument passed in to connect, mapDispatchToProps is used for dispatching actions to the store.
      ```js
      // App.js
      // ...
      function mapDispatchToProps(dispatch) {
        return {
          changeMes() {
            dispatch({
              type: "changeMes",
              playload: "test",
            });
          },
        };
      }
      export default connect(mapStateToProps, mapDispatchToProps)(App);
      ```

6. modules. defined a new function, using `combineReducers` to add a module.

   ```js
   // store/index.js
   import { legacy_createStore, combineReducers } from "redux";
   // ...
   function numReducer(state = { num: 0 }, action) {
     switch (action.type) {
       case "changeMes":
         state.num++;
         return { ...state };
       default:
         return state;
     }
   }

   const reducer = combineReducers({
     msgReducer,
     numReducer,
   });
   const store = legacy_createStore(reducer);
   // ...

   // App.js
   // ...
   function mapStateToProps(state) {
     return { ...state.msgReducer }; // get module which you want
   }
   // ...
   ```

## redux toolkit

1. Introduction: The Redux Toolkit package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:
   - "Configuring a Redux store is too complicated"
   - "I have to add a lot of packages to get Redux to do anything useful"
   - "Redux requires too much boilerplate code"
2. install
   ```js
   npm install @reduxjs/toolkit
   ```
3. defined a store. `createSlice` creates a slice what equal to a module. A slice contains `name`, `initialState` and `reducers`. `reducers` includes many functions to update `initialState`. `configureStore` creates a store.

   ```js
   // store/toolkitIndex.js
   import { createSlice, configureStore } from "@reduxjs/toolkit";

   const msgSlice = createSlice({
     name: "msgSlice",
     initialState: {
       mes: "hello",
     },
     reducers: {
       changeMes(state, action) {
         state.mes = action.playload;
       },
     },
   });

   const numSlice = createSlice({
     name: "numSlice",
     initialState: {
       num: 0,
     },
     reducers: {
       changeNum(state) {
         state.num += 1;
       },
     },
   });
   // register reducer. sliceName.reducer
   const store = configureStore({
     reducer: {
       msgReducer: msgSlice.reducer,
       numReducer: numSlice.reducer,
     },
   });

   export default store;
   ```

4. injecting store to react. the same as redux.

   ```js
   // ...
   import store from "./store/toolkitIndex";

   // ...
   <Provider store={store}>
     <App />
   </Provider>;
   // ...
   ```

5. Using in components. nothing to change. could be directly used.

   ```js
   // ...
   ```

6. Others. if you think writing `dispatch` config is boring and complicated, you can export function in slice.

   ```js
   // store/toolkitIndex.js
   // ...
   export const { changeMes } = msgSlice.actions;
   // ...

   // App.js
   import { changeMes } from "./store/toolkitIndex";
   // ...
   function mapDispatchToProps(dispatch) {
     return {
       changeMes() {
         // dispatch({
         //   type: 'msgSlice/changeMes',
         //   playload: 'test'
         // })
         dispatch(changeMes("test"));
       },
     };
   }
   // ...
   ```

## redux hooks

1. Although using `redux toolkit` could be easy to use, you can use `hook` in redux.
2. `hook`, `useSelector` and `useDispatch`.

   ```js
   // App.js
   import { useSelector, useDispatch } from "react-redux";
   import { changeNum } from "./store/toolkitIndex";
   function App2() {
     const num = useSelector((state) => {
       return state.numReducer.num;
     });
     const dispatch = useDispatch();
     return (
       <div>
         {num}
         <button
           onClick={() => {
             dispatch(changeNum());
           }}
         >
           num + 1
         </button>
       </div>
     );
   }

   export default App2;
   ```

## redux async request

1. Introduction: redux has its special function to handle async request. By using `createAsyncThunk`.

2. Define an async function.

   ```js
   // createAsyncThunk, first argument is a type which you give. second argu is a callback
   export const getNumThunk = createAsyncThunk("num/getNum", async (params) => {
     console.log("params", params);
     let res = await new Promise((resolve) => {
       setTimeout(() => {
         resolve(999);
       });
     });

     return res;
   });
   ```

3. add a `extraReducers`.
   ```js
   const numSlice = createSlice({
     // ...
     extraReducers: (builder) => {
       // listen to the pending event of getNumThunk
       builder.addCase(getNumThunk.pending, (state) => {
         // ...
       });
       // listen to the fulfilled event of getNumThunk
       builder.addCase(getNumThunk.fulfilled, (state, { payload }) => {
         state.num = payload;
       });
       // ...
     },
   });
   ```
4. In component. import `getNumThunk` and call

   ```js
   // App2.js
   // ...
   import { changeNum, getNumThunk } from "./store/toolkitIndex";

   // ...
   <button
     onClick={() => {
       dispatch(getNumThunk());
     }}
   >
     get Num
   </button>;
   // ...
   ```
