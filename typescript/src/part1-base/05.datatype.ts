// 基本类型

export default () => {
  console.log('--- 05.datatype ---')
  // 原始数据类型
  let bool: boolean = true
  let num: number = 1
  let str: string = 'str'

  // 数组
  let arr1: number[] = [1, 2, 3]
  let arr2: Array<number> = [1, 2, 3]
  let arr3: Array<number | string | boolean> = [1, '2', true]

  // 元组
  let tuple: [number, string] = [1, 'str']
  // tuple.push(2) // 不会报错
  // console.log(tuple.length)
  // console.log(tuple[2]) // error: 长度为 "2" 的元组类型 "[number, string]" 在索引 "2" 处没有元素。

  // 函数
  let add1 = (x: number, y: number) => x + y
  function add2(x: number, y: number) {
    return x + y
  }
  let add3: (x: number, y: number) => number
  add3 = (x, y) => x + y

  // object
  let obj: {
    x: string,
    y: number,
    z: boolean
  } = {
    x: 'x',
    y: 1,
    z: true
  }
  obj.x = '1'

  // symbol
  let s1: symbol = Symbol()
  let s2: symbol = Symbol()
  console.log('s1 === s2 = ', s1 === s2)

  // undefined、null
  let u: undefined = undefined
  let n: null = null

  // void
  let noReturn = () => { }

  // any
  let x
  x = 1
  x = '1'
  x = true
  x = []


  // never - 永远没有返回值
  let error = () => {
    throw new Error('this is error')
  }

  let loop = () => {
    while (true) { }
  }

}