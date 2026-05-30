type ToolType = 'brush' | 'eraser' | 'fill' | 'eyedropper'

interface ToolbarProps {
  tool: ToolType
  onToolChange: (tool: ToolType) => void
  gridWidth: number
  gridHeight: number
  onNewGrid: (w: number, h: number) => void
  onImport: () => void
  onExport: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
}

const TOOLS: { id: ToolType; label: string; key: string; icon: string }[] = [
  { id: 'brush', label: '画笔', key: 'B', icon: '🖌' },
  { id: 'eraser', label: '橡皮擦', key: 'E', icon: '🧹' },
  { id: 'fill', label: '填充', key: 'G', icon: '🪣' },
  { id: 'eyedropper', label: '取色', key: 'I', icon: '💉' },
]

const PRESETS = [
  { w: 29, h: 29, label: '29x29 小板' },
  { w: 58, h: 58, label: '58x58 中板' },
  { w: 116, h: 116, label: '116x116 大板' },
]

export function Toolbar({ tool, onToolChange, gridWidth, gridHeight, onNewGrid, onImport, onExport, onUndo, onRedo, canUndo, canRedo }: ToolbarProps) {
  return (
    <div className="w-14 bg-bead-panel border-r border-bead-border flex flex-col items-center py-3 gap-1">
      {TOOLS.map(t => (
        <button
          key={t.id}
          title={`${t.label} (${t.key})`}
          onClick={() => onToolChange(t.id)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${
            tool === t.id
              ? 'bg-bead-accent text-white shadow-md'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          {t.icon}
        </button>
      ))}

      <div className="w-8 h-px bg-bead-border my-2" />

      <button
        title="撤销 (Ctrl+Z)"
        onClick={onUndo}
        disabled={!canUndo}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ↩
      </button>
      <button
        title="重做 (Ctrl+Y)"
        onClick={onRedo}
        disabled={!canRedo}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ↪
      </button>

      <div className="w-8 h-px bg-bead-border my-2" />

      <button
        title="导入图片"
        onClick={onImport}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg hover:bg-gray-100 text-gray-600"
      >
        📷
      </button>
      <button
        title="导出"
        onClick={onExport}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg hover:bg-gray-100 text-gray-600"
      >
        💾
      </button>

      <div className="flex-1" />

      <div className="text-[10px] text-gray-400 text-center leading-tight">
        {gridWidth}x{gridHeight}
      </div>
    </div>
  )
}
