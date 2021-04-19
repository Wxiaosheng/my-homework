export default () => {
  console.log('---13-14.generics ---')

  // 泛型 - generics
  // 不预先确定的数据类型，具体的类型在使用的时候确定
  // 使用泛型的好处
  // 1. 函数 和 类 可以轻松的支持多种类型，增强程序的扩展性
  // 2. 不必写多条函数重载，冗长的联合类型声明，增强代码可读性
  // 3. 灵活控制类之间的约束

  // 泛型函数
  function log<T>(value: T): T {
    console.log(value)
    return value
  }

  log<string>('log') // 不推荐
  log('string') // 推荐，会类型推断
  log(123)


  // type Log<T> = (value: T) => T
  // type Log = <T>(value: T) => T
  // let myLog: Log = log

  interface Log {
    <T>(value: T): T
  }

  let myLog: Log = log

  // 这种实现方式会让泛型内所有的属性都会受到泛型的约束，注意实现时必须制定一个类型
  interface Log1<T = string> {
    (value: T): T
  }

  let myLog1: Log1 = log // 实现时如果不指定类型则接口的泛型需要默认值
  let myLog2: Log1<number> = log


  // 泛型类 - 泛型参数只能用于非静态成员
  class Log3<T> {
    run(value: T) {
      console.log(value)
    }
  }

  // let log3 : Log3<number> = new Log3()
  let log3 = new Log3<number>()
  log3.run(1)


  // 泛型约束
  interface Length {
    length: number
  }
  function log4<T extends Length>(value: T) {
    console.log(value, value.length)
  }

  log4('string')
  log4([1, 2, 3])
  // log4(5)
  // log4(true)
}