// 导入模块

// 导入默认值
import newName from './a'

// 批量导入
import { a, b, c } from './a'

// 导入接口
import { A } from './a'

// 导入时起别名
import { add as Add } from './a'

// 导入a模块中所有的成员，并并绑定在 All 上
import * as All from './a'


console.log('--- 01.module - es ---')

console.log('default: ', newName)

console.log('a: ', a)
console.log('b: ', b)
console.log('c: ', c)

let AA: A = {
  run() { }
}

console.log('Add: ', Add(2, 3))


console.log('All: ', All)