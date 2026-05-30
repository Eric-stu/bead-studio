import { BeadColor } from '../types'

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
}

export function findNearestColor(
  targetHex: string,
  palette: BeadColor[],
  excludedIds?: Set<string>
): BeadColor {
  const [tr, tg, tb] = hexToRgb(targetHex)
  let nearest = palette[0]
  let minDist = Infinity

  for (const color of palette) {
    if (excludedIds?.has(color.id)) continue
    const [cr, cg, cb] = hexToRgb(color.hex)
    const dist = colorDistance(tr, tg, tb, cr, cg, cb)
    if (dist < minDist) {
      minDist = dist
      nearest = color
    }
  }
  return nearest
}

export function matchImageToPalette(
  pixels: [number, number, number, number][],
  width: number,
  height: number,
  palette: BeadColor[],
  dithering: boolean
): (BeadColor | null)[][] {
  const result: (BeadColor | null)[][] = []
  const errorBuffer: number[][][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => [0, 0, 0])
  )

  for (let y = 0; y < height; y++) {
    result[y] = []
    for (let x = 0; x < width; x++) {
      const idx = y * width + x
      const [r, g, b, a] = pixels[idx]

      if (a < 128) {
        result[y][x] = null
        continue
      }

      let nr = Math.max(0, Math.min(255, r + errorBuffer[y][x][0]))
      let ng = Math.max(0, Math.min(255, g + errorBuffer[y][x][1]))
      let nb = Math.max(0, Math.min(255, b + errorBuffer[y][x][2]))

      const nearest = findNearestColor(
        `#${Math.round(nr).toString(16).padStart(2, '0')}${Math.round(ng).toString(16).padStart(2, '0')}${Math.round(nb).toString(16).padStart(2, '0')}`,
        palette
      )
      result[y][x] = nearest

      if (dithering) {
        const [er, eg, eb] = hexToRgb(nearest.hex)
        const errR = nr - er
        const errG = ng - eg
        const errB = nb - eb

        const distribute = (dx: number, dy: number, factor: number) => {
          const nx = x + dx
          const ny = y + dy
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            errorBuffer[ny][nx][0] += errR * factor
            errorBuffer[ny][nx][1] += errG * factor
            errorBuffer[ny][nx][2] += errB * factor
          }
        }

        distribute(1, 0, 7 / 16)
        distribute(-1, 1, 3 / 16)
        distribute(0, 1, 5 / 16)
        distribute(1, 1, 1 / 16)
      }
    }
  }
  return result
}
