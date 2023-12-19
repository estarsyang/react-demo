## Props

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
