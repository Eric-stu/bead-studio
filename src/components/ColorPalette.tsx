import { useState } from 'react'
import { BeadColor, BrandType } from '../types'

interface ColorPaletteProps {
  palette: BeadColor[]
  brand: BrandType
  selectedColor: BeadColor
  onBrandChange: (brand: BrandType) => void
  onColorSelect: (color: BeadColor) => void
}

const BRAND_LABELS: Record<BrandType, string> = {
  artkal: 'Artkal',
  hama: 'Hama',
  perler: 'Perler',
}

export function ColorPalette({ palette, brand, selectedColor, onBrandChange, onColorSelect }: ColorPaletteProps) {
  const [filter, setFilter] = useState('')

  const filtered = filter
    ? palette.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.code.toLowerCase().includes(filter.toLowerCase()))
    : palette

  return (
    <div className="flex flex-col h-1/2 border-b border-bead-border">
      <div className="px-3 py-2 border-b border-bead-border">
        <div className="flex gap-1 mb-2">
          {(['artkal', 'hama', 'perler'] as BrandType[]).map(b => (
            <button
              key={b}
              onClick={() => onBrandChange(b)}
              className={`flex-1 text-xs py-1 rounded transition-all ${
                brand === b
                  ? 'bg-bead-accent text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {BRAND_LABELS[b]}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="搜索颜色..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full text-xs px-2 py-1 border border-bead-border rounded bg-white focus:outline-none focus:border-bead-accent"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-5 gap-1">
          {filtered.map(color => (
            <button
              key={color.id}
              title={`${color.name} (${color.code})`}
              onClick={() => onColorSelect(color)}
              className={`aspect-square rounded-md border-2 transition-all relative group ${
                selectedColor.id === color.id
                  ? 'border-bead-accent scale-110 shadow-md z-10'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              <span className="absolute inset-x-0 bottom-0 text-[7px] text-center leading-none bg-black/50 text-white rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity truncate px-0.5">
                {color.code}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected color preview */}
      <div className="px-3 py-2 border-t border-bead-border flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg border border-bead-border shadow-inner"
          style={{ backgroundColor: selectedColor.hex }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium truncate">{selectedColor.name}</div>
          <div className="text-[10px] text-gray-400">{selectedColor.code} · {selectedColor.hex}</div>
        </div>
      </div>
    </div>
  )
}
