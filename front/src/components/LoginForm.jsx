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
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";

export default function LoginForm({ open, setOpen, submitTo, next }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  let { login } = useAuthContext();

  const handleChange = (event) => {
    setError("");
    let { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    try {
      let response = await sendForm(e, submitTo, axios);
      login({
        user: email,
        accessToken: response?.data?.accessToken,
        refreshToken: response?.data?.refreshToken,
      });
      handleClose();
      navigate(next);
    } catch (error) {
      if (error?.response && error.status === 400) {
        setError("Email or Password are Inccorect");
      } else {
        setEmail("");
        setPassword("");
        alert("Login failed");
        navigate("/");
      }
    }
  };

  return (
    <Dialog
      className="LoginForm"
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiPaper-root": { backgroundColor: "background.paper" } }}
    >
      <Box sx={{ padding: 4, width: 375, margin: "auto" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup sx={{ gap: 3 }}>
            <TextField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              fullWidth
              required
            />
            <TextField
              label="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
              fullWidth
              required
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
          </FormGroup>
          {error ? (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 3 }}
            >
              {error}
            </Button>
          ) : (
            <Button
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Sign In
            </Button>
          )}
        </form>
      </Box>
    </Dialog>
  );
}
