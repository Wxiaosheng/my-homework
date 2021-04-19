export default () => {
  console.log('--- 10-11.class ---')

  // 类
  class Dog {
    public name: string // 默认就是 public
    age?: 1 // 可以指定默认值，和是否是必须的属性
    // private constructor(name: string) { // 如果对 constructor 使用 private，表示改类既不能被实例化，也不能被使用
    // protected constructor(name: string) { // 如果对 constructor 使用 protected，表示改类不能被实例化，只能被继承
    // 除了类的成员可以添加修饰符之外，构造函数的参数也可以设置修饰符，会使参数自动变成实例的属性（无需再类中定义对应的属性）
    constructor(name: string) {
      this.name = name
    }
    run() { }
    private pri() { } // private 只能被类本身使用，不能被实例使用，也不能被继承子类使用
    protected pro() { } // protected 可以被类本身使用，也能被继承子类使用，但不能被实例使用
    readonly legs: number = 4 // 只读属性，必须要设默认值
    static food: string = 'bones' // 只能通过类名访问，不能通过实例访问
  }

  console.log(Dog.food)
  console.log(Dog.prototype)
  console.log(new Dog('二哈'))
  // console.log(new Dog('二哈').pri())  // 属性“pri”为私有属性，只能在类“Dog”中访问


  class Husky extends Dog {
    color: string
    constructor(name: string, color: string) {
      super(name)
      this.color = color
    }
  }

  console.log(Husky.prototype)

  // 抽象类 - 只能被继承不能被实例化的类

  abstract class Animal {
    abstract sleep(): void
    eat() {
      console.log('eat...')
    }
  }

  class Pig extends Animal {
    constructor() {
      super()
    }
    sleep() {
      console.log('pig sleep')
    }
  }

  // 多态 - 在父类中定义抽象方法，在不同的子类中实现方式不同
  class Cat extends Animal {
    constructor() {
      super()
    }
    sleep() {
      console.log('cat sleep')
    }
  }

  let animals: Animal[] = [new Pig(), new Cat()]
  animals.forEach(a => a.sleep())

  // 类的成员方法返回 this，可以实现链式调用
  class WorkFlow {
    step1() {
      console.log('step1')
      return this
    }

    step2() {
      console.log('step2')
      return this
    }
  }

  let wf: WorkFlow = new WorkFlow()
  wf.step1().step2().step1().step1().step2()

  class MyFlow extends WorkFlow {
    next() {
      console.log('next')
      return this
    }
  }

  let mf: MyFlow = new MyFlow()

  mf.step1().step2().next().step1().next()
}