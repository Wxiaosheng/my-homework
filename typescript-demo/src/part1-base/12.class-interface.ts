export default () => {
  console.log('---12.class-interface ---')

  // 类和接口之间的关系

  // 接口只能约束类的共有成员
  interface Human {
    name: string
    eat(): void
  }

  class Asian implements Human {
    name: string
    constructor(name: string) {
      this.name = name
    }

    eat() {
      console.log('Asina eat...')
    }
  }

  // 接口的继承 （可继承接口，可继承类，可多继承）

  interface Man extends Human {
    run(): void
  }

  interface Child {
    cry(): void
  }

  interface Boy extends Man, Child { }

  let boy: Boy = {
    name: 'boy',
    eat() {
      console.log(this.name + ' eat')
    },
    run() {
      console.log(this.name + ' run')
    },
    cry() {
      console.log(this.name + ' cry')
    }
  }

  console.log(boy)

  // 接口继承类（相当于接口将类的方法和属性都抽象出来）
  class Auto {
    // private name: string = 'auto'
    state: number = 1
    auto() {
      console.log('auto')
    }
  }

  interface AutoInterface extends Auto { }

  class C implements AutoInterface {
    private name: string = 'C'
    state = 2
    auto() {
      console.log('C')
    }
  }


  /**
   *                 interface 和 class 之间的关系
   * 
   *   extends                                           extends
   *  ---------|                                        ---------
   *  |        |             implements                 |       |
   *  |        |        (只能实现 public 成员)            |       |
   *  |        |       --------------------------->     |       |
   *  |->  interface                                  class   <-|
   *                   <---------------------------
   *                         extends
   *               (可继承 public、private、protected 成员)
   * 
   * 
   */
}