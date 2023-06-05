## CommitLint 规范

前端 CommitLint 规范

#### 相关依赖

```
npm install husky commitlint @commitlint/config-conventional  --save-dev

```

#### 安装组件

```shell
npm install @dzo/commitlint-config-esdz -D
# OR
yarn add @dzo/commitlint-config-esdz --dev
```

#### 使用

在你的工程根目录下创建一个`commitlint.config.js`配置文件

配置如下即可:

```js
module.exports = {
  extends: '@dzo/commitlint-config-esdz'
}
```

#### 安装 husky

对于 commit-msg hook 我们可以使用以下命令来创建 git hook 所要执行的脚本

依次在项目根目录执行如下两条命令

```
npx husky install  // 激活husky配置
yarn husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
npm set-script cz "git add . && git cz && git push"   // 注意：npm set-script xxx在npm7+生效。
```

### package.json 修改:

```
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -e HUSKY_GIT_PARAMS"
    }
  },
  "config": {
    "commitizen":{
      "path":"./node_modules/@dzo/commitlint-config-esdz/lib/cz"
    }
  },
```

:::caution
如果项目之前安装过 CommitLint 相关的包，建议卸载，避免引入不必要的包。如`@commitlint/cli`、`@commitlint/config-conventional`等，直接在 package.json 搜索**commitlint**，相关的包全部卸载
:::

#### 规范

格式： `<type>[(scope)]: <description>`

示例

```bash
git commit -a -m 'build: xxxxx'
git commit -a -m 'feat(cli): xxxxx'
git commit -a -m 'feat(cli): xxxxx' --no-verify // 不验证规范
```

字段说明

| 字段        | 类型   | 说明                                                         | 必须 |
| ----------- | ------ | ------------------------------------------------------------ | ---- |
| type        | string | 用于表明我们这次提交的改动类型                               | 是   |
| scope       | string | 一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块 | 否   |
| description | string | 一句话描述此次提交的主要内容，做到言简意赅                   | 是   |

type

| type 类型 | 说明                                                     |
| --------- | -------------------------------------------------------- |
| feat      | 新增功能                                                 |
| fix       | bug 修复                                                 |
| ui        | 更新 UI                                                  |
| style     | 对代码含义无影响的改动（空格，格式化，等，非 UI 变动）   |
| perf      | 提升性能的代码更改                                       |
| docs      | 只有文档发生改变                                         |
| test      | 添加一些缺失的测试或者修正已存在的测试                   |
| refactor  | 重构代码                                                 |
| chore     | 影响构建系统或外部依赖的更改（例如：gulp，npm，webpack） |
| build     | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动   |
| revert    | 撤销上一次的提交                                         |
