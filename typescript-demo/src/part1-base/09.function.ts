export default () => {
  console.log('--- 09.function ---')

  // 函数
  // 四种定义方式
  // 既声明了函数类型，实现了函数
  function add1(x: number, y: number) {
    return x + y
  }

  // 声明一个函数类型，没有实现
  let add2: (x: number, y: number) => number

  // 类型别名，没有实现
  type add3 = (x: number, y: number) => number

  // 接口，没有实现
  interface Add4 {
    (x: number, y: number): number
  }


  // 可选参数
  function add5(x: number, y?: number) {
    return y ? x + y : x
  }

  // 默认参数生效情况： 显性的传递 undefined， 或在非必传参数之后可省略不传能生效
  function add6(x: number, y = 1, z: number) {
    return x + y + z
  }

  function add7(x: number, ...args: number[]) {
    return x + args.reduce((a, b) => a + b)
  }

  console.log('add7(1, 2, 3, 4, 5)', add7(1, 2, 3, 4, 5))


  // 函数重载（函数名相同，参数不同）
  function add8(...args: number[]): number
  function add8(...args: string[]): string
  function add8(...args: any[]): any {
    const first = args[0]
    if (typeof first === 'number') {
      return args.reduce((a, b) => a + b)
    }
    if (typeof first === 'string') {
      return args.join('')
    }
  }

  console.log('函数重载: add8(1, 2, 3)', add8(1, 2, 3))
  console.log("函数重载: add8('a', 'b', 'c')", add8('a', 'b', 'c'))

}