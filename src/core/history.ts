import { GridData, HistoryEntry } from '../types'

const MAX_HISTORY = 100

export class HistoryManager {
  private undoStack: HistoryEntry[] = []
  private redoStack: HistoryEntry[] = []

  push(gridData: GridData) {
    this.undoStack.push({
      gridData: JSON.parse(JSON.stringify(gridData)),
      timestamp: Date.now(),
    })
    if (this.undoStack.length > MAX_HISTORY) {
      this.undoStack.shift()
    }
    this.redoStack = []
  }

  undo(currentGridData: GridData): GridData | null {
    if (this.undoStack.length === 0) return null
    this.redoStack.push({
      gridData: JSON.parse(JSON.stringify(currentGridData)),
      timestamp: Date.now(),
    })
    const entry = this.undoStack.pop()!
    return entry.gridData
  }

  redo(currentGridData: GridData): GridData | null {
    if (this.redoStack.length === 0) return null
    this.undoStack.push({
      gridData: JSON.parse(JSON.stringify(currentGridData)),
      timestamp: Date.now(),
    })
    const entry = this.redoStack.pop()!
    return entry.gridData
  }

  canUndo(): boolean {
    return this.undoStack.length > 0
  }

  canRedo(): boolean {
    return this.redoStack.length > 0
  }

  clear() {
    this.undoStack = []
    this.redoStack = []
  }
}
