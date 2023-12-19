# React basic knowledge

React knoledge are seperated into those parts, the detail of parts are show in markdown files.

## Component

    -  class and style

    -  lifecycle

    -  Ref and context (using class component)

    -  Function components and Hook

    -  HOC (higher order component)

    -  Performance optimizez

## Event (using class component)

## State (using class component)

## Props

# React-admin-system

1. init

   1. vite init

      ```js
      npm init vite
      // input project name react-admin-system
      // choose react
      // choose typescript

      ```

   2. Delete no need files
      1. index.css
      2. App.css
      3. logo files
   3. modify App.tsx.

      ```js
      // remove content only write a App
      function App() {
        return <>App</>;
      }

      export default App;
      ```

   4. install libraries.

      ```js
      npm i react-redux react-router-dom redux reset-css --save

      npm i sass --save-dev
      ```

   5. path alias. setting `@` to present `src`. if it has a error named `annot find module 'path' or its corresponding type declarations.ts(2307)`, install `@types/node`. the error will be fixed.

      ```js
      npm i -D @types/node
      ```

      ```js
      // vite.config.ts
      // ...
      import path from "path";
      export default defineConfig({
        plugins: [react()],
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "src"),
          },
        },
      });
      ```

      When finish config `@` alias, writing `@/` represent `src/`. But it won't automatically display the 'src' files. We need config `@/` tips. Go to `tsconfig.json` and below config. When u add these configs, u can see that `@/` will show files in you VScode.

      ```js
      {
         "compilerOptions": {
            // ...
            "baseUrl": "./",
            "paths": {
               "@/*":[
               "src/*"
               ]
            },
            // ...
         },
      }
      ```

2. install UI library `antd` . Since `antd` supports ES modules tree shaking by default. So just install and use is ok.

   ```js
   npm install antd --save
   ```

3. instal react-router

   1. install
      ```js
      npm install react-router-dom --save
      ```
   2. Views
      1. Home
      2. About
   3. config

      1. config file

         ```js
         import Home from "@/views/Home";
         import About from "@/views/About";

         import { Navigate } from "react-router-dom";

         const routes = [
           { path: "/", element: <Navigate to="/home" /> },
           { path: "/home", element: <Home /> },
           { path: "/about", element: <About /> },
         ];

         export default routes;
         ```

      2. inject App
         ```js
         import { BrowserRouter } from "react-router-dom";
         // ...
         <BrowserRouter>
           <App />
         </BrowserRouter>;
         ```
      3. App.tsx. Uses hook to render routes.

         ```js
         import routes from "@/router";
         import { useRoutes } from "react-router-dom";

         function App() {
           const outlet = useRoutes(routes);
           return <>{outlet}</>;
         }

         export default App;
         ```

   4. lazy route

      ```js
      import { lazy, Suspense } from "react";
      // ...

      const About = lazy(() => import("@/views/About"));

      // ...

      {
         path: "/about",
         element: (
            <Suspense fallback={<div>loading</div>}>
            <About />
            </Suspense>
         ),
      },
      // ...
      ```

   5. optimize lazy component.
      ```js
      // ...
      const withLoadingComponent = (comp) => (
        <Suspense fallback={<div>loading...</div>}>{comp}</Suspense>
      );
      // ...
      {
         path: "/about",
         element: withLoadingComponent(About),
      },
      // ...
      ```
