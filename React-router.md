# React Router

## Router Router Types

1. react-router: use in server render
2. react-router-dom:use in browser render
3. reat-router-native:use in react-native development

## react-router-dom router types (V6)

1. BrowserRouter: the same as the HTML5 history router
2. HashRouter: the same as the HTML5 hash router

## Use

1. Setting which type router in entry. Below code using `BrowserRouter` router.

   ```js
   import React from "react";
   import ReactDOM from "react-dom/client";
   import "./index.css";
   import App from "./App";

   import { BrowserRouter, HashRouter } from "react-router-dom";

   const root = ReactDOM.createRoot(document.getElementById("root"));
   root.render(
     // history router
     <BrowserRouter>
       <App />
     </BrowserRouter>

     // // HashRouter
     // <HashRouter>
     //   <App />
     // </HashRouter>
   );
   ```

2. To choose which component as the router view. Below code shows that the content of `App` is router view. To define a router view using `Routes`, and each router is used `Route` to define. You can define access `path` and access `Component` or `element` in `Route` tag. And then, visit it with correct path in your browser.

   ```js
   import { Routes, Route } from "react-router-dom";
   import Page1 from "./Page1";
   import Page2 from "./Page2";

   function App() {
     return (
       <div>
         <p>App.js</p>
         <Routes>
           {/* element receive a component tag */}
           <Route path="/page1" element={<Page1 />}></Route>
           {/* Component recevie a component variable */}
           <Route path="/page2" Component={Page2}></Route>
         </Routes>
       </div>
     );
   }

   export default App;
   ```

3. Using `NavLink` or `Link` to go which route. `NavLink` will add a class named `active` on the active link but `Link` will not.

   ```js
   // App.js
   // ...
   <div>
     <NavLink to="/page1">page1</NavLink>
     <NavLink to="/page2">page2</NavLink>
   </div>
   // below is Routes code
   // ...
   ```

## nest route and dynamic route

1. Nest route. Using `Route` to define, and using `Outlet` to defined which palce to show the route view.

   ```js
   // App.js
   // ...
   <Route path="/page1" element={<Page1 />}>
     <Route path="son1" Component={Page1Son1}></Route>
     <Route path="son2" Component={Page1Son2}></Route>
   </Route>;
   // ...

   // Page1.js
   import { Outlet } from "react-router-dom";

   function Page1() {
     return (
       <div>
         Page1
         {/* Outlet to show the child component view */}
         <Outlet />
       </div>
     );
   }

   export default Page1;
   ```

2. Dynamic route. Defined a variable in path, and then to access the path. Below code show that if you want to access page2, you need to access `/page2/123` or `path/xxx` and so on.
   ```js
   // ...
   <Route path="/page2/:id" Component={Page2}></Route>
   // ...
   ```

## How to get route params(params, query, location)

|     | Params                  | Query                      | Location                  |
| --- | ----------------------- | -------------------------- | ------------------------- |
| V6  | useParams               | useSearchParams            | useLocation               |
| V5  | this.props.match.params | this.props.location.search | this.props.location.state |

1. Get params. Using `useParams`. Access `/page2/123` and get params.

   ```js
   // Page2.js
   import { useParams } from "react-router-dom";
   function Page2() {
     let params = useParams();
     console.log(params); // {id:123}
     return <p>Page2</p>;
   }

   export default Page2;
   ```

2. Get querys. Using `useSearchParams`. Access `/page3?id=123&name=tom` and get query. Call `useSearchParams` will return a array which length is 2. Index 0 is `searchParams` object, index 1 is a function which can update `searchParams` object. Access the value of query need to call `get` function on the `searchParams` object.

   ```js
   // App.js
   // ...
   <Route path="/page3" Component={Page3}></Route>;
   // ...

   // Page3.js
   import { useSearchParams } from "react-router-dom";

   function Page3() {
     let [searchParams, setSearchParams] = useSearchParams();
     console.log(searchParams);
     console.log(searchParams.get("id")); // 123
     console.log(searchParams.get("name")); // tom
     return (
       <div>
         Page3
         {/* When click, query will be updated to a=1&b=2 */}
         <button
           onClick={() => {
             setSearchParams({
               a: 1,
               b: 2,
             });
           }}
         >
           modify query
         </button>
       </div>
     );
   }

   export default Page3;
   ```

3. Get location. Using `useLocation` to get location.

   ```js
   // Page1.js
   import { Outlet, useLocation } from "react-router-dom";

   function Page1() {
     let locationValue = useLocation();
     console.log(locationValue); // {pathname: '/page1', search: '', hash: '', state: null, key: 'hhz5lur1'}
     return (
       <div>
         Page1
         {/* Outlet to show the child component view */}
         <Outlet />
       </div>
     );
   }

   export default Page1;
   ```

## js navigate to other route

|     | navigate                |
| --- | ----------------------- |
| V6  | useNavigate             |
| V5  | this.props.history.push |

1. Use `useNavigate`

   ```js
   // Page4.js
   import { useNavigate } from "react-router-dom";

   function Page4() {
     let nav = useNavigate();
     return (
       <div>
         Page4
         <button
           onClick={() => {
             nav("/page1");
           }}
         >
           to page1
         </button>
       </div>
     );
   }

   export default Page4;
   ```

2. Using `useNavigate` to pass some value and not display in url.
   ```js
   // Page4.js
   // ...
   <button
     onClick={() => {
       nav("/page1", {
         state: {
           a: 1,
           b: 2,
         },
       });
     }}
   >
     to page1
   </button>;
   // ...
   // Page1.js
   import { Outlet, useLocation } from "react-router-dom";
   // ...
   let locationValue = useLocation();
   console.log(locationValue); // {pathname: '/page1', search: '', hash: '', state: {…}, key: '7exd955w'}
   console.log(locationValue.state); // {a: 1, b: 2}
   ```

## auth control tips

1. if someone don't have the right to access page, how to do?

   1. to navigate other page
      ```js
      <Route
        path="/page3"
        Component={isPermitted ? Page3 : noPermitted}
      ></Route>
      ```
   2. no the route

      ```js
      {
        isPermitted ? <Route path="/page3" Component={Page3}></Route> : "";
      }
      ```

## asynchronous routing

1. Sometimes, we wish that the content of a page starts loading only when we access the page. This could help reduce the size of the entry package
2. Using `lazy` function and `Suspense` component in `react`. Call `lazy` to modify a component and return a lazy component. `Suspense` to wrap `Routes` and `Route`. `fallback` property rececive a component and show the content of the component when lazy component is not imported.

   ```js
   // App.js
   import { lazy, Suspense } from "react";
   const lazyPage4 = lazy(() => import("./Page4"));

   // ...
   <Suspense fallback={<h2>loadding</h2>}>
     <Routes>
       // ...
       <Route path="/page4" Component={lazyPage4}></Route>
     </Routes>
   </Suspense>;
   // ...
   ```
