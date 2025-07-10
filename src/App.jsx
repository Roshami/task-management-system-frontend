import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/login/loginPage'
import Home from './pages/coustomerPages/home'

function App() {


  return (
    <>
     <BrowserRouter>
     <Toaster position='top-right'/>
     <Routes path="/*">
     <Route path="/" element={<LoginPage/>}/>
     <Route path="/home/*" element={<Home/>}/>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
