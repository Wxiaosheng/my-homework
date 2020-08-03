// 其实可以 不需要包装类型
// class ElementWarpper {
//   constructor(type){
//     this.root = 
//   }
// }

export class Component {
  constructor() {
    this.children = []
  }
  setAttribute(key, value) {
    this[key] = value
  }

  appendChild(child) {
    this.children.push(child)
  }
}

export const ToyReact = {
  /* 
    createElement 其实要处理的情况分一下三种：

    处理 type，attributes， 以及childrens

    type
    1、html 标签
    2、字符文本
    3、自定义组件

    attributes 很好处理

    childrens 其实也是要分
    1、html 标签
    2、字符文本
    3、自定义组件
    而且可能存在多层嵌套，因此需要递归的处理
  */

  createElement(type, attributes, ...childrens) {
    let element

    if (typeof type === "string") {
      element = document.createElement(type)
    }

    if (typeof type === "function") {
      element = new type()
    }

    for (let key in attributes) {
      element.setAttribute(key, attributes[key])
    }

    const dgChild = (childrens) => {
      for (let child of childrens) {
        if (Array.isArray(child)) {
          dgChild(child)
          return
        }
        if (typeof child === "string") {
          child = document.createTextNode(child)
        }
        if (typeof child !== "object") {
          child = document.createTextNode(String(child))
        }

        element.appendChild(child)
      }
    }

    dgChild(childrens)

    return element
  },

  render(vdom, root) {
    root.appendChild(vdom.render())
  }
}