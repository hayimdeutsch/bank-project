import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import sendForm from "../utils/submitForm";
import { useAuthContext } from "../context/UserContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  Box,
  Dialog,
  FormGroup,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment
} from "@mui/material";


export default function LoginForm({open, handleClose, submitTo, next}) {
  let [ email, setEmail ] = useState('');
  let [ password, setPassword ] = useState('');
  let [error, setError] = useState('');
  let [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  let { login } = useAuthContext();

  const handleChange = (event) => {
    setError(null);
    let {name, value} = event.target;
    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  const handleSubmit = async (e) => {
    if (!email || !password) {
      setError("Email or Password are Incorrect");
    } else {
      try {
        let response = await sendForm(e, submitTo, axios);
        login({
          user: email,
          accessToken: response?.data?.accessToken,
          refreshToken: response?.data?.refreshToken
        });
        handleClose();
        navigate(next);
      } catch (error) {
        if (error?.response && 
          (error.response?.status === 400 || error.response.status === 422)) {
            setError("Email or Password are Inccorect");
        } else {
          setEmail('');
          setPassword('');
          alert("Login failed");
          navigate("/");
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
      <Box sx={{ padding: 4, maxWidth: 500, margin: "auto" }}>
        <Typography variant="h4" component="h2" gutterBottom >
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup sx={{gap: 2}}>
            <FormControl>
              <FormLabel htmlFor="email">
                Email
              </FormLabel>
              <TextField 
                id="email"
                name="email"
                type="email"
                value={email} 
                onChange={(e) => { setError(null); setEmail(e.target.value)}}
                size="small"
                fullWidth
                required
              />
            </FormControl>
          <FormControl >
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setError(null); setPassword(e.target.value)}}
                fullWidth
                required
                size="small"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

            </FormControl>
          </FormGroup>

          {error && (
            <Box sx={{ mt: 3, color: "error.main", textAlign: "center" }}>
              {error}
            </Box>
          )}

          <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                background:
                  "linear-gradient(90deg, #536dfe 0%, #82b1ff 100%)",
                color: "white",
              }}
            >
              Login
            </Button>
        </form>
      </Box>
    </Dialog>
  )
}


