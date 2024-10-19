const { createCanvas, Image } = require('canvas')
const fs = require('fs')
const { greenSuccess, logReset } = require('../../color')

async function SpliterSanNi(image, outPath, fileName) {
  const size = [1080, 1080]
  const gap = 5

  const canvas = createCanvas(size[0], size[1])
  const ctx = canvas.getContext('2d')

  const img = new Image()
  img.src = image

  for (let i = 0; i < 6; i++) {
    let imageBuffer = ''

    if (i < 3) {
      ctx.drawImage(
        img,
        0 - (1080 + 5) * i,
        0,
        img.naturalWidth,
        img.naturalHeight
      )
    } else {
      ctx.drawImage(
        img,
        0 - (1080 + gap) * (i - 3),
        -img.naturalHeight + size[1],
        img.naturalWidth,
        img.naturalHeight
      )
    }

    imageBuffer = canvas.toBuffer('image/jpeg')

    let newFileName = `${fileName.split('.')[0]}_${i}.${fileName.split('.')[1]}`

    if (!fs.existsSync(`${outPath}/3x2`)) {
      fs.mkdirSync(`${outPath}/3x2`)
      fs.writeFileSync(`${outPath}/3x2/${newFileName}`, imageBuffer)
    } else {
      fs.writeFileSync(`${outPath}/3x2/${newFileName}`, imageBuffer)
    }

    console.log(`${greenSuccess}${newFileName} is created!${logReset}`)
  }

  console.log('')
}

module.exports = SpliterSanNi
