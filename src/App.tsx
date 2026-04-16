import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { VerifyPage } from './pages/VerifyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="*" element={<Navigate to="/verify" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
