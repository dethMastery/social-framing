const { redBan, logReset } = require('../color')

async function canvasBased(filepath, size) {
  if (size == '3x2') {
    // Do Frame
    // Do Cut
  } else if ((size = '1x1')) {
    // Do Cut
    // Do Frame
  } else {
    console.log(`${redBan}Error: Invalid Size${logReset}`)
  }
}

module.exports = canvasBased
