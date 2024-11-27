import { useState } from "react";
import { useNavigate } from "react-router-dom";

import handleFormSubmit from "../hooks/handleFormSubmit";

export default function LoginForm({submitTo, next}) {
  let [formData, setFormData] = useState( {
    email: '',
    password: ''
  });
  let navigate = useNavigate();


  const handleChange = (event) => {
    let {name, value} = event.target;
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  const handleSubmit = async (event) => {
    try {
      let res = await handleFormSubmit(event, submitTo);
      sessionStorage.setItem("accessToken", res.accessToken);
      console.log(res);
      navigate(next, {replace: true})
    } catch (err) {
      console.log(err);
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
      <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
      </div> 
    </div>
  )
}