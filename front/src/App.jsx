import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';
import './App.css'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import PageNotFound from './pages/PageNotFound';
import UserContextProvider from './context/UserContext';
import { Box } from '@mui/material'

function App() {
  return (
    <>
      <UserContextProvider>
      <Box
            id="root"
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.default",
            }}
            >
          <Router>
          <Header />
          <Box className="main-content">
              <Routes>
                <Route exact path='/' Component={Home} />
                <Route exact path='/dashboard' Component={Dashboard} />
                <Route exact path='/signup' Component={Signup} />
                <Route exact path='/admin/login' Component={AdminLogin} />
                <Route exact path='/admin/panel' Component={AdminPanel} />
                <Route path='*' Component={PageNotFound} />
              </Routes>
          </Box>
          <Footer className="foot" />
            </Router>
        </Box>
      </UserContextProvider>
    </>
  )
}

export default App
