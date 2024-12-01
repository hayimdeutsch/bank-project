import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/UserContext'

export default function LogoutButton() {
  let { logout } = useAuthContext();
  let navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  }
  return (
    <div className='LougoutButton'>
      <button onClick={ handleClick }>
        Logout
      </button>
    </div>
  )
}