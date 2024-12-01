import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default function Header() {
  let [ loggedIn, setLoggedIn ] = useState(false);
  let [ next, setNext ] = useState('/')
  let { pathname } = useLocation();

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
    <div className='Header'>
      <h1 className='Header logo'>
        <NavLink  to={next} className='logo'>Welcome to MoBank</NavLink>
      </h1>
      {
        loggedIn && <LogoutButton />
      }
    </div>
  );
}