export default () => {
  console.log('--- 06.enum ---')
  // 元组
  // 默认是从 0 开始递增
  enum Role1 {
    Reporter,
    Developmenter,
    Maintainer,
    Owner,
    Guest
  }

  // 可以指定自增的起点
  enum Role2 {
    Reporter = 5,
    Developmenter,
    Maintainer,
    Owner,
    Guest
  }

  // 可以手动设置初始值，但是注意非数字的初始值后无法自增
  enum Role3 {
    Reporter = 5,
    Developmenter = 'Developmenter',
    Maintainer = 'Maintainer',
    Owner = 8,
    Guest
  }

  console.log('Role1', Role1)
  console.log('Role1', Role2)
  console.log('Role1', Role3)
}
