## Event (using class component)

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
