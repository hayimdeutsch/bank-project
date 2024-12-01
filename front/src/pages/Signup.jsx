import { useState } from "react";
import sendForm from "../utils/submitForm"
import axios from '../utils/api'

import {
  Dialog,
  Box,
  Button,
  TextField,
  FormLabel,
  FormControl,
  FormGroup
} from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function Signup() {
  let [formData, setFormData] = useState({
    firstName: '', 
    lastName: '',
    email: '', 
    phone: '',
    password: ''
  });
  const [isValidSignUp, setIsValidSignUp] = useState(false);
  // const handleOpen = () => setIsValidSignUp(true);
  const handleClose = () => setIsValidSignUp(true);

  const handleChange = (event) => {
    let {name, value} = event.target;
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  const handleSubmit = async (event) => {
    try {
      let response = await sendForm(event, "api/v1/signup", axios);
      setIsValidSignUp(true);
    } catch (error) {

    }
  }

  return (
    <div className="SignupForm">
      <h2>Sign Up </h2>
      <form onSubmit={handleSubmit}>
        <FormGroup >
          <FormControl>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <TextField
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <TextField
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <TextField
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>

          <Button type="submit" variant="outlined" fullWidth>
            Sign Up
          </Button>
        </FormGroup>
      </form>
        <ActivationForm open={ isValidSignUp } handleClose={handleClose} />
    </div>
  )
}

function ActivationForm({open, handleClose}) {
  let [code, setCode] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      let response = await sendForm(event, "api/v1/signup/confirmation", axios);
      handleClose();
      navigate("/")
    } catch (error) {
      
    }
  }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        shouldCloseOnOverlayClick={false}
      >
        <Box style={{ margin: "25%", padding: 1 }}>
          <form onSubmit={handleSubmit}>
            <FormGroup >
              <FormControl>
                <FormLabel htmlFor="confirmationCode">Password</FormLabel>
                <TextField
                  id="confirmationCode"
                  name="confirmationCode"
                  type="password"
                  value={ code }
                  onChange={(e) => setCode(e.target.value)}
                  required
                  fullWidth
                />
              </FormControl>

              <Button type="submit" variant="outlined" fullWidth>
                Confirm Account
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Dialog>
  )
}
