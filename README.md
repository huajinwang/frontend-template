

> `vue-cli`, `create-react-app`、`react-native-cli` 等都是非常优秀的脚手架，通过脚手架，我们可以快速初始化一个项目，无需自己从零开始一步步配置，有效提升开发体验。尽管这些脚手架非常优秀，但是未必是符合我们的实际应用的，我们可以定制一个属于自己的脚手架(或公司通用脚手架)，来提升自己的开发效率。

#### 脚手架

解决的问题：

- 重复性工作，繁琐而且浪费时间
- copy过来的模板容易存在无关的代码
- 项目中有很多需要配置的地方，容易忽略一些配置点，进而埋坑
- 人工操作永远都有可能犯错，建新项目时，总要花时间去排错

 针对以上问题，我开发了一个脚手架工具，可以根据交互动态生成项目结构，自动添加依赖和配置，并移除不需要的文件。 

#### 基本思路

- 将项目模板与脚手架工具分离，可以更好的维护模板和脚手架工具。
- 通过commander.js处理命令行
- 通过download-git-repo处理下载
- 通过inquirer.js处理终端交互
- 参考了git的ignore的思路，利用自定义的templates.ignore动态化的移除不必要的文件和目录

#### [commander.js](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)处理命令行

 node.js 内置了对命令行操作的支持，`package.json` 中的 `bin` 字段可以定义命令名和关联的执行文件。在 `package.json` 中添加 `bin` 字段 

> package.json 

```
{
  "name": "jin-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "love": "./bin/love.js"
  }
}
```

> bin/love.js

```
// 通过npm install commander安装
const program = require('commander')

program.version('1.0.0')
  .usage('<command> [项目名称]')
  .command('init', '创建新项目')
  .parse(process.argv)
```

如果这样直接执行，程序会报找不到`love-init`的错误，因为commander支持[git风格的子命令处理](https://github.com/tj/commander.js#git-style-sub-commands)，可以根据子命令自动引导到以特定格式命名的命令执行文件，文件名的格式是`[command]-[subcommand]`，例如：`love init => love-init`。因此新建`love-init.js`后输入代码

```
console.log('I Love Program')
执行：node ./bin/love.js init
输出：I Love Program
```

再来看看`love-init.js`如何实现脚手架的各项功能

#### 功能实现

##### .......

