#! /usr/bin/env node

const yargs = require('yargs')

const { logReset, redBan } = require('./modules/color')
const mainFunction = require('./index')

const usage = `\x1b[32mUsage: 'scF <File Path> -s <Size>'${logReset}`

const usageCMD = yargs.usage(usage)

const optionCMD = usageCMD.option('size', {
  alias: 's',
  describe: 'Size : ("3x2" | "1x1") <default: "3x2">',
  type: 'string',
})

const opt = optionCMD.argv

const path = opt._[0]
let size = opt.s

if (path == undefined) {
  console.log(`${redBan}Error: Invalid file path.${logReset}`)
} else {
  if (size == undefined) {
    size = '3x2'
  }

  mainFunction(path, size)
}
