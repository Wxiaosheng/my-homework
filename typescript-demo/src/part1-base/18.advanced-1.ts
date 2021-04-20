export default () => {
  console.log('---18.advanced.ts---')

  // 高级类型 - 1
  // 交叉类型 - 将多个类型合并为一个类型，新的类型将具备所有的类型的特性
  // 适用： 对象混入的场景
  interface DogInterface {
    run(): void
  }

  interface CatInterface {
    jump(): void
  }

  // 联合类型
  let pet: DogInterface & CatInterface = {
    run() { },
    jump() { }
  }


  let a: number | string = 'a' // 联合类型
  let b: 'a' | 'b' | 'c' = 'b' // 限制取值范围

  class Dog implements Dog {
    run() { }
    eat() { }
  }

  class Cat implements CatInterface {
    jump() { }
    eat() { }
  }

  enum Master { Boy, Girl }

  function getPet(master: Master) {
    let pet = master === Master.Boy ? new Dog() : new Cat()
    pet.eat()
    return pet
  }


  // 模式 - 可区分的联合类型
  interface Square {
    kind: 'Square'
    size: number
  }

  interface Rectangle {
    kind: 'Rectangle'
    width: number
    height: number
  }

  interface Circle {
    kind: 'Circle'
    r: number
  }

  type Shape = Square | Rectangle | Circle

  function area(s: Shape): number {
    switch (s.kind) {
      case 'Square': // 创建类型保护区块
        return s.size * s.size
      case 'Rectangle':
        return s.width * s.height
      case 'Circle':
        return Math.PI * s.r ** 2
    }
  }

  console.log(area({ kind: 'Circle', r: 2 }))

  // 联合类型

}