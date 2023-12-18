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

### class and style

1.  How to use class and style:

    1. class need to rename, for example, `class="box"` need to rename to `className="box"`.
    2. `CSS` is stored in a single css file, and import into `js` file.

       ```css
       // Son.css
       .son {
         color: pink;
       }
       ```

       ```js
       // Son.js

       import "./Son.css";
       ```

    3. inline-style is not used, `react` is using object to represent inline-style.
       ```jsx
       // inline-style
       <div
         style={{
           color: "red",
           fontSize: "20px",
         }}
       ></div>
       ```

2.  Have some problems

    1.  css scope? Import directly a css file will lead the scope of the css file diffusion to global. But using `module.css` can limit the scope of css. Rename `Son.css` to `Son.module.css`, and import into `Son.js`.

              ```css
              // Son.module.css
              .son {
                color: pink;
              }
              .son1 {
                background: red;
              }
              ```

              ```js
              // Son.js
              import sonStyle from "./Son.module.css";
              console.log(sonStyle); // {son:"Son_son__dD7iL"}

              class Son extends React.PureComponent {
                state = {
                  sonMes: "hello father",
                };
                render() {
                  console.log(this.props);
                  return (
                    <div>
                      i am son of App
                      <div className={sonStyle.son}>123</div>
                      {/* how to render multiple class, using "+"" */}
                      <div className={sonStyle.son + " " + sonStyle.son1}>123</div>
                    </div>
                  );
                }
              }
              ```

    2.  how to easily add class or remove class? Using `classnames` to add or remove. Using `classnames` to bind style object, and defint a boolean value to decide whether class is add or remove.

        ```js
        // Son.js
        import classnames from "classnames/bind";
        import sonStyle from "./Son.module.css";
        console.log(sonStyle); // {son: 'Son_son__dD7iL', son1: 'Son_son1__2RSmA'}

        const bindClassnames = classnames.bind(sonStyle);

        class Son extends React.PureComponent {
          state = {
            hasSon1: true, // to add or remove son1 class
          };

          render() {
            return (
              <div>
                <div
                  {/* call new method to bind class. */}
                  className={bindClassnames({
                    son: true,
                    son1: this.state.hasSon1,
                  })}
                >
                  1111
                </div>
                <button
                  onClick={() => {
                    this.setState({
                      hasSon1: true,
                    });
                  }}
                >
                  add son1 class
                </button>
                <button
                  onClick={() => {
                    this.setState({
                      hasSon1: false,
                    });
                  }}
                >
                  remove son1 class
                </button>
              </div>
            );
          }
        }
        ```

### lifecycle

![react lifecycle](./images/lifecycle.jpg)

1. types

   1. constructor
   2. shouldComponentUpdate: (conflict with `PureComponent`, since `PureComponent` is accomplished by `shouldComponentUpdate`) to do performance optimize.
   3. render: decide what to render.
   4. componentDidMount: component is mounted, and do initital operations, for example, ajax request, chart render and so on.
   5. componentDidUpdate: update finish
   6. componentDidUnmount: component will be unmounted, to remove event listener, clear timer and so on.
   7. ...
      p09

### Ref and context (using class component)

1. ref

   1. Introduction: React provide a ways to access a DOM node or React elements. this is ref.
   2. How to use? Using `React.createRef` to defined a ref, and then assign the ref to the element what you want to access.
   3. `React.createRef` can't using in function component.

   ```js
   const div1 = React.createRef();
   const sonCom = React.createRef();

   class App extends React.PureComponent {
     componentDidMount() {
       console.log(div1); // {current: div}
       console.log(div1.current); // <div>...</div> , a true dom node.

       console.log(sonCom); // {current: Son}
       console.log(sonCom.current); // Son {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
       // a true React element. could access Son component everything.
       // for example, a method named f1 in Son component, call sonCom.current.f1()
     }
     render() {
       return (
         <div ref={div1}>
           <Son />
         </div>
       );
     }
   }
   ```

2. context

   1. Introduction: A way for a React app to effectively produce global variables that can be passed around. Passing data through multiple components. Using `React.createContext()` to define a `context`. An instance of `context` has `Provider` and `Consumer` property. `Provider` give data, `Consumer` receive data.
   2. Example

      ```js
      // Father
      import Son from "./Son";
      // define a variables to receive a instance of context
      // first letter need to upperCase
      export const Context1 = React.createContext();

      class Father extends React.PureComponent {
        state = {
          mes: "hello son",
        };

        render() {
          return (
            <div>
              Father
              {/* give value to Context1. value could be single value. Multiple value need to using object.  */}
              <Context1.Provider value={{ mes: this.state.mes, name: "tom" }}>
                <Son />
              </Context1.Provider>
            </div>
          );
        }
      }
      export default Father;

      // Son.js
      import GrandSon from "./GrandSon";

      class Son extends React.PureComponent {

        render() {

          return (
            <div>
              son
              <GrandSon></GrandSon>
            </div>

          )
        }
      }

      export default Son
      // GrandSon.js
      // import the instance
      import { Context1 } from './App'

      class GrandSon extends React.PureComponent {
        render() {
          return (
            <div>
              this is  grandSon
              {/* receive value by using a callback function. */}
              <Context1.Consumer>
                {
                  (value) => {
                    console.log(value);
                    return (
                      <>
                        <div>{value.mes}</div>
                        <div>{value.name}</div>
                      </>
                    )
                  }
                }
              </Context1.Consumer>
            </div>
          )
        }
      }
      export default GrandSon
      ```

   3. Notes:
      1. `Context` could be nest but not recommand.

### Function components and Hook

1. different with Class component

   1. No lifecycle.
   2. No `this` keyword.
   3. Using `hook` to do operations.
   4. Function component could be equivalent to `render` in class component.
   5. Props is the first argument in function component.

2. define and update `state`

   1. How? Using `useState` to define a state. Call `useState` will return a array,length is 2. Index 0 is initial value, index 1 is a function to update initial value.

      ```js
      import Son from "./Son";
      import { useState } from "react";

      function App() {
        // set variable msg initial value is hello
        const [msg, setMsg] = useState("hello");

        function changeMsg() {
          setMsg("test"); // hello to test
        }
        return (
          <div>
            App
            <p>msg value is {msg}</p>
            <button onClick={changeMsg}>update msg</button>
            <Son />
          </div>
        );
      }

      export default App;
      ```

3. Props

   1. How? Props as the first argument of son component by using function.

      ```js
      // App.js
      import Son from "./Son";

      function App() {
        return (
          <div>
            App
            <Son msg={"hello"} />
          </div>
        );
      }

      export default App;
      // Son.js
      // first arguments is props
      function Son(props) {
        return <div>
          Son
          {/* msg is hello */}
          <p>p is {props.msg}</p>
        </div>
      }

      export default Son
      ```

4. `useEffect` function

   1. Introduction: `useEffect` function receives two arguments, first is callback function, the second arguments is showing below.

      1. No second argument is equal to `componentDidMount` and `componentDidUpdate`

         ```js
         import Son from "./Son";
         import { useState, useEffect } from "react";

         function App() {
           const [msg, setMsg] = useState("hello");
           // first time render will print 'useEffect' ===>>> componentDidMount
           // update msg will print second 'useEffect' ===>>> componentDidUpdate
           useEffect(() => {
             console.log("useEffect");
           });

           function changeMsg() {
             setMsg("test");
           }
           return (
             <div>
               App
               <p>msg value is {msg}</p>
               <button onClick={changeMsg}>update msg</button>
               <Son />
             </div>
           );
         }

         export default App;
         ```

      2. The second argument is a empty array is equal to `componentDidMount`

         ```js
         // ...
         // first time render will print 'useEffect' ===>>> componentDidMount
         // update msg will not print 'useEffect'
         useEffect(() => {
           console.log("useEffect");
         }, []);

         // ...
         ```

      3. The second argument is a array and the array stores data is watching data. Just like `watch` in `Vue.js`

         ```js
         // ...
         // first time render will print 'useEffect' ===>>> componentDidMount
         // update msg will print print 'useEffect', since watch msg
         useEffect(() => {
           console.log("useEffect");
         }, [msg]);

         // ...
         ```

5. `useMemo` function

   1. Introduction: a React Hook that lets you cache the result of a calculation between re-renders.
   2. Notes:

      1. Cache result and not run again within render. Below show a result, each time updating data the calculation of `all` will be called.

         ```js
         import { useState, useEffect } from "react";

         function App() {
           const [msg, setMsg] = useState("hello");
           const [arr, setArr] = useState([1, 2, 3]);

           // each time updating data, the calculation will be executed.
           let all = 0;
           arr.forEach((item) => {
             all += item;
           });

           console.log(all);

           useEffect(() => {
             console.log("useEffect");
           }, [msg]);

           function changeMsg() {
             setMsg("test");
           }
           return (
             <div>
               App
               <p>msg value is {msg}</p>
               <button onClick={changeMsg}>update msg</button>
             </div>
           );
         }

         export default App;
         ```

         but using `useMemo` will be not. `useMemo` receives two arguments, first is callback function. Second is an array which store data what is watching. Below shows the code. First time render will print 'useMemo', but update other value will not print 'useMemo' again. If you update `arr`, it will be calculated again.

         ```js
         import { useState, useEffect, useMemo } from "react";
         // ...
         let all = useMemo(() => {
           console.log("useMemo");
           let _all = 0;
           arr.forEach((item) => {
             _all += item;
           });
           return _all;
         }, [arr]); // sconde argument is an arr which stores arr, when you update arr, the callback function will be called again.

         console.log(all);
         // ...
         function updateArr() {
           let _arr = [...arr];
           _arr.push(2);
           setArr(_arr);
         }
         // ...
         <p>arr: {arr}</p>
         <p>all: {all}</p>
         <button onClick={updateArr}>update arr</button>
         ```

6. `useCallback`

   1. Introduction: `useMemo` hook is to cache the result, `useCallback` is to cache a function between re-renders. It's the same as `useMemo`. It also havs two arguments, one is callback function, other one is an array. The array also store data what is watching.

      ```js
      import { useState, useEffect, useMemo, use } from "react";
      // ...
      const updateArr = useCallback(() => {
        let _arr = [...arr];
        _arr.push(2);
        setArr(_arr);
      }, [arr]);
      // ...
      ```

7. `useRef`

   1. Introduction: using `ref` in function.

      ```js
      import { useEffect, useRef } from "react";

      function App() {
        const div1 = useRef();
        useEffect(() => {
          console.log(div1); // {current:p}
          console.log(div1.current); // <p>App</p>
        }, []);

        return (
          <div>
            App
            <p ref={div1}>App</p>
          </div>
        );
      }

      export default App;
      ```

8. `useContext`

   1. Introduction: easy to use context.

      ```js
      // App.js
      import Son from "./Son";
      import { createContext } from "react";

      export const Context1 = createContext();

      function App() {
        return (
          <div>
            App
            <Context1.Provider value={"hello world"}>
              <Son />
            </Context1.Provider>
          </div>
        );
      }
      export default App;

      // Son.js
      import { Context1 } from './App'
      import { useContext } from 'react'
      function Son() {
        const value = useContext(Context1)
        console.log(value); // hello world
        return <div>
          Son
          <p>value is {value}</p>
        </div>
      }

      export default Son
      ```

9. ...

### HOC (higher order component)

1. Introduction: A design pattern where a function takes a component and returns a new component with additional features or behavior. It is a way to reuse component logic.
2. Using:

   ```js
   // TestHoc.js
   import React from "react";
   export default function TestHoc(WrappedComponent) {
     return class extends React.Component {
       render() {
         return (
           <WrappedComponent
             additionalProps={"hello from hoc"}
             {...this.props}
           />
         );
       }
     };
   }
   // App.js
   import Son from "./Son"
   import TestHoc from './TestHoc'

   const HocSon = TestHoc(Son)

   function App() {
     return (
       <div>
          123
          <HocSon />
       </div>
     )
   }

   export default App

   // Son.js
   function Son(props) {

    return (
      <div>{props.additionalProps}</div>
    )
   }
   export default Son
   ```

3. When to use?
   1. a lot of similar logic could be using `HOC`
   2. Provite lifecycle operations.

### Performance optimizez

1. Avoid update when the same value update.
   1. Introduction: When A state is assigned to the same value again, react will render this component again.
   1. Fix: Using `PureComponent` (when using `class` component) and function component.
2. Props led to re-render

   1. State updated led to child component re-render.

      1. Introduction: When a state in Parent component is updated, react will re-render all child component.
      2. Fix: Using `React.memo`. Passing child components into `React.memo` and call it to return memory child components.

         ```js
         import Son from "./Son";
         import { memo, useState } from "react";

         const MemoSon = memo(Son);
         function App() {
           const [num, setNum] = useState(0);
           return (
             <div>
               {num}
               <button
                 onClick={() => {
                   setNum(num + 1);
                 }}
               >
                 num+1
               </button>

               <MemoSon />
             </div>
           );
         }
         export default App;
         ```

   2. Re-defined state and methods led to child component re-render.

      ```js
      import Son from "./Son";
      import { memo, useState } from "react";

      const MemoSon = memo(Son);

      function App() {
        let obj = {
          a: 1,
        };

        let f1 = () => {};

        const [num, setNum] = useState(0);
        return (
          <div>
            {num}
            <button
              onClick={() => {
                setNum(num + 1);
              }}
            >
              num+1
            </button>

            <MemoSon obj={obj} f1={f1} />
          </div>
        );
      }

      export default App;
      ```

      When num is adding 1, `Son` component will be update since `obj` and `f1` is re-defined. Although the value of `obj` and `f1` is the same, but they are assigned a new memory address. So to provent the problems, need to using `useMemo` and `useCallback` to modify states and methods.

      ```js
      // ...
      let obj = useMemo(() => {
        return { a: 1 };
      }, []);

      let f1 = useCallback(() => {}, []);
      // ...
      ```
