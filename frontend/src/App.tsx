import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (

    <Router>
      <Routes>
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>

  )
}

export default App
