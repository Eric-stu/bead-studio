import { BeadColor } from '../types'

interface StatsPanelProps {
  stats: {
    entries: { color: BeadColor; count: number }[]
    total: number
  }
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="flex flex-col h-1/2">
      <div className="px-3 py-2 border-b border-bead-border">
        <div className="text-xs font-medium text-gray-700">用量统计</div>
        <div className="text-[10px] text-gray-400 mt-0.5">
          共 {stats.total} 颗 · {stats.entries.length} 种颜色
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {stats.entries.length === 0 ? (
          <div className="flex items-center justify-center h-full text-xs text-gray-300">
            开始绘制后显示统计
          </div>
        ) : (
          <div className="divide-y divide-bead-border">
            {stats.entries.map(({ color, count }) => (
              <div key={color.id} className="flex items-center gap-2 px-3 py-1.5">
                <div
                  className="w-4 h-4 rounded border border-bead-border flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] truncate">{color.name}</div>
                  <div className="text-[9px] text-gray-400">{color.code}</div>
                </div>
                <div className="text-xs font-mono text-gray-600 tabular-nums">
                  {count}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
