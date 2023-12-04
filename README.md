# React basic knowledge

### Component

1. Introduction: Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML.
2. type

   1. function component
      1. Introduction:directly return html, function name must be capital letter, otherwise the function is a normal function not component.
      2. Grammar:
      ```js
      function FnCom() {
        return <div>Hello world</div>;
      }
      ```
   1. class component

      1. Introduciton:return html in `render` method
      2. Grammer:

      ```js
      class ClassCom extends React.Component {
        render() {
          return <div>class component</div>;
        }
      }
      ```

### Event (using class component)

1. Introduction: It's not the same as the vanilla js, it's writed by `on`+ first capital letter event name, like `onclick` to `onClick`.
2. Grammar:

   ```js
   class App extends React.Component {
     f1(a, b, event) {
       console.log(this); // App component
       console.log(a); // 1
       console.log(b); // 2
       console.log(event); // event
     }
     render() {
       return (
         <div className="App">
           <div onClick={this.f1.bind(this, 1, 2)}>123</div>
         </div>
       );
     }
   }
   ```

3. `this` represent current component.

   ```js
   // method 1: using bind
   class App extends React.Component {
     f1(a, b, event) {
       console.log(this);
       console.log(a); // 1
       console.log(b); // 2
       console.log(event); // event
     }
     render() {
       return (
         <div className="App">
           <div onClick={this.f1.bind(this, 1, 2)}>123</div>
         </div>
       );
     }
   }

   // method 2: function using arrow funciton.
   class App extends React.Component {
     f1 = () => {
       console.log(this);
     };

     render() {
       return (
         <div className="App">
           <div onClick={this.f1}>123</div>
         </div>
       );
     }
   }
   // method 3: using anonymous arrow function
   class App extends React.Component {
     f1(a, b, event) {
       console.log(this); // App component
       console.log(a); // 1
       console.log(b); // 2
       console.log(event); // event
     }

     render() {
       return (
         <div className="App">
           <div
             onClick={() => {
               this.f1(1, 2);
             }}
           >
             123
           </div>
         </div>
       );
     }
   }
   ```

4. event default actions
   1. Introduction: It's the same as the vanilla, for example:
   ```js
   f1(a, b, event) {
      console.log(this); // App component
      console.log(a); // 1
      console.log(b); // 2
      console.log(event); // event
      event.preventDefault() // prevent default actions...
    }
   ```
