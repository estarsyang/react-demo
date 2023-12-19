## State (using class component)

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
