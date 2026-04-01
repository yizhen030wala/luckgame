import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// 暂时使用相对路径导入样式（Storybook 设计系统样式）
import '../node_modules/@jennychen/sideproject-ds/dist/sideproject-ds.css'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
