
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LayoutDefault from './components/Layouts/LayoutDefault/LayoutDefault'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Logout from './pages/Logout/Logout'
import Register from './pages/Register/Register'
import Search from './pages/Search/Search'
import InfoEmployer from './pages/InfoEmployer/InfoEmployer'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route index={true} element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout/' element={<Logout />} />
          <Route path='/search' element={<Search />} />
          <Route path='/company/:id' element={<InfoEmployer />} />

        </Route>
      </Routes>

    </BrowserRouter >
  )
}

export default App
