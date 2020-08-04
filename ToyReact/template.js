class ElementWarpper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(key, value) {
    this.root.setAttribute(key, value)
  }
  appendChild(vChild) {
    vChild.mountTo(this.root)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class TxetWarpper {
  constructor(type) {
    this.root = document.createTextNode(type)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

export class Component {
  constructor() {
    this.children = []
  }
  setAttribute(name, value) {
    this[name] = value
  }
  mountTo(parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
  appendChild(vChild) {
    this.children.push(vChild)
  }
}

export const MyReact = {
  createElement(type, attributes, ...childrens) {
    let element

    // 处理 html 标签
    if (typeof type === 'string') {
      element = new ElementWarpper(type)
    } else {
      // 处理自定义组件
      element = new type;
    }

    for (let key in attributes) {
      element.setAttribute(key, attributes[key])
    }

    // 自定义组件 存在 包裹的内容，递归处理
    let insertChildren = (childrens) => {
      for (let child of childrens) {
        if (typeof child === 'object' && child instanceof Array) {
          insertChildren(child)
        } else {
          if (
            !(child instanceof Component)
            && !(child instanceof ElementWarpper)
            && !(child instanceof TxetWarpper)
          ) {
            child = child.toString()
          }
          if (typeof child === 'string') {
            // 处理文本节点
            child = new TxetWarpper(child)
          }
          element.appendChild(child)
        }
      }
    }

    insertChildren(childrens)

    return element
  },

  render(vdom, root) {
    vdom.mountTo(root)
  }
}