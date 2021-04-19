export default () => {
  console.log('--- 07-08.interface ---')

  let add: (x: number, y: number) => number

  // 接口 - interface
  // 与上面一种方式定义是等价的（注意函数返回值类型的定义）
  interface Add {
    (x: number, y: number): number
  }

  // 还有一种更简洁的方式定义函数类型，类型别名(为函数的类型取一个名字)
  type Add1 = (x: number, y: number) => number

  let add1: Add1 = (x, y) => x + y
  console.log(add1(2, 3))

  // 混合类型接口
  interface Lib {
    (): void
    version: string
    doSomething(): void
  }

  function getLib() {
    // let lib: Lib = () => { } // 类型“() => void”缺少类型“Lib”中的以下属性: version, doSomething
    // 需要使用类型断言解决上述报错
    let lib: Lib = (() => { }) as Lib
    lib.version = '1.0.1'
    lib.doSomething = () => { console.log('doSomething') }

    return lib
  }

  let lib1 = getLib()

  console.dir(lib1)
  console.log(lib1.version)
  console.log(lib1.doSomething())
}