import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sendForm from "../utils/submitForm";
import axios from "../utils/api";
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

function ActivationForm({ open, setOpen, userInfo }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendStatus, setResendStatus] = useState("");
  const navigate = useNavigate();

  const handleResendCode = async () => {
    try {
      setResendStatus("Resending...");
      await axios.post("/api/v1/signup/confirmation/resend", {
        email: userInfo.email,
      });
      setResendStatus("Code resent successfully!");
    } catch (err) {
      console.error("Error resending code:", err);
      setResendStatus("Failed to resend code. Please try again later.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendForm(event, "api/v1/signup/confirmation", axios);
      setSuccess(true);
      setError("");
      setCode("");
    } catch (err) {
      console.error("Activation error:", err);
      if (err.response?.data?.message === "Code expired") {
        setError("The activation code has expired. You must sign up again.");
      } else {
        setError("Confirmation failed. Please try again.");
      }
    }
  };

  const handleNavigateHome = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      sx={{ "& .MuiPaper-root": { backgroundColor: "background.paper" } }}
    >
      <Box sx={{ padding: 4, maxWidth: 400, margin: "auto" }}>
        <Typography variant="h6" gutterBottom>
          {success ? "Account Activated!" : "Confirm Your Account"}
        </Typography>

        {success ? (
          <>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Your account has been successfully activated. You must go to home
              page to log in.
            </Typography>
            <Button
              variant="contained"
              onClick={handleNavigateHome}
              fullWidth
              sx={{
                background: "linear-gradient(90deg, #536dfe 0%, #82b1ff 100%)",
                color: "white",
              }}
            >
              Go to Homepage
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Enter the confirmation code sent to your email.
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormGroup sx={{ gap: 2 }}>
                <TextField
                  label="Confirmation Code"
                  id="confirmationCode"
                  name="confirmationCode"
                  value={code}
                  onChange={(e) => {
                    setError("");
                    setCode(e.target.value);
                  }}
                  required
                  fullWidth
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
                  Confirm Account
                </Button>
              )}
            </form>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 2 }}
            >
              Didn’t receive a code?{" "}
              <Button
                variant="text"
                onClick={handleResendCode}
                sx={{ textTransform: "none" }}
              >
                Resend Code
              </Button>
            </Typography>
            {resendStatus && (
              <Typography variant="body2" color="text.secondary">
                {resendStatus}
              </Typography>
            )}
          </>
        )}
      </Box>
    </Dialog>
  );
}
