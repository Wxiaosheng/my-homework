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



  // 17 - 类型保护
}