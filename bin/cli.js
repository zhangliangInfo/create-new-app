#!/usr/bin/env node

const { program } = require('commander')
const inquirer = require('inquirer')
const ora = require('ora')
const download = require('download-git-repo')
const { errLog, successLog } = require('../src/utils/log.js')
const fs = require('fs')
const { chdir, cwd } = require('process')
const { exec, execSync } = require('child_process')

program
 .version('0.0.1')
 .command('create <projectName>')
 .description('create a new project')
 .alias('c')
 .option('-r, --react', 'react template')
 .option('-v, --vue', 'vue template')
 .option('-v2, --vue2', 'vue2 template')
 .option('-v3, --vue3', 'vue3 template')
 .action((projectName, options) => {
   inquirer
    .prompt([
      {
        type: 'list',
        name: 'frameTemplate',
        message: '请选择框架类型',
        choices: ['React']
      }
    ])
    .then(async (answer) => {
      await fs.mkdirSync(projectName, { recursive: true }, () => {})
      chdir(cwd() + '/' + projectName)
      const spinner = ora()
      spinner.text = '正在初始化^_^'
      spinner.start()
      // 下载代码
      download(
        'direct:https://github.com/zhangliangInfo/initReactProject#master',
        cwd(),
        {
          clone: true,
        },
        (err) => {
          if (err) {
            spinner.fail('模板下载失败')
            console.log(err)
            // errLog(err)
          } else {
            spinner.succeed('模板下载成功')
            spinner.text = '正在安装项目'
            spinner.start()
            execSync('npm i', console.log)
            spinner.succeed('安装成功')
            // successLog('项目初始化完成')
          }
        }
      )
    })
})
program.version('1.0.0').parse(process.argv)