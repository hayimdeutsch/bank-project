import { useState } from "react";
import { useNavigate } from "react-router-dom";

import sendForm from "../utils/sendForm";

export default function LoginForm({submitTo, next}) {
  let [formData, setFormData] = useState( {
    email: '',
    password: ''
  });
  let [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleChange = (event) => {
    setError(null);
    let {name, value} = event.target;
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  const handleSubmit = async (e) => {
    try {
      let response = await sendForm(e, submitTo);
      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      console.log(accessToken, refreshToken);
      sessionStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('loggedIn', 'true');
      navigate(next);
    } catch (error) {
      if (error?.response && error?.response?.status === 400) {
          setError("Email or Password are Inccorect");
      } else {
        setFormData({
          email: '',
          password: ''
        })
        navigate("/")
      }
    }
  }

  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

          <button type="submit">Login</button>
      </form>
      {error && <div className="errorMsg">{error}</div>}
      <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
      </div> 
    </div>
  )
}