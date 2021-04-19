export default () => {
  console.log('---15-17.check-class.ts---')

  // 类型检查机制
  // TypeScript 编译器在做类型检查时，所秉承的一些原则，以及表现出来的一些形式
  // 作用： 辅助开发，提高开发效率


  // 15 - 类型推断（有三种）
  // 基础类型推断 （初始化变量、函数参数的默认值、函数返回值）（是从左侧向右推断的）

  let a = 'a'
  let b = 1
  let c = true
  let d = [1, 2]
  let e = ['1', '2']
  let add = (x = 1, y = 1) => x + y

  // 最佳通用类型推断 （当需要从多个类型中推断出一个尽可能兼容所有类型的 通用类型）
  let f = [1, '2']

  // 上下文类型推断 (事件处理) (是从右侧向左推断的)
  window.onkeydown = (event) => {
    console.log(event.target)
  }

  // 类型断言 - 当 TS 的类型推断的结果不够准确 或者不是我们想要的时，可以使用类型断言覆盖默认的类型推断的结果
  // 要注意 不要滥用
  // 使用方式，`变量 as 类型`
  interface Foo {
    bar: number
  }
  let foo = {

  } as Foo

  foo.bar = 1


  // 16 - 类型兼容性
  // 当一个类型 Y 可以被赋值给另一个类型 X 时，我们就可以说 类型X 兼容 类型Y
  // X 兼容 Y： X（目标类型） = Y（源类型）
  // 源类型只要具备目标类型中所有的属性，则可赋值（即 接口之间的兼容，成员少可以兼容成员多的）

  let x: string = '1'
  // x = null （字符串兼容 null 可以通过， strict: false 关闭校验）

  // 接口兼容性
  interface X {
    a: any;
    b: any;
  }

  interface Y {
    a: any;
    b: any;
    c: any;
  }

  let x1: X = { a: 1, b: 2 }
  let y1: Y = { a: 1, b: 2, c: 3 }
  x1 = y1
  // y1 = x1 // error

  // 函数的兼容性 - 函数需要重新复制的时候（函数作为参数的时候）
  type Handler = (a: number, b: number) => void
  function hof(handler: Handler) {
    return handler
  }
  // 如果目标函数需要兼容源函数，则需要满足三个条件
  // 1. 参数个数，目标函数参数个数多余源函数参数个数
  let handler1 = (a: number) => { }
  hof(handler1)
  // 可选参数 和 剩余参数
  // 固定参数是可以兼容可选参数 和 剩余参数的
  // 可选参数是不兼容固定参数 和 剩余参数的 - (可以通过 strictFunctionTypes: false 关闭校验)
  // 剩余参数是可以兼容固定参数 和 可选参数
  let h1 = (x: number, y: number) => { }
  let h2 = (x: number, y?: number) => { }
  let h3 = (...agrs: number[]) => { }
  h1 = h2
  h1 = h3
  // h2 = h1
  // h2 = h3
  h3 = h1
  h3 = h2
  // 2. 参数类型 必须要匹配
  let handler3 = (x: number, y: string) => { }
  // hof(handler3)
  interface Point3D {
    x: number
    y: number
    z: number
  }

  interface Point2D {
    x: number
    z: number
  }

  let p3d = (point: Point3D) => { }
  let p2d = (point: Point2D) => { }
  // 函数参数-对象，对象成员个数多的，兼容对象成员个数少的 （可以看成将对象拆成了一个个参数，参数个数多的 兼容 参数个数少的）
  p3d = p2d
  // p2d = p3d - (可以通过 strictFunctionTypes: false 关闭校验)
  // 这种 函数的参数之间可以互相赋值的情况，叫做的 函数参数的双向协变
  // 允许将将一个精确的类型赋值给不那么精确的类型，这样做的好处是 不需要将一个不精确的类型断言成一个精确的类型

  // 3. 返回值类型 （目标函数的返回值类型必须与源函数的类型相同，或为其子类型）
  let g = () => ({ name: 'a' })
  let h = () => ({ name: 'a', location: true })
  g = h
  // h = g


  // 枚举类型的兼容性 (和数字是兼容的)
  enum Fruit { Apple, Banana }
  enum Color { Red, Yellow }
  let fruit: Fruit = Fruit.Apple
  fruit = 5
  let no = Fruit.Apple
  // let col: Color.Red = Color.Yellow


  // 类的兼容性 （和接口比较相似，主要比较结构，注意 静态成员和构造函数是不参与比较, 如果类中含有私有成员）
  class A {
    constructor(p: number, q: number) { }
    id: number = 1
    private name: string = ''
  }

  class B {
    static s = 1
    constructor(p: number) { }
    id: number = 2
    private name: string = ''
  }

  let aa = new A(1, 2)
  let bb = new B(1)
  // aa = bb
  // bb = aa

  class C extends A { }

  let cc = new C(2, 3)
  aa = cc
  // bb = cc


  // 泛型的兼容性
  interface Empty<T> {
    value: T
  }

  // let obj1: Empty<number> = {}
  // let obj2: Empty<string> = {}
  // obj1 = obj2

  let fn1 = <T>(x: T): T => {
    console.log(x)
    return x
  }

  let fn2 = <U>(y: U): U => {
    console.log(y)
    return y
  }

  fn1 = fn2

  // 口诀：
  // 结构之间兼容，成员少的兼容成员多的
  // 函数之间兼容，参数多的兼容参数少的




  // 17 - 类型保护
  // TypeScript 能够在特定的区块中保证变量属于某种确定的类型
  // 可以在此区块中放心地引用此类型属性，或调用此类型的方法
  // 有四种创建方式
  // 1. instanceof
  // 2. in （判断某个属性是否属于某个对象）
  // 3. typeof (比较适用基本数据类型)
  // 4. 创建类型保护函数
  enum Type { Strong, Week }

  class Java {
    helloJava() {
      console.log('hello Java')
    }
    java: any
  }

  class JavaScript {
    helloJavaScript() {
      console.log('hello JavaScript')
    }
    javaScript: any
  }

  // 自定义 类型保护函数 （返回值 类型谓词）
  function isJava(lang: Java | JavaScript): lang is Java {
    return (lang as Java).helloJava !== undefined
  }

  function getLanguage(type: Type) {
    let lang = type === Type.Strong ? new Java() : new JavaScript()
    // if ((lang as Java).helloJava) {
    //   (lang as Java).helloJava()
    // } else {

    //   (lang as JavaScript).helloJavaScript()
    // }
    if (lang instanceof Java) {
      lang.helloJava() // 可以放心调用，且有提示
    } else {
      lang.helloJavaScript()
    }

    if ('java' in lang) {
      lang.helloJava()
    } else {
      lang.helloJavaScript()
    }

    if (isJava(lang)) {
      lang.helloJava()
    } else {
      lang.helloJavaScript()
    }

    return lang
  }

  // getLanguage(Type.Strong)
  console.log(getLanguage(Type.Strong))


}