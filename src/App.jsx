import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/login/loginPage'
import Dashboard from './pages/coustomerPages/dashboard'

function App() {


  return (
    <>
     <BrowserRouter>
     <Toaster position='top-right'/>
     <Routes path="/*">
     <Route path="/" element={<LoginPage/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
