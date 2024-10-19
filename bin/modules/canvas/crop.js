const { createCanvas, Image } = require('canvas')
const fs = require('fs')

async function ImageCut(image, size) {
  let returnBuffer = ''

  const canvas = createCanvas(size[0], size[1])
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#444444'
  ctx.fillRect(0, 0, size[0], size[1])

  const imageCall = fs.readFileSync(image).toString('base64')

  var img = new Image()
  img.src = `data:image/jpeg;base64,${imageCall}`

  let imgWidth = img.naturalWidth
  let imgHeight = img.naturalHeight

  let percent

  if (size[0] == size[1]) {
    if (imgWidth < imgHeight) {
      percent = (size[0] * 100) / imgWidth
    } else {
      percent = (size[0] * 100) / imgHeight
    }
  } else {
    if (imgWidth < imgHeight) {
      percent = (size[0] * 100) / imgHeight
    } else {
      percent = (size[0] * 100) / imgWidth
    }
  }

  let scaledSize = [(imgWidth * percent) / 100, (imgHeight * percent) / 100]
  let pos = []

  if (size[0] == size[1]) {
    if (scaledSize[0] < scaledSize[1]) {
      pos = [0, -(scaledSize[1] / 4)]
    } else {
      pos = [-(scaledSize[1] / 4), 0]
    }
  } else {
    if (scaledSize[0] < scaledSize[1]) {
      pos = [scaledSize[0] / 2 - size[0] / 2, 0]
    } else {
      pos = [0, 0]
    }
  }

  ctx.drawImage(img, pos[0], pos[1], scaledSize[0], scaledSize[1])

  returnBuffer = canvas.toBuffer('image/jpeg')

  return returnBuffer
}

module.exports = ImageCut
