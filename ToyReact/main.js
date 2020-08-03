import { ToyReact, Component } from './ToyReact'

class MyComponent extends Component {
  //  可以不定义 mountTo 方法

  render() {
    return <div>
      <span>Hello </span>
      <span>World!</span>
      {true}
      <div>
        {[1, 2, 3, 4]}
      </div>

      <div>{this.children}</div>
    </div>

    // return <div>
    //   <span>hello</span>
    //   &nbsp;
    //   <span>world!</span>
    //   <div>
    //     {true}
    //     {this.children}
    //   </div>
    // </div>
  }
}

const a = <MyComponent name="a" id="a">MyComponent</MyComponent>

// const a = <div name="a" id="a">main</div>

// console.log(a)

// document.body.appendChild(a)

ToyReact.render(a, document.body)
