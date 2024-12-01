import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/UserContext'
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm'

export default function Header() {
  let [ loggedIn, setLoggedIn ] = useState(false);
  let [ next, setNext ] = useState('/')
  let { pathname } = useLocation();
  let { logout } = useAuthContext();
  let navigate = useNavigate();  
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const hadleOpen = () => setIsLoggingIn(true)
  const handleClose = () => setIsLoggingIn(false);

  const handleClick = () => {
    logout();
    navigate("/");
  }

  useEffect(() => {
    switch (pathname) {
      case '/dashboard':
        setNext("/dashboard");
        setLoggedIn(true);
        break;
      case '/admin/panel':
        setNext("/admin/panel");
        setLoggedIn(true);
        break;
      default:
        setNext("/")
        setLoggedIn(false);
    }
  }, [pathname])

  return (
    <AppBar position="sticky" className="Header">      
        {
          loggedIn ?
          <Toolbar>
            <Button color={"inherit"} onClick={ handleClick }>Logout</Button>
          </Toolbar> 
              :
          <Toolbar>
            <Typography sx={{fontWeight: "bold"}} variant='h2' className='logo' >
              <NavLink to={next}>MO Bank</NavLink>
            </Typography>
            <Typography component={"div"} sx={{flexGrow: 1}} />
            <Button  color={"inherit"} onClick={hadleOpen}> Log In</Button>
            <LoginForm open={isLoggingIn} handleClose={handleClose} submitTo={"api/v1/login"} next={"/dashboard"} />
          </Toolbar>
        }
    </AppBar>

  );
}

