export interface BeadColor {
  id: string
  name: string
  hex: string
  brand: BrandType
  code: string
}

export type BrandType = 'artkal' | 'hama' | 'perler'

export interface GridCell {
  color: BeadColor | null
}

export type GridData = GridCell[][]

export interface GridState {
  width: number
  height: number
  data: GridData
}

export interface Tool {
  type: 'brush' | 'eraser' | 'fill' | 'eyedropper'
}

export interface HistoryEntry {
  gridData: GridData
  timestamp: number
}

export interface ImageImportOptions {
  width: number
  height: number
  brand: BrandType
  dithering: boolean
  brightness: number
  contrast: number
}

export interface ExportOptions {
  format: 'png' | 'print'
  scale: number
  showGrid: boolean
  showColorCodes: boolean
}
