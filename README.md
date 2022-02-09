## CommitLint 规范

前端 CommitLint 规范 1

#### 安装

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
npx husky-init
npm install husky --save-dev
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

### package.json 修改:

```
  "scripts": {
    "cz": "git add . && git cz && git push",
    "prepare": "husky install"
  },
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
```

字段说明

| 字段        | 类型   | 说明                                                         | 必须 |
| ----------- | ------ | ------------------------------------------------------------ | ---- |
| type        | string | 用于表明我们这次提交的改动类型                               | 是   |
| scope       | string | 一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块 | 否   |
| description | string | 一句话描述此次提交的主要内容，做到言简意赅                   | 是   |

type

| type 类型 | 说明                                                                  |
| --------- | --------------------------------------------------------------------- |
| build     | 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交 |
| feat      | 新增功能                                                              |
| fix       | bug 修复                                                              |
| docs      | 文档更新                                                              |
| ui        | 更新 UI                                                               |
| perf      | 优化                                                                  |
| refactor  | 重构代码                                                              |
| style     | 不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)              |
| test      | 新增测试用例或是更新现有测试                                          |
| chore     | 不属于以上类型的其他类型(日常事务)                                    |
