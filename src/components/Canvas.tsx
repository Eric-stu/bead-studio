import { useRef, useEffect, useState, useCallback } from 'react'
import { BeadColor, GridData } from '../types'
import { GridRenderer, RenderOptions } from '../core/renderer'

interface CanvasProps {
  grid: GridData
  gridWidth: number
  gridHeight: number
  selectedColor: BeadColor
  tool: 'brush' | 'eraser' | 'fill' | 'eyedropper'
  onCellAction: (x: number, y: number) => void
}

export function Canvas({ grid, gridWidth, gridHeight, selectedColor, tool, onCellAction }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<GridRenderer | null>(null)
  const [cellSize, setCellSize] = useState(24)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState({ x: -1, y: -1 })
  const [isDragging, setIsDragging] = useState(false)
  const [isPainting, setIsPainting] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 })
  const [resizeTick, setResizeTick] = useState(0)

  // Refs for latest state (used by ResizeObserver)
  const gridRef = useRef(grid)
  const cellSizeRef = useRef(cellSize)
  const offsetRef = useRef(offset)
  const hoverRef = useRef(hover)
  gridRef.current = grid
  cellSizeRef.current = cellSize
  offsetRef.current = offset
  hoverRef.current = hover

  const buildOpts = useCallback((): RenderOptions => ({
    cellSize: cellSizeRef.current,
    offsetX: offsetRef.current.x,
    offsetY: offsetRef.current.y,
    showGrid: cellSizeRef.current >= 6,
    showColorCodes: cellSizeRef.current >= 20,
    hoverX: hoverRef.current.x,
    hoverY: hoverRef.current.y,
  }), [])

  const doRender = useCallback(() => {
    const renderer = rendererRef.current
    if (!renderer) return
    renderer.render(gridRef.current, buildOpts())
  }, [buildOpts])

  // Init renderer + ResizeObserver
  useEffect(() => {
    if (!canvasRef.current) return
    rendererRef.current = new GridRenderer(canvasRef.current)
    rendererRef.current.resize()

    const observer = new ResizeObserver(() => {
      rendererRef.current?.resize()
      setResizeTick(t => t + 1)
    })
    observer.observe(canvasRef.current)
    return () => observer.disconnect()
  }, [])

  // Center grid when dimensions change
  useEffect(() => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    const totalW = gridWidth * cellSize
    const totalH = gridHeight * cellSize
    setOffset({
      x: (rect.width - totalW) / 2,
      y: (rect.height - totalH) / 2,
    })
  }, [gridWidth, gridHeight, cellSize])

  // Render whenever grid, cellSize, offset, hover, or resizeTick changes
  useEffect(() => {
    const raf = requestAnimationFrame(doRender)
    return () => cancelAnimationFrame(raf)
  }, [grid, cellSize, offset, hover, resizeTick, doRender])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const rect = canvasRef.current!.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    const oldSize = cellSize
    const newSize = GridRenderer.clampCellSize(oldSize + (e.deltaY > 0 ? -2 : 2))
    if (newSize === oldSize) return

    const scale = newSize / oldSize
    setCellSize(newSize)
    setOffset(prev => ({
      x: mx - (mx - prev.x) * scale,
      y: my - (my - prev.y) * scale,
    }))
  }, [cellSize])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 2 || e.button === 1) {
      setIsDragging(true)
      dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
      return
    }

    if (e.button === 0 && rendererRef.current) {
      setIsPainting(true)
      const [gx, gy] = rendererRef.current.screenToGrid(e.clientX, e.clientY, cellSize, offset.x, offset.y)
      onCellAction(gx, gy)
    }
  }, [cellSize, offset, onCellAction])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: dragStart.current.ox + (e.clientX - dragStart.current.x),
        y: dragStart.current.oy + (e.clientY - dragStart.current.y),
      })
      return
    }

    if (rendererRef.current) {
      const [gx, gy] = rendererRef.current.screenToGrid(e.clientX, e.clientY, cellSize, offset.x, offset.y)
      setHover({ x: gx, y: gy })

      if (isPainting) {
        onCellAction(gx, gy)
      }
    }
  }, [isDragging, isPainting, cellSize, offset, onCellAction])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsPainting(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHover({ x: -1, y: -1 })
    setIsDragging(false)
    setIsPainting(false)
  }, [])

  const cursorClass = isDragging ? 'cursor-grabbing' : tool === 'eraser' ? 'cursor-cell' : tool === 'eyedropper' ? 'cursor-crosshair' : tool === 'fill' ? 'cursor-pointer' : 'cursor-crosshair'

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${cursorClass}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onContextMenu={e => e.preventDefault()}
    />
  )
}
