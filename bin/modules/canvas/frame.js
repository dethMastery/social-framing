const { createCanvas } = require('canvas')

function FrameBased(image, size) {
  let size = []
  let returnBuffer = ''

  if (size == '3x2') {
    size = [3250, 2165]
  } else if (size == '1x1') {
    size = [1080, 1080]
  }

  const canvas = createCanvas(size[0], size[1])
  const ctx = canvas.getContext('2d')
}
