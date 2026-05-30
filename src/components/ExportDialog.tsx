import { useState } from 'react'
import { ExportOptions } from '../types'

interface ExportDialogProps {
  onExport: (options: ExportOptions) => void
  onClose: () => void
}

export function ExportDialog({ onExport, onClose }: ExportDialogProps) {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'png',
    scale: 2,
    showGrid: true,
    showColorCodes: true,
  })

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-80 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-bead-border">
          <h2 className="text-sm font-semibold">导出</h2>
        </div>

        <div className="p-5 space-y-4">
          <label>
            <span className="text-[11px] text-gray-500 block mb-1">格式</span>
            <select
              value={options.format}
              onChange={e => setOptions(prev => ({ ...prev, format: e.target.value as 'png' | 'print' }))}
              className="w-full text-sm px-2 py-1.5 border border-bead-border rounded bg-white focus:outline-none focus:border-bead-accent"
            >
              <option value="png">PNG 图片</option>
            </select>
          </label>

          <label>
            <span className="text-[11px] text-gray-500 block mb-1">缩放倍数: {options.scale}x</span>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={options.scale}
              onChange={e => setOptions(prev => ({ ...prev, scale: +e.target.value }))}
              className="w-full"
            />
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.showGrid}
              onChange={e => setOptions(prev => ({ ...prev, showGrid: e.target.checked }))}
              className="rounded border-gray-300 text-bead-accent focus:ring-bead-accent"
            />
            <span className="text-xs text-gray-600">显示网格线</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.showColorCodes}
              onChange={e => setOptions(prev => ({ ...prev, showColorCodes: e.target.checked }))}
              className="rounded border-gray-300 text-bead-accent focus:ring-bead-accent"
            />
            <span className="text-xs text-gray-600">显示色号</span>
          </label>
        </div>

        <div className="px-5 py-3 border-t border-bead-border flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            取消
          </button>
          <button
            onClick={() => onExport(options)}
            className="px-4 py-1.5 text-xs bg-bead-accent text-white rounded-lg hover:bg-bead-accent-hover"
          >
            导出
          </button>
        </div>
      </div>
    </div>
  )
}
