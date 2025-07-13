import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/login/loginPage';
import Home from './pages/coustomerPages/home';
import RegisterPage from './pages/login/registerPage';
import AdminPage from './pages/adminPages/adminPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes path="/*">
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup/*" element={<RegisterPage />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
