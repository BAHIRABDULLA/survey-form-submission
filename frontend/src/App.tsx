import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

import './App.css'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

function App() {

  return (
    
      <Router>
        <Routes>
          <Route path='/admin/login' element={<Login />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Home/>}  />
        </Routes>
      </Router>
    
  )
}

export default App
