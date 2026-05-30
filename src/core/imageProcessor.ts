import { BeadColor, BrandType, ImageImportOptions } from '../types'
import { matchImageToPalette } from './colorMatcher'

export function pixelateImage(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  brightness: number,
  contrast: number
): [number, number, number, number][] {
  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d')!

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
  const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight)
  const pixels: [number, number, number, number][] = []

  for (let i = 0; i < imageData.data.length; i += 4) {
    let r = imageData.data[i]
    let g = imageData.data[i + 1]
    let b = imageData.data[i + 2]
    const a = imageData.data[i + 3]

    // Apply brightness
    r = Math.max(0, Math.min(255, r + brightness * 255))
    g = Math.max(0, Math.min(255, g + brightness * 255))
    b = Math.max(0, Math.min(255, b + brightness * 255))

    // Apply contrast
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
    r = Math.max(0, Math.min(255, factor * (r - 128) + 128))
    g = Math.max(0, Math.min(255, factor * (g - 128) + 128))
    b = Math.max(0, Math.min(255, factor * (b - 128) + 128))

    pixels.push([r, g, b, a])
  }
  return pixels
}

export function processImage(
  img: HTMLImageElement,
  options: ImageImportOptions,
  palette: BeadColor[]
): (BeadColor | null)[][] {
  const pixels = pixelateImage(img, options.width, options.height, options.brightness, options.contrast)
  return matchImageToPalette(pixels, options.width, options.height, palette, options.dithering)
}
