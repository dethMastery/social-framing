// const path = require('path')
const fs = require('fs')

const { redBan, logReset, greenSuccess } = require('../color')
const FrameBased = require('./frame')
const SpliterSanNi = require('./spliter/3x2')
const SpliterIchiIchi = require('./spliter/1x1')

async function canvasBased(filepath, size) {
  let frameBase

  const sptPath = filepath.split('/').slice(0, -1)
  const dirPath = sptPath.join('/')
  const outPath = `${dirPath}/cut`
  const fileName = `${filepath.split('/').pop().split('.')[0]}_cut.jpeg`

  frameBase = await FrameBased(filepath, size)

  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath)
  }

  if (size == '3x2') {
    await SpliterSanNi(frameBase, outPath, fileName)

    console.log(`${greenSuccess}${fileName} cropped successfully!${logReset}`)
  } else if ((size = '1x1')) {
    SpliterIchiIchi(frameBase, outPath, fileName)

    console.log(`${greenSuccess}${fileName} cropped successfully!${logReset}`)
  } else {
    console.log(`${redBan}Error: Invalid Size${logReset}`)
  }
}

module.exports = canvasBased
