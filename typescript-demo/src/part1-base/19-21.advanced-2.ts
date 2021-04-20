export default () => {
  console.log('---19-21.advanced-2---')

  // 索引类型 - 可以实现对 对象属性的查询和访问

  let obj = {
    a: 1,
    b: 2,
    c: 3
  }

  function getValue(obj: any, keys: string[]) {
    return keys.map(key => obj[key])
  }

  console.log(getValue(obj, ['a', 'b', 'd']))

  // 如何约束上述访问 obj 的 d 属性？
  // 解决方案，索引类型
  // 索引类型的查询操作符，keyof T, 表示类型 T 的所有公共属性的字面量的联合类型
  interface Obj {
    a: number,
    b: string
  }

  let key: keyof Obj

  // T[k]
  let key1: Obj['a']

  // T extends U 

  // 这种写法可以，但是不能约束返回值类型
  // function getValue1<T>(obj: T, keys: Array<keyof T>) {
  //   return keys.map(key => obj[key])
  // }

  function getValue1<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key])
  }

  console.log(getValue1(obj, ['a', 'b']))
  // console.log(getValue1(obj, ['e', 'f']))



  // 高级类型-映射类型 - 从一个旧的类型，生成一个新的类型

  interface Obj1 {
    a: number
    b: number
    c: number
  }

  // 例如，将一个类型中的所有属性变成只读
  type ReadOnlyObj1 = Readonly<Obj1>

  // 例如，将一个类型中的所有属性变成可选
  type PartialObj1 = Partial<Obj1>

  // 例如，抽取一个类型中的所有属性的一个子集
  type PickObj1 = Pick<Obj1, 'a' | 'b'>


  type RecordObj1 = Record<'x' | 'y', Obj1>



  // 高级类型-条件类型
  // T extends U ? X : Y
  type TypeName<T> =
    T extends string ? 'string' :
    T extends number ? 'number' :
    T extends boolean ? 'boolean' :
    T extends undefined ? 'undefined' :
    T extends Function ? 'Function' :
    'object'

  type T1 = TypeName<string>
  type T2 = TypeName<string[]>


  // (A | B) extends U ? X : Y
  // (A extends U ? X : Y) | (B extends U ? X : Y)

  type T3 = TypeName<string | string[]>


  type Diff<T, U> = T extends U ? never : T

  type T4 = Diff<'a' | 'b' | 'c', 'a' | 'e'>

  type NotNull<T> = Diff<T, undefined | null>

  // 官方预置
  // Exclude<T, U>    // 从类型T中过滤掉，可以赋值给类型U的类型
  // NonNull<T>       // 过滤T中的 null undefined 
  // Extract<T, U>    // 从类型T中，抽取可以赋值给类型U的类型

  type T6 = Extract<'a' | 'b' | 'c', 'a' | 'd'>

  // ReturnType<T>    // 可以获取函数返回值类型
  type T7 = ReturnType<() => string>
  // 实现原理，infer 关键字表示带推断，或延迟推断的意思

}