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

### State (using class component)

1. Introduction: a built-in React object that is used to contain data or information about the component. It's asynchronous.
2. Grammar: directly defint a `state` in class.

   ```js
   class App extends React.Component {
     state = {
       a: 0,
     };

     render() {
       return <div className="App">{this.state.a}</div>;
     }
   }
   ```

3. How to update the state value? Using `setState`

   1. Grammar:

      ```js
        addA = () => {
          this.setState({
            a: 888
          })
        }

        render() {
          return (
            <div className="App">
              {this.state.a}
              <button onClick={this.addA}>update state.a</button>
            </div>
          );
        }
      ```

   2. `setState` is used to update views, u can also update state value and then call `setState` without any value. But it's not recommand.

      ```js
      addA = () => {
        this.state.a = 123;
        this.setState({});
      };
      ```

   3. update a property in a object in state. need to input all properties of original object. The easy ways to get all properties is destructuring Assignment.

      ```js
      state = {
        a: 0,
        b: {
          c: 2,
          d: 3,
        },
      };

      addA = () => {
        this.setState({
          b: {
            ...this.state.b, // Destructuring Assignment
            d: 4,
          },
        });
      };
      ```

   4. Get updated value after update, using `setState` second argument.

      ```js
      addA = () => {
        this.setState(
          {
            b: {
              ...this.state.b,
              d: 4,
            },
          },
          // second argument
          () => {
            console.log(this.state.b.d);
          }
        );
      };
      ```

4. Notes:

   1. Multiple `setState` function are called in a function will only render once.

      ```js
      addA = () => {
        this.setState({
          a: 1,
        });
        this.setState({
          a: 2,
        });
        this.setState({
          a: 3,
        });
        // call 3 times but render 1
      };
      render() {
        console.log('222'); // print 222 only once
        return (
          <div className="App">
            {this.state.a}
            <button onClick={this.addA}>update state.a</button>
          </div>
        );
      }
      ```

   2. Each time call `setState` function will render each time eventhough update the same value.

      ```js
        addA = () => {
          this.setState({
            a: 1 // each time update a to 1
          })
        }

        render() {
          console.log('222'); // each time call addA, print each time
          return (
            <div className="App">
              {this.state.a}
              <button onClick={this.addA}>update state.a</button>
            </div>
          );
        }
      ```

   3. `PureComponent`

      1. Introduction: Optimize `Component`.
      2. For **Each time call `setState` function will render each time eventhough update the same value.**, Using `PureComponent` could be prevent this case. Only `render` once if update the same value.

         ```js
         // using PureComponent
         class App extends React.PureComponent {
           state = {
             a: 0,
           };
           addA = () => {
             this.setState({
               a: 1,
             });
           };

           render() {
             console.log("222");
             return (
               <div className="App">
                 {this.state.a}
                 <button onClick={this.addA}>update state.a</button>
               </div>
             );
           }
         }
         ```

      3. Update Object need to create an new Object and copy original Objecgt. Then update target properties.

         ```js
         // using PureComponent
         class App extends React.PureComponent {
           state = {
             arr: [1, 2, 3],
           };
           addArr = () => {
             this.state.arr.push(4);
             this.setState({
               arr: [...this.state.arr],
             });
           };

           render() {
             return (
               <div className="App">
                 {this.state.arr}
                 <button onClick={this.addArr}>update state.a</button>
               </div>
             );
           }
         }
         ```

   4. Don't use `setState` in `render` function.

### Contional render

1. Introduction: We want to show content base on a boolean value.
2. Examples:

   ```js
    // example 1
    state = {
      show: false
    }
    render() {
      return (
        <div className="App">
          {this.state.show && <div>content</div>} // using && to do
          <button onClick={() => {
            this.setState({
              show: !this.state.show
            })
          }}>{this.state.show ? 'hidden' : 'show'}</button>
        </div>
      );
    }

    // example 2
      state = {
        show: false
      }
      render() {
        return (
          <div className="App">
            {this.state.show ? (<div>a</div>) : (<div>b</div>)} // using ternary arithmetic to decide which one display
            <button onClick={() => {
              this.setState({
                show: !this.state.show
              })
            }}>{this.state.show ? 'hidden' : 'show'}</button>
          </div>
        );
      }
   ```

### List render

1. How: Convert arr to react element arr. Using array `map` function will be easy to do.
2. Examples:

   ```js
    state = {
      arr: [1, 2, 3]
    }
    render() {
      return (
        <div className="App">
          {/* list render */}
          {
            this.state.arr.map((item) => {
              return <div key={item}>{item}</div>
            })
          }
        </div>
      );
    }
   ```

### Form bind

1. Controlled component: value managed by state, update state value could update component
2. Uncontrolled component: value managed by itself, only could get its value but can't set its value.
3. Examples:

   ```js
    // input and checkbox
    state = {
      inputVal: '',
      checkedArr: ['c1', 'c2']
    }

    handleChecked = (e) => {
      console.log(e.target.value);
      const value = e.target.value
      let arr = [...this.state.checkedArr]
      if (e.target.checked) {
        arr.push(value)
      } else {
        arr.splice(arr.indexOf(value), 1)
      }
      this.setState({
        checkedArr: arr
      })
    }
    render() {
      return (
        <div className="App">
          {this.state.inputVal}
          <input value={this.state.inputVal} onChange={(e) => {
            console.log(e.target.value);
            this.setState({
              inputVal: e.target.value
            })
          }} />

          {this.state.checkedArr}
          <input
            type='checkbox'
            name='choose'
            value='c1'
            checked={this.state.checkedArr.includes('c1')}
            onChange={this.handleChecked}
          />c1
          <input
            type='checkbox'
            name='choose'
            value='c2'
            checked={this.state.checkedArr.includes('c2')}
            onChange={this.handleChecked}
          />c2
          <input
            type='checkbox'
            name='choose'
            value='c3'
            checked={this.state.checkedArr.includes('c3')}
            onChange={this.handleChecked}
          />c3
        </div>
      );
    }
   ```

### Props

1. Introduction: Parent component transfer anything to child component could be props. Including attributes and subNodes.
2. Grammar:

   ```js
    // son.js
    class Son extends React.PureComponent {
      render() {
        console.log(this.props); //  could print directly. Since props bind to this. {a:123, b:456, children:[xxx]}
        return <div>i am son of App</div>;
      }
    }

    export default Son;
    // App.js
    import Son from './Son';

    class App extends React.PureComponent {


      render() {
        return (
          <div>
            i am App
            <Son a='123' b='456'>
              <div>hello world</div>
            </Son>
          </div>)

      }
    }
    export default App;
   ```

3. Props type checked, usign `PropTypes` attribute to define.
   ```js
   // Son.js
   Son.propTypes = {
     mes: function (props) {
       if (typeof props.mes !== "string") {
         throw new Error("mes must be a stirng");
       }
     },
   };
   ```
4. `proptypes` library, to verify props in react

   1. install: npm i propytypes --save
   2. using

      ```js
      // Son.js
      import proptypes from "proptypes";

      Son.propTypes = {
        mes: proptypes.string, // ok
      };
      ```

5. Props default value, using `defaultProps` attribut to define
   ```js
   // Son.js
   Son.defaultProps = {
     mes: "i am default",
   };
   ```
6. Slot, transfer a compoent to son component. Using `children` property of `props`

   1. Basic slot

      ```js
        // App.js
        render() {
          return (
            <div>
              i am App
              <Son>
                <div >hello world</div>
              </Son>
            </div>)

        }

        // Son.js
        render() {
          console.log(this.props);
          return (
            <div>
              i am son of App
              <div>{this.props.mes}</div>
              <div>{this.props.children}</div>
            </div>
          )
        }
      ```

   2. Name slot, define a attribute name in `Son` component and pass a compoent into the attribute value.

      ```js
      // Son.js
      render() {
        console.log(this.props);
        return (
          <div>
            {this.props.nameslot}
            i am son of App
            <div>{this.props.mes}</div>
            <div>{this.props.children}</div>
          </div>
        )
      }
      // App.js
        render() {
          return (
            <div>
              i am App
              <!-- defint a nameslot attribute and pass a component -->
              <Son nameslot={<div>name slot</div>}>
                <div >hello world</div>
              </Son>
            </div>)

        }
      ```

   3. Scope slot, define a attribute and set value is a function. The function reveice arguments to handle. And `Son` component call this function and pass state of `Son` into the funciton.

      ```js
      // App.js
      render() {
        return (
          <div>
            i am App
            <Son nameslot={<div>name slot</div>} scopeslot={(scope) => <div>scope{scope}</div>}>
              <div >hello world</div>
            </Son>
          </div>)

      }
      // Son.js
      state = {
        sonMes: 'hello'
      }
      render() {
        console.log(this.props);
        return (
          <div>
            {this.props.nameslot}
            i am son of App
            <div>{this.props.mes}</div>
            <div>{this.props.children}</div>
            <!-- call function what App pass into. And pass state value into this function. -->
            {this.props.scopeslot(this.state.sonMes)}
          </div>
        )
      }
      ```

7. Passing data within Parent component and Son component.

   1. Parent pass data to Son. define a attribute in Son, and set this attribute's value what data parent want to pass.
   2. Son pass data to Parent. Parent pass a function to Son, and then Son call this function and pass Son's data into this function.

   ```js
    // App.js
    state = {
      mes: 'hello son'
    }

    changeMes(sonMes) {
      this.setState({
        mes: sonMes
      })
    }
    render() {
      return (
        <div>
          i am App
          <!-- changeMes is passed to Son. Be careful, need to use bind to set this -->
          <Son mes={this.state.mes} changeMes={this.changeMes.bind(this)}>
          </Son>
        </div>)

    }
   // Son.js
   state = {
    sonMes: 'hello father'
   }
   render() {
    console.log(this.props);
    return (
      <div>
        i am son of App
        <div>{this.props.mes}</div>
        <!-- call changeMes and pass data what Son want to pass -->
        <button onClick={() => {
          this.props.changeMes(this.state.sonMes)
        }}>passing data to parent</button>
      </div>
    )
   }
   ```
