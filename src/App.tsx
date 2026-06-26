import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import './App.css'

const App: React.FC = () => {
  const location = useLocation()
  
  // Проверяем, находимся ли мы на странице админки
  const isAdminPage = location.pathname === '/admin'

  return (
    <div className="App">
      {/* Показываем Navbar только если это НЕ админка */}
      {!isAdminPage && <Navbar />}
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      
      {/* Показываем Footer только если это НЕ админка */}
      {!isAdminPage && <Footer />}
    </div>
  )
}

export default App