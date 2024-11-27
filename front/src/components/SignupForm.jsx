import { useState } from "react";

import handleFormSubmit from "../hooks/useFormSubmit"

export default function SignupForm() {
  let [formData, setFormData] = {
    firstName: '', 
    lastName: '',
    email: '', 
    phone: '',
    password: ''
  };


  const handleChange = (event) => {
    let {name, value} = event.target;
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  const handleSubmit = (event) => {
    handleFormSubmit(event, submitTo);
  }

  return (
    <div className="SignupForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">SignUp</button>
      </form>
    </div>
  )
}