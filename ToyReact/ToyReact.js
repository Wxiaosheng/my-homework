class ElementWarpper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    
    if(name.match(/^on([\s\S]+)$/)){
      const eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase())
      console.log(eventName, value)

      this.root.addEventListener(eventName, value)
    }

    this.root.setAttribute(name, value)
  }
  appendChild(vChild) {
    let range = document.createRange()
    if (this.root.children.length) {
      //如果有子节点，设置在最后的子节点
      range.setStartAfter(this.root.lastChild)
      range.setEndAfter(this.root.lastChild)
    } else {
      //没有子节点这设置在this.root
      range.setStart(this.root, 0)
      range.setEnd(this.root, 0)
    }

    vChild.mountTo(range)
  }
  mountTo(range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

class TxetWarpper {
  constructor(type) {
    this.root = document.createTextNode(type)
  }
  mountTo(range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

export class Component {
  constructor() {
    this.children = []
    this.props = Object.create(null)
  }
  setAttribute(name, value) {
    this.props[name] = value
    this[name] = value
  }
  mountTo(range) {
    this.range = range
    this.update()
  }
  appendChild(vChild) {
    this.children.push(vChild)
  }

  update(){
    let placeHolder = document.createDocumentFragment()
    let range = document.createRange()
    range.setStart(this.range.endContainer, this.range.endOffset)
    range.setEnd(this.range.endContainer, this.range.endOffset)
    range.insertNode(placeHolder)

    this.range.deleteContents()
    let vDom = this.render()
    vDom.mountTo(this.range)
  }

  setState(state){
    const merge = (oldState, newState) => {
      for(let p in newState) {
        if (typeof newState[p] === "object") {
          if (typeof oldState[p] !== "object") {
            oldState[p] = {}
          }
          merge(oldState[p], newState[p])
        }
        else {
          oldState[p] = newState[p]
        }
      }
    }

    if(!this.state && state) {
      this.state = {}
    }

    merge(this.state, state)

    this.update()
  }
}

export const ToyReact = {
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
    let range = document.createRange()
    if(root.children.length){
      range.setStartAfter(root.lastChild)
      range.setEndAfter(root.lastChild)
    }else{
      range.setStart(root,0)
      range.setENd(root,0)
    }
    vdom.mountTo(range)
  }
}