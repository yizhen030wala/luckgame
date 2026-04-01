import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import NormalDivinationPage from '@/pages/NormalDivinationPage'
import AccurateDivinationPage from '@/pages/AccurateDivinationPage'
import ResultPage from '@/pages/ResultPage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/normal" element={<NormalDivinationPage />} />
            <Route path="/accurate" element={<AccurateDivinationPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
