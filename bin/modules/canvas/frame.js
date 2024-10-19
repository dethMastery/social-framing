const { createCanvas, Image } = require('canvas')
const fs = require('fs')

const roundedImage = require('./Components/RoundImage')
const hexToRgbA = require('./Components/HexToRGBA')

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

async function FrameBased(image, size) {
  let sizeMod = []
  let returnBuffer = ''

  if (size == '3x2') {
    sizeMod = [3250, 2165]
  } else if (size == '1x1') {
    sizeMod = [1080, 1080]
  }

  const canvas = createCanvas(sizeMod[0], sizeMod[1])
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#2e2f2f'
  ctx.fillRect(0, 0, sizeMod[0], sizeMod[1])

  const cut = await ImageCut(image, sizeMod)

  const img = new Image()
  img.src = cut

  ctx.save()
  roundedImage(ctx, 20, 20, sizeMod[0] - 40, sizeMod[1] - 40, 10)
  ctx.clip()
  ctx.drawImage(img, 20, 20, sizeMod[0] - 40, sizeMod[1] - 40)
  ctx.restore()

  ctx.save()
  let fontSize = 50
  let watermarkText = 'fe6e6f'

  ctx.font = `${fontSize}px Atlantic Future`
  ctx.fillStyle = hexToRgbA('#fe6e6f')

  ctx.fillText(
    watermarkText,
    sizeMod[0] - 20 - 10 - ctx.measureText(watermarkText).width,
    sizeMod[1] - 20 - 10
  )
  ctx.restore()

  returnBuffer = canvas.toBuffer('image/jpeg')

  return returnBuffer
}

module.exports = FrameBased
