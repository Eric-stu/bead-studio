# Bead Studio

拼豆图案编辑器 - 一个用于创建和编辑 Perler Bead 拼豆图案的桌面应用。

## 功能

- **图片转图纸** - 上传图片自动转换为拼豆图案，支持调整尺寸、亮度、对比度
- **手动编辑** - 画笔、橡皮擦、填充、取色器工具
- **三品牌色板** - 内置 Artkal（150色）、Hama（85色）、Perler（82色）色板，可切换和搜索
- **颜色统计** - 实时显示每种颜色的用量和总颗数
- **撤销/重做** - 支持 Ctrl+Z / Ctrl+Y，最多100步
- **缩放平移** - 滚轮缩放，右键拖拽平移
- **Floyd-Steinberg 抖动** - 可选的图像抖动算法，提升色彩过渡效果
- **导入历史** - 保存导入过的图片，可快速重新加载
- **导出 PNG** - 可配置缩放倍数、网格线、色号显示

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| B | 画笔 |
| E | 橡皮擦 |
| G | 填充 |
| I | 取色器 |
| Ctrl+Z | 撤销 |
| Ctrl+Y / Ctrl+Shift+Z | 重做 |
| 滚轮 | 缩放 |
| 右键拖拽 | 平移 |

## 技术栈

- Electron + Vite + React + TypeScript
- Tailwind CSS
- HTML Canvas 渲染引擎

## 开发

```bash
# 安装依赖
npm install

# 启动开发模式
npm run dev

# 构建打包
npm run build
```

## 截图

![Bead Studio](screenshot.png)

## 许可

MIT
