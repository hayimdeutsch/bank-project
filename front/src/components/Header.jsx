import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className='Header logo'>
      <NavLink to='/' className='logo'>Welcome to MoBank</NavLink>
    </div>
  );
}