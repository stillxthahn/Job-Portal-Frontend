
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LayoutDefault from './components/Layouts/LayoutDefault/LayoutDefault'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Logout from './pages/Logout/Logout'
import Register from './pages/Register/Register'
import Search from './pages/Search/Search'
import InfoEmployer from './pages/InfoEmployer/InfoEmployer'
import ScrollToTop from './helpers/ScrollToTop'
import JobDetails from './pages/JobDetails/JobDetails'
import ApplyForm from './components/ApplyForm/ApplyForm'
import LayoutAdmin from './components/Layouts/LayoutAdmin/LayoutAdmin'
import PrivateRoute from './components/Layouts/LayoutAdmin/PrivateRoute'
import DashBoard from './pages/DashBoard/DashBoard'
import AdminInfoCompany from './pages/AdminInfoCompany/AdminInfoCompany'
import JobManage from './pages/JobManage/JobManage'
import CVManage from './pages/CVManage/CVManage'
import CreateJob from './pages/JobManage/CreateJob'
import AdminInfoJob from './pages/AdminInfoJob/AdminInfoJob'
import CVDetails from './pages/CVManage/CVDetails'
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route index={true} element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout/' element={<Logout />} />
          <Route path='/search' element={<Search />} />
          <Route path='/company/:id' element={<InfoEmployer />} />
          <Route path='/company/:id' element={<InfoEmployer />} />
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='/apply' element={<ApplyForm />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<LayoutAdmin />}>
            <Route path='/admin' element={<DashBoard />} />
            <Route path='/info-company' element={<AdminInfoCompany />} />
            <Route path='/job-manage' element={<JobManage />} />
            <Route path='/create-job' element={<CreateJob />} />
            <Route path='/detail-job/:id' element={<AdminInfoJob />} />
            <Route path='/cv-manage' element={<CVManage />} />
            <Route path='/detail-cv/:id' element={<CVDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
