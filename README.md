# 運氣占卜遊戲 (Fortune Divination Game)

## 📋 項目簡介

一個網頁端的互動式運氣占卜遊戲，提供兩種占卜模式讓用戶測試今日運勢。

## 📁 項目結構

```
luckygame/
├── public/
│   ├── images/          # 占卜圖片資源
│   └── gifs/           # GIF 動畫資源
├── src/
│   ├── pages/          # 頁面組件
│   │   ├── HomePage.tsx
│   │   ├── NormalDivinationPage.tsx
│   │   └── AccurateDivinationPage.tsx
│   ├── components/     # 可重用組件
│   ├── hooks/          # 自定義 Hooks
│   ├── utils/          # 工具函數
│   ├── types/          # TypeScript 類型定義
│   ├── styles/         # 全局樣式
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```

### 構建
```bash
npm run build
```

## 🎨 使用技術

- **框架**: React 18 + TypeScript
- **構建**: Vite
- **路由**: React Router DOM v6
- **設計系統**: @jennychen/sideproject-ds (Storybook)
- **樣式**: CSS Modules + Design Tokens

## 📦 設計系統

本項目使用 Storybook 設計系統中的組件：

- Button (primary, secondary, ghost 等變體)
- Card
- Input
- Typography
- Icon
- Badge

所有樣式和 tokens 已集成，詳見 Storybook 文檔。

## 💾 數據存儲

使用 LocalStorage 保存用戶數據：
- 一般占卜的當日統計
- 準確占卜的結果和冷卻時間

## 📸 資源位置

將以下文件放在指定目錄：

- **圖片**: `public/images/`
  - option-left.gif
  - option-right.gif

- **GIF 動畫**: `public/gifs/`
  - cat-wakeup.gif
  - 其他動畫資源

## 🔗 功能頁面

- `/` - 首頁 (模式選擇)
- `/normal` - 一般占卜  
- `/accurate` - 準確占卜
- `/result` - 結果頁面

## 🛠️ 開發指南

### 環境變量
如需要，在項目根目錄創建 `.env.local` 文件

### 類型檢查
所有代碼使用 TypeScript，類型安全優先

### 組件開發
使用 Storybook 中的現有組件，避免重複開發
