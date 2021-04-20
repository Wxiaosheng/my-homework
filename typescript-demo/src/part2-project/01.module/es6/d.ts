// ts 提供一种兼容性导出方法： export = XXX
export = () => {
  console.log('d.ts')
}

/**
 * 编译的结果为：
 *
 *  module.exports = function () {
 *    console.log('d.ts');
 *  };
 *
 */