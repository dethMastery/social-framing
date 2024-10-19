// const path = require('path')
const fs = require('fs')

const { redBan, logReset, greenSuccess } = require('../color')
const FrameBased = require('./frame')

async function canvasBased(filepath, size) {
  let frameBase

  const sptPath = filepath.split('/').slice(0, -1)
  const dirPath = sptPath.join('/')
  const outPath = `${dirPath}/cut`
  const fileName = `${filepath.split('/').pop().split('.')[0]}_cut.jpeg`

  frameBase = await FrameBased(filepath, size)

  if (size == '3x2') {
    // Do Cut
    if (!fs.existsSync(outPath)) {
      fs.mkdirSync(outPath)
      fs.writeFileSync(`${outPath}/${fileName}`, frameBase)
    } else {
      fs.writeFileSync(`${outPath}/${fileName}`, frameBase)
    }

    console.log(
      `${greenSuccess}Added watermarked to ${fileName} successfully!${logReset}`
    )
  } else if ((size = '1x1')) {
    if (!fs.existsSync(outPath)) {
      fs.mkdirSync(outPath)
      fs.writeFileSync(`${outPath}/${fileName}`, frameBase)
    } else {
      fs.writeFileSync(`${outPath}/${fileName}`, frameBase)
    }

    console.log(
      `${greenSuccess}Added watermarked to ${fileName} successfully!${logReset}`
    )
  } else {
    console.log(`${redBan}Error: Invalid Size${logReset}`)
  }
}

module.exports = canvasBased
