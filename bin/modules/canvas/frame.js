const { createCanvas, Image } = require('canvas')

const roundedImage = require('./Components/RoundImage')
const hexToRgbA = require('./Components/HexToRGBA')
const ImageCut = require('./crop')

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
