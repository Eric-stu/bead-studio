import { BeadColor, GridData } from '../types'

export interface RenderOptions {
  cellSize: number
  offsetX: number
  offsetY: number
  showGrid: boolean
  showColorCodes: boolean
  hoverX: number
  hoverY: number
}

const MIN_CELL_SIZE = 4
const MAX_CELL_SIZE = 80

export class GridRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private dpr: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.dpr = window.devicePixelRatio || 1
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect()
    const w = Math.floor(rect.width * this.dpr)
    const h = Math.floor(rect.height * this.dpr)
    if (w <= 0 || h <= 0) return
    this.canvas.width = w
    this.canvas.height = h
    this.ctx.scale(this.dpr, this.dpr)
  }

  render(grid: GridData, options: RenderOptions) {
    const { width, height } = this.canvas.getBoundingClientRect()
    const ctx = this.ctx
    const { cellSize, offsetX, offsetY, showGrid, showColorCodes, hoverX, hoverY } = options

    ctx.clearRect(0, 0, width, height)

    const gridRows = grid.length
    if (gridRows === 0) return
    const gridCols = grid[0].length

    const startX = Math.max(0, Math.floor(-offsetX / cellSize))
    const startY = Math.max(0, Math.floor(-offsetY / cellSize))
    const endX = Math.min(gridCols, Math.ceil((width - offsetX) / cellSize))
    const endY = Math.min(gridRows, Math.ceil((height - offsetY) / cellSize))

    // Fill entire visible grid area with empty color first
    const gridPixelW = (endX - startX) * cellSize
    const gridPixelH = (endY - startY) * cellSize
    ctx.fillStyle = '#f1f5f9'
    ctx.fillRect(startX * cellSize + offsetX, startY * cellSize + offsetY, gridPixelW, gridPixelH)

    // Batch colored cells by color to minimize fillStyle changes
    const colorBuckets = new Map<string, { px: number; py: number; color: BeadColor }[]>()

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const cell = grid[y][x]
        if (cell.color) {
          const hex = cell.color.hex
          let bucket = colorBuckets.get(hex)
          if (!bucket) {
            bucket = []
            colorBuckets.set(hex, bucket)
          }
          bucket.push({
            px: x * cellSize + offsetX,
            py: y * cellSize + offsetY,
            color: cell.color,
          })
        }
      }
    }

    // Draw all cells of each color in one batch
    for (const [hex, cells] of colorBuckets) {
      ctx.fillStyle = hex
      for (const { px, py } of cells) {
        ctx.fillRect(px, py, cellSize, cellSize)
      }
    }

    // Grid lines as a single path
    if (showGrid && cellSize >= 6) {
      ctx.beginPath()
      ctx.strokeStyle = '#cbd5e1'
      ctx.lineWidth = 0.5

      for (let x = startX; x <= endX; x++) {
        const px = x * cellSize + offsetX
        ctx.moveTo(px, startY * cellSize + offsetY)
        ctx.lineTo(px, endY * cellSize + offsetY)
      }
      for (let y = startY; y <= endY; y++) {
        const py = y * cellSize + offsetY
        ctx.moveTo(startX * cellSize + offsetX, py)
        ctx.lineTo(endX * cellSize + offsetX, py)
      }
      ctx.stroke()
    }

    // Color codes - only draw when cells are large enough
    if (showColorCodes && cellSize >= 24) {
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const fontSize = Math.max(8, cellSize * 0.3)
      ctx.font = `${fontSize}px monospace`

      for (const [, cells] of colorBuckets) {
        for (const { px, py, color } of cells) {
          ctx.fillStyle = this.getTextColor(color.hex)
          ctx.fillText(color.code, px + cellSize / 2, py + cellSize / 2)
        }
      }
    }

    // Hover highlight
    if (hoverX >= 0 && hoverX < gridCols && hoverY >= 0 && hoverY < gridRows) {
      const px = hoverX * cellSize + offsetX
      const py = hoverY * cellSize + offsetY
      ctx.strokeStyle = '#6366f1'
      ctx.lineWidth = 2
      ctx.strokeRect(px, py, cellSize, cellSize)
    }
  }

  private getTextColor(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return lum > 0.5 ? '#1a1a2e' : '#ffffff'
  }

  screenToGrid(clientX: number, clientY: number, cellSize: number, offsetX: number, offsetY: number): [number, number] {
    const rect = this.canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const gx = Math.floor((x - offsetX) / cellSize)
    const gy = Math.floor((y - offsetY) / cellSize)
    return [gx, gy]
  }

  static clampCellSize(size: number): number {
    return Math.max(MIN_CELL_SIZE, Math.min(MAX_CELL_SIZE, size))
  }
}
