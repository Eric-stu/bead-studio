import { useState, useRef, useCallback } from 'react'
import { BeadColor, ImageImportOptions } from '../types'
import { processImage } from '../core/imageProcessor'

interface ImageImportProps {
  palette: BeadColor[]
  onImport: (data: (BeadColor | null)[][]) => void
  onClose: () => void
}

interface HistoryItem {
  id: string
  name: string
  dataUrl: string
  width: number
  height: number
  timestamp: number
}

const HISTORY_KEY = 'bead-studio-image-history'
const MAX_HISTORY = 20

function loadHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  } catch {
    return []
  }
}

function saveHistory(items: HistoryItem[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, MAX_HISTORY)))
}

export function ImageImport({ palette, onImport, onClose }: ImageImportProps) {
  const [options, setOptions] = useState<ImageImportOptions>({
    width: 29,
    height: 29,
    brand: 'artkal',
    dithering: false,
    brightness: 0,
    contrast: 0,
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory)
  const [showHistory, setShowHistory] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      setPreview(src)
      const img = new Image()
      img.onload = () => {
        setImageEl(img)
        const aspect = img.width / img.height
        if (aspect > 1) {
          setOptions(prev => ({ ...prev, height: Math.round(prev.width / aspect) }))
        } else {
          setOptions(prev => ({ ...prev, width: Math.round(prev.height * aspect) }))
        }
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }, [handleFile])

  const handleImport = useCallback(() => {
    if (!imageEl || !preview) return

    const item: HistoryItem = {
      id: Date.now().toString(),
      name: fileName || '未命名',
      dataUrl: preview,
      width: options.width,
      height: options.height,
      timestamp: Date.now(),
    }
    const newHistory = [item, ...history.filter(h => h.dataUrl !== item.dataUrl)].slice(0, MAX_HISTORY)
    setHistory(newHistory)
    saveHistory(newHistory)

    const data = processImage(imageEl, options, palette)
    onImport(data)
  }, [imageEl, preview, fileName, options, palette, onImport, history])

  const handleHistorySelect = useCallback((item: HistoryItem) => {
    if (!item.dataUrl) return
    setPreview(item.dataUrl)
    setFileName(item.name)
    setOptions(prev => ({ ...prev, width: item.width, height: item.height }))
    const img = new Image()
    img.onload = () => setImageEl(img)
    img.src = item.dataUrl
    setShowHistory(false)
  }, [])

  const handleClearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={e => e.stopPropagation()}>
      <div
        className="bg-white rounded-xl shadow-2xl w-[560px] max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-bead-border flex items-center justify-between shrink-0">
          <h2 className="text-sm font-semibold">导入图片转拼豆图纸</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="关闭"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Drop zone */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer hover:border-bead-accent transition-colors"
            onClick={() => fileRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            {preview ? (
              <div className="flex items-center gap-3">
                <img src={preview} className="max-h-24 rounded" alt="preview" />
                <div className="text-left">
                  <div className="text-xs font-medium truncate max-w-[200px]">{fileName}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">点击更换图片</div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-400">
                <div className="text-2xl mb-2">🖼</div>
                点击或拖拽图片到这里
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
              }}
            />
          </div>

          {/* History */}
          {history.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-gray-500">历史记录</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-[10px] text-bead-accent hover:underline"
                  >
                    {showHistory ? '收起' : `展开 (${history.length})`}
                  </button>
                  <button
                    onClick={handleClearHistory}
                    className="text-[10px] text-red-400 hover:text-red-600 hover:underline"
                  >
                    清除
                  </button>
                </div>
              </div>
              {showHistory && (
                <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                  {history.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleHistorySelect(item)}
                      className="border border-bead-border rounded-lg overflow-hidden hover:border-bead-accent transition-colors group"
                    >
                      <img src={item.dataUrl} className="w-full h-14 object-cover" alt={item.name} />
                      <div className="px-1 py-0.5 text-[8px] text-gray-500 truncate group-hover:text-bead-accent">
                        {item.name}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Size */}
          <div className="flex gap-3">
            <label className="flex-1">
              <span className="text-[11px] text-gray-500 block mb-1">宽度 (颗)</span>
              <input
                type="number"
                min={5}
                max={200}
                value={options.width}
                onChange={e => setOptions(prev => ({ ...prev, width: +e.target.value }))}
                className="w-full text-sm px-2 py-1.5 border border-bead-border rounded focus:outline-none focus:border-bead-accent"
              />
            </label>
            <label className="flex-1">
              <span className="text-[11px] text-gray-500 block mb-1">高度 (颗)</span>
              <input
                type="number"
                min={5}
                max={200}
                value={options.height}
                onChange={e => setOptions(prev => ({ ...prev, height: +e.target.value }))}
                className="w-full text-sm px-2 py-1.5 border border-bead-border rounded focus:outline-none focus:border-bead-accent"
              />
            </label>
          </div>

          {/* Presets */}
          <div className="flex gap-2">
            {[
              { w: 29, h: 29, label: '29x29' },
              { w: 58, h: 58, label: '58x58' },
              { w: 116, h: 58, label: '116x58' },
              { w: 116, h: 116, label: '116x116' },
            ].map(p => (
              <button
                key={p.label}
                onClick={() => setOptions(prev => ({ ...prev, width: p.w, height: p.h }))}
                className="text-[10px] px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-600"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Brightness / Contrast */}
          <div className="flex gap-3">
            <label className="flex-1">
              <span className="text-[11px] text-gray-500 block mb-1">亮度</span>
              <input
                type="range"
                min={-1}
                max={1}
                step={0.05}
                value={options.brightness}
                onChange={e => setOptions(prev => ({ ...prev, brightness: +e.target.value }))}
                className="w-full"
              />
            </label>
            <label className="flex-1">
              <span className="text-[11px] text-gray-500 block mb-1">对比度</span>
              <input
                type="range"
                min={-128}
                max={128}
                step={1}
                value={options.contrast}
                onChange={e => setOptions(prev => ({ ...prev, contrast: +e.target.value }))}
                className="w-full"
              />
            </label>
          </div>

          {/* Dithering */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.dithering}
              onChange={e => setOptions(prev => ({ ...prev, dithering: e.target.checked }))}
              className="rounded border-gray-300 text-bead-accent focus:ring-bead-accent"
            />
            <span className="text-xs text-gray-600">启用 Floyd-Steinberg 抖动</span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-bead-border flex justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            取消
          </button>
          <button
            onClick={handleImport}
            disabled={!imageEl}
            className="px-4 py-1.5 text-xs bg-bead-accent text-white rounded-lg hover:bg-bead-accent-hover disabled:opacity-40 disabled:cursor-not-allowed"
          >
            导入
          </button>
        </div>
      </div>
    </div>
  )
}
