import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sendForm from "../utils/submitForm";
import axios from "../utils/api";
import ActivationForm from "../components/ActivationForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Dialog,
  Box,
  Button,
  TextField,
  FormGroup,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";

export default function Signup() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidSignUp, setIsValidSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (formData.email) {
      localStorage.setItem("userEmail", formData.email);
    }
  }, [formData.email]);

  const handleChange = (event) => {
    setError("");
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    try {
      await sendForm(event, "api/v1/signup", axios);
      setIsValidSignUp(true);
    } catch (error) {
      if (error.status === 400 || error.status === 409) {
        setError(error?.response?.data?.message || "");
      }
      console.error("Signup error:", error);
    }
  };

  return (
    <Box
      className="SignupForm"
      sx={{
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 500,
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Your Account
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Start your journey with MoBank today.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <form onSubmit={handleSubmit}>
          <FormGroup sx={{ gap: 2 }}>
            <TextField
              label="First Name"
              id="firstName"
              name="firstName"
              type="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              id="lastName"
              name="lastName"
              type="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Phone"
              id="phone"
              name="phone"
              type="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
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
            {error ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
              >
                {error}
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Send
              </Button>
            )}
          </FormGroup>
        </form>
      </Box>
      <ActivationForm
        open={isValidSignUp}
        setOpen={setIsValidSignUp}
        userInfo={formData}
      />
    </Box>
  );
}
