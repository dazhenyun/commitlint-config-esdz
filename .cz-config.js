module.exports = {
  types: [
    { value: 'build', name: '📦‍ build: 编译相关文件的修改' },
    { value: 'feat', name: '✨ feat: 新功能' },
    { value: 'fix', name: '🐛 bug: 修复bug' },
    { value: 'refactor', name: '🔨 refactor: 代码重构' },
    { value: 'docs', name: '📝 docs: 文档更新' },
    { value: 'perf', name: '🚀 perf: 性能优化' },
    { value: 'test', name: '🔧 test: 增删测试' },
    { value: 'chore', name: '🏠 chore: 更改配置文件' },
    { value: 'style', name: '🎨 style: 代码的样式美化' },
  ],
  scopes: [],
  messages: {
    type: '选择类型:\n',
    customScope: '请输入文件修改范围\n',
    // scope: '更改的范围:\n',
    subject: '请简要描述提交(必填):\n',
    body: '详细描述. 使用"|"换行:\n',
    breaking: '列出任何BREAKING CHANGES(可选):\n',
    footer: '请输入要关闭的issue(可选):\n',
    confirmCommit: '确认提交?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'], // 当提交类型为feat、fix时才有破坏性修改选项
  subjectLimit: 72
}