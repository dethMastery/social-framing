const fs = require('fs')

async function SpliterIchiIchi(image, outPath, fileName) {
  if (!fs.existsSync(`${outPath}/1x1`)) {
    fs.mkdirSync(`${outPath}/1x1`)
    fs.writeFileSync(`${outPath}/1x1/${fileName}`, image)
  } else {
    fs.writeFileSync(`${outPath}/1x1/${fileName}`, image)
  }
}

module.exports = SpliterIchiIchi
