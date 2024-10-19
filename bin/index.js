const fs = require('fs')
const path = require('path')
const canvasBased = require('./modules/canvas/createImage')

async function mainFunction(filePath, size) {
  canvasBased(filePath, size)
}

module.exports = mainFunction
