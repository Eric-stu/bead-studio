import { useState, useCallback, useEffect } from 'react'
import { BeadColor, BrandType, GridData, GridCell, ExportOptions } from './types'
import { artkalColors } from './data/artkal'
import { hamaColors } from './data/hama'
import { perlerColors } from './data/perler'
import { mard741Colors } from './data/mard741'
import { HistoryManager } from './core/history'
import { Canvas } from './components/Canvas'
import { Toolbar } from './components/Toolbar'
import { ColorPalette } from './components/ColorPalette'
import { StatsPanel } from './components/StatsPanel'
import { ImageImport } from './components/ImageImport'
import { ExportDialog } from './components/ExportDialog'

const BRAND_PALETTES: Record<BrandType, BeadColor[]> = {
  artkal: artkalColors,
  hama: hamaColors,
  perler: perlerColors,
  mard741: mard741Colors,
}

const DEFAULT_WIDTH = 29
const DEFAULT_HEIGHT = 29

function createEmptyGrid(w: number, h: number): GridData {
  return Array.from({ length: h }, () =>
    Array.from({ length: w }, () => ({ color: null }))
  )
}

type ToolType = 'brush' | 'eraser' | 'fill' | 'eyedropper'

export default function App() {
  const [gridWidth, setGridWidth] = useState(DEFAULT_WIDTH)
  const [gridHeight, setGridHeight] = useState(DEFAULT_HEIGHT)
  const [grid, setGrid] = useState<GridData>(() => createEmptyGrid(DEFAULT_WIDTH, DEFAULT_HEIGHT))
  const [brand, setBrand] = useState<BrandType>('artkal')
  const [selectedColor, setSelectedColor] = useState<BeadColor>(artkalColors[0])
  const [tool, setTool] = useState<ToolType>('brush')
  const [showImageImport, setShowImageImport] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [history] = useState(() => new HistoryManager())

  const palette = BRAND_PALETTES[brand]

  const handleCellAction = useCallback((x: number, y: number) => {
    if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) return

    if (tool === 'eyedropper') {
      setGrid(prev => {
        const target = prev[y][x].color
        if (target) setSelectedColor(target)
        return prev
      })
      return
    }

    setGrid(prev => {
      history.push(prev)
      const next = prev.map(row => row.map(cell => ({ ...cell })))

      if (tool === 'brush') {
        next[y][x] = { color: selectedColor }
      } else if (tool === 'eraser') {
        next[y][x] = { color: null }
      } else if (tool === 'fill') {
        const targetColor = prev[y][x].color
        if (targetColor?.id === selectedColor.id) return prev
        floodFill(next, x, y, gridWidth, gridHeight, targetColor, selectedColor)
      }
      return next
    })
  }, [tool, selectedColor, gridWidth, gridHeight, history])

  const handleUndo = useCallback(() => {
    setGrid(prev => history.undo(prev) ?? prev)
  }, [history])

  const handleRedo = useCallback(() => {
    setGrid(prev => history.redo(prev) ?? prev)
  }, [history])

  const handleNewGrid = useCallback((w: number, h: number) => {
    setGridWidth(w)
    setGridHeight(h)
    setGrid(createEmptyGrid(w, h))
    history.clear()
  }, [history])

  const handleImageImport = useCallback((data: (BeadColor | null)[][]) => {
    const h = data.length
    const w = data[0]?.length ?? 0
    setGridWidth(w)
    setGridHeight(h)
    const newGrid: GridData = data.map(row =>
      row.map(color => ({ color }))
    )
    setGrid(newGrid)
    history.clear()
  }, [history])

  const handleBrandChange = useCallback((newBrand: BrandType) => {
    setBrand(newBrand)
    setSelectedColor(BRAND_PALETTES[newBrand][0])
  }, [])

  const handleExport = useCallback((options: ExportOptions) => {
    exportGrid(grid, gridWidth, gridHeight, options)
    setShowExport(false)
  }, [grid, gridWidth, gridHeight])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo() }
        if (e.key === 'z' && e.shiftKey) { e.preventDefault(); handleRedo() }
        if (e.key === 'y') { e.preventDefault(); handleRedo() }
      }
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'b') setTool('brush')
      if (e.key === 'e') setTool('eraser')
      if (e.key === 'g') setTool('fill')
      if (e.key === 'i') setTool('eyedropper')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleUndo, handleRedo])

  const stats = computeStats(grid, gridWidth, gridHeight)

  return (
    <div className="h-screen flex flex-col bg-bead-bg select-none">
      {/* Title bar drag region */}
      <div className="h-8 bg-bead-panel border-b border-bead-border flex items-center px-4 -webkit-app-region-drag">
        <span className="text-xs font-medium text-gray-500">Bead Studio</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <Toolbar
          tool={tool}
          onToolChange={setTool}
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          onNewGrid={handleNewGrid}
          onImport={() => setShowImageImport(true)}
          onExport={() => setShowExport(true)}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={history.canUndo()}
          canRedo={history.canRedo()}
        />

        <div className="flex-1 relative overflow-hidden">
          <Canvas
            grid={grid}
            gridWidth={gridWidth}
            gridHeight={gridHeight}
            selectedColor={selectedColor}
            tool={tool}
            onCellAction={handleCellAction}
          />
        </div>

        <div className="w-72 border-l border-bead-border bg-bead-panel flex flex-col">
          <ColorPalette
            palette={palette}
            brand={brand}
            selectedColor={selectedColor}
            onBrandChange={handleBrandChange}
            onColorSelect={setSelectedColor}
          />
          <StatsPanel stats={stats} />
        </div>
      </div>

      {showImageImport && (
        <ImageImport
          palette={palette}
          onImport={handleImageImport}
          onClose={() => setShowImageImport(false)}
        />
      )}

      {showExport && (
        <ExportDialog
          onExport={handleExport}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  )
}

function floodFill(
  grid: GridData, x: number, y: number, w: number, h: number,
  targetColor: BeadColor | null, fillColor: BeadColor
) {
  const targetId = targetColor?.id ?? null
  const stack: [number, number][] = [[x, y]]
  const visited = new Set<string>()

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!
    const key = `${cx},${cy}`
    if (visited.has(key)) continue
    if (cx < 0 || cx >= w || cy < 0 || cy >= h) continue
    const cellId = grid[cy][cx].color?.id ?? null
    if (cellId !== targetId) continue

    visited.add(key)
    grid[cy][cx] = { color: fillColor }
    stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1])
  }
}

function computeStats(grid: GridData, w: number, h: number) {
  const counts = new Map<string, { color: BeadColor; count: number }>()
  let total = 0

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = grid[y][x].color
      if (c) {
        const existing = counts.get(c.id)
        if (existing) {
          existing.count++
        } else {
          counts.set(c.id, { color: c, count: 1 })
        }
        total++
      }
    }
  }

  return { entries: Array.from(counts.values()).sort((a, b) => b.count - a.count), total }
}

function exportGrid(grid: GridData, w: number, h: number, options: ExportOptions) {
  const scale = options.scale
  const cellSize = 20 * scale
  const padding = 40 * scale
  const canvasW = w * cellSize + padding * 2
  const canvasH = h * cellSize + padding * 2

  const canvas = document.createElement('canvas')
  canvas.width = canvasW
  canvas.height = canvasH
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvasW, canvasH)

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x * cellSize + padding
      const py = y * cellSize + padding
      const cell = grid[y][x]

      if (cell.color) {
        ctx.fillStyle = cell.color.hex
        ctx.fillRect(px, py, cellSize, cellSize)
      } else {
        ctx.fillStyle = '#f1f5f9'
        ctx.fillRect(px, py, cellSize, cellSize)
      }

      if (options.showGrid && cellSize >= 8) {
        ctx.strokeStyle = '#e2e8f0'
        ctx.lineWidth = 1
        ctx.strokeRect(px, py, cellSize, cellSize)
      }

      if (options.showColorCodes && cell.color && cellSize >= 24) {
        const r = parseInt(cell.color.hex.slice(1, 3), 16)
        const g = parseInt(cell.color.hex.slice(3, 5), 16)
        const b = parseInt(cell.color.hex.slice(5, 7), 16)
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        ctx.fillStyle = lum > 0.5 ? '#1a1a2e' : '#ffffff'
        ctx.font = `${Math.max(8, cellSize * 0.3)}px monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(cell.color.code, px + cellSize / 2, py + cellSize / 2)
      }
    }
  }

  const link = document.createElement('a')
  link.download = 'bead-pattern.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
