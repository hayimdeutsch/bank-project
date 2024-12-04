import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sendForm from "../utils/submitForm";
import axios from "../utils/api";

import {
  Dialog,
  Box,
  Button,
  TextField,
  FormLabel,
  FormControl,
  FormGroup,
  Typography,
  Divider,
} from "@mui/material";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isValidSignUp, setIsValidSignUp] = useState(false);
  const handleClose = () => setIsValidSignUp(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    try {
      await sendForm(event, "api/v1/signup", axios);
      setIsValidSignUp(true);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <Box
      className="SignupForm"
      sx={{
        backgroundColor: "background.default",
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
            {["firstName", "lastName", "email", "phone", "password"].map(
              (field) => (
                <FormControl key={field}>
                  <TextField
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    id={field}
                    name={field}
                    type={field === "password" ? "password" : "text"}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </FormControl>
              )
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: "linear-gradient(90deg, #536dfe 0%, #82b1ff 100%)",
                color: "white",
              }}
            >
              Sign Up
            </Button>
          </FormGroup>
        </form>
      </Box>
      <ActivationForm open={isValidSignUp} handleClose={handleClose} />
    </Box>
  );
}

function ActivationForm({ open, handleClose }) {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      await sendForm(event, "api/v1/signup/confirmation", axios);
      handleClose();
      navigate("/");
    } catch (error) {
      console.error("Activation error:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiPaper-root": { backgroundColor: "background.paper" } }}
    >
      <Box sx={{ padding: 4, maxWidth: 400, margin: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Confirm Your Account
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Enter the confirmation code sent to your email.
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup sx={{ gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="confirmationCode">
                Confirmation Code
              </FormLabel>
              <TextField
                id="confirmationCode"
                name="confirmationCode"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                fullWidth
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: "linear-gradient(90deg, #536dfe 0%, #82b1ff 100%)",
                color: "white",
              }}
            >
              Confirm Account
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Dialog>
  );
}
