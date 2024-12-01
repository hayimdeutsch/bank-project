import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import sendForm from "../utils/submitForm";
import { useAuthContext } from "../context/UserContext";

import {
  Dialog,
  FormGroup,
  FormControl,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";


export default function LoginForm({open, handleClose, submitTo, next}) {
  let [formData, setFormData] = useState( {
    email: '',
    password: ''
  });
  let [error, setError] = useState('');
  let navigate = useNavigate();
  let { login } = useAuthContext();

  const handleChange = (event) => {
    setError(null);
    let {name, value} = event.target;
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  const handleSubmit = async (e) => {
    if (!formData.email || !formData.password) {
      setError("Email or Password are Incorrect");
    } else {
      try {
        let response = await sendForm(e, submitTo, axios);
        login({
          user: formData?.email,
          accessToken: response?.data?.accessToken,
          refreshToken: response?.data?.refreshToken
        });
        handleClose();
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
  }

  return (
    <Dialog 
      className="LoginForm"
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiPaper-root": { backgroundColor: "background.paper" } }}>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControl>
            <FormLabel htmlFor="email">
              Email
            </FormLabel>
            <TextField 
              id="email" 
              name="email"
              type="email"
              value={formData.email} 
              onChange={handleChange} 
              fullWidth
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">
              Password
            </FormLabel>
            <TextField 
              id="password" 
              name="password"
              type="password"
              value={formData.password} 
              onChange={handleChange} 
              fullWidth
              required
            />
          </FormControl>
        </FormGroup>

        <Button type="submit" fullWidth variant="contained" sx={{mt: 2}} >Login</Button>
      </form>
      {error && <div className="errorMsg">{error}</div>}

    </Dialog>
  )
}


