'format cjs';

const wrap = require('word-wrap');
const longest = require('longest');
const rightPad = require('right-pad');
const childProcess = require('child_process');
const chalk = require('chalk');


const filter = (array) => {
  return array.filter((x) => {
    return x;
  });
};

// 获取选择列表
const getList = (obj) => {
  const objLeng = longest(Object.keys(obj)).length * 2 + 1;

  return Object.keys(obj).map(key => ({
    name: `${rightPad(`${key}:`, objLeng / 2, '  ')} ${obj[key].description}`,
    value: key
  }));
};


const postData = (data) => {
  var formData = new FormData();
  formData.append("data", JSON.stringify(data));
  
  function xhrRequest(resolve, reject) {
  　　var xhr = new XMLHttpRequest();
  　　xhr.open('POST', _this.gRequestPhpUrl);
  　　xhr.setRequestHeader("cache-control","no-cache"); //②
  　　xhr.onreadystatechange = function() {
     　　if (this.readyState === 4 && this.status === 200){
     　　　　var dataResp = JSON.parse(this.responseText);
     　　　　resolve(dataResp, this);
     　　}
     　　else {
        　　reject('网络错误：' + this.status, this);
     　　}
  　　}
  　　xhr.send(formData);
  }
  
  var sendReq = new Promise(xhrRequest);
  return sendReq;
}


module.exports = function (options) {
  const typeList = getList(options.types);

  return {
    prompter(cz, commit) {
      console.log(chalk.yellow('\n标题会在100个字符后进行裁剪。 主体内容每行会在100个字符后自动换行，手动换行请直接输入"\\n"。\n'));

      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: '选择你提交的信息类型:',
          choices: typeList
        }, {
          type: 'input',
          name: 'scope',
          message: '（非必填）本次提交的改变所影响的范围？\n',
        }, {
          type: 'input',
          name: 'subject',
          validate(str) {
            const charLen = 3
            if (str.length > charLen) {
              return str.length > charLen
            } else {
              console.log(chalk.yellow(`字符长度大于${charLen}`))
            }
          },
          message: '（必填）写一个简短的变化描述:\n'
        }, {
          type: 'input',
          name: 'body',
          message: '（非必填）提供更详细的变更描述:\n'
        }, {
          type: 'confirm',
          name: 'isBreaking',
          message: '是否存在不兼容变更?',
          default: false
        }, {
          type: 'input',
          name: 'breaking',
          message: '列出所有的不兼容变更:\n',
          when(answers) {
            return answers.isBreaking;
          }
        }, {
          type: 'confirm',
          name: 'isIssueAffected',
          message: '此次变更是否影响某些打开的 issue ?',
          default: false
        }, {
          type: 'input',
          name: 'issues',
          message: '列出此次改动引用的所有 issues （如："fix #123", "Closes #123, #124"）:\n',
          when(answers) {
            return answers.isIssueAffected;
          }
        }
      ]).then((answers) => {
        const maxLineWidth = 100;
        const wrapOptions = {
          trim: true,
          newline: '\n',
          indent: '',
          width: maxLineWidth
        };

        // 判断影响范围是否输入
        const scope = answers.scope ? `(${answers.scope.trim()})` : '';

        // 限制短描述为 100 个字符
        const head = (`${answers.type + scope}: ${answers.subject.trim()}`).slice(0, maxLineWidth);

        // 限制详细描述最长宽度为 100 个字符串
        const body = wrap(answers.body, wrapOptions);

        // Apply breaking change prefix, removing it if already present
        let breaking = answers.breaking ? answers.breaking.trim() : '';

        // 如果手动输入了 不兼容变更，则过滤掉，最后进行长度限制
        breaking = breaking ? `不兼容变更: ${breaking.replace(/^不兼容变更: /, '')}` : '';
        breaking = wrap(breaking, wrapOptions);

        const issues = answers.issues ? wrap(answers.issues, wrapOptions) : '';

        const footer = filter([breaking, issues]).join('\n\n');
        const username = childProcess.execSync('git config user.name').toString()
        const branchName = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString()
        
        console.log({scope,head,body,username,branchName})

        commit(`${head}\n\n${body}\n\n${footer}`);
      });
    }
  };
};
