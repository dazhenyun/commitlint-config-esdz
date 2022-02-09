'format cjs';

const engine = require('./engine');


module.exports = engine({
  types: {
    feat: {
      description: '✨  新功能',
      title: '✨ 新功能'
    },
    fix: {
      description: '🐛  修复bug',
      title: '🐛 Bug 修复'
    },
    perf: {
      description: '🚀  提升性能的代码更改',
      title: '🚀 性能优化'
    },
    style: {
      description: ' 🎨  对代码含义无影响的改动（空格，格式化，等，非 UI 变动）',
      title: '🎨 代码样式'
    },
    docs: {
      description: '📝  只有文档发生改变',
      title: '📝 文档更新'
    },
    test: {
      description: '🔧  添加一些缺失的测试或者修正已存在的测试',
      title: '🔧 增删测试'
    },
    refactor: {
      description: '   🔨  既不是修复 bug 也不是添加新功能的代码更改',
      title: '🔨 代码重构'
    },
    chore: {
      description: '🏠  影响构建系统或外部依赖的更改（例如：gulp，npm，webpack）',
      title: '🏠 构建'
    },
    build: {
      description: '📦  编译相关文件的修改',
      title: '📦 编译'
    },
    // ci: {
    //   description: '📦  持续集成的配置文件和脚本的改变（例如: Travis, Circle）',
    //   title: '📦 持续集成'
    // },
    revert: {
      description: ' 🔙  撤销上一次的提交',
      title: '🔙 撤销'
    }
  }
});