import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import {
  Dialog,
  Box,
  Button,
  TextField,
  FormGroup,
  Typography,
} from "@mui/material";

export default function ActivationForm({ open, setOpen }) {
  const emailRef = useRef();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [resendStatus, setResendStatus] = useState("");
  const navigate = useNavigate();

  const handleResendCode = async () => {
    try {
      setResendStatus("Resending...");
      const token = localStorage.getItem("registrationToken");
      const response = await axios.post("/signup/confirmation/resend", {
        token,
      });
      localStorage.setItem("registrationToken", response.data.token);
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
      const token = localStorage.getItem("registrationToken");
      console.log("token", token);
      await axios.post("/signup/confirmation", {
        confirmationCode: code,
        token,
      });
      localStorage.removeItem("registrationToken");
      setSuccess(true);
      setError("");
      setCode("");
    } catch (err) {
      if (err.status === 410) {
        setFailed(true);
      } else if (err.status === 400) {
        setError("Wrong code, try again!");
      } else if (err.status === 401) {
        setError("Confirmation code expired. Request a new code.");
      } else {
        setError("Confirmation failed. Please try again.");
      }
    }
  };

  return (
    <Dialog
      open={open}
      sx={{ "& .MuiPaper-root": { backgroundColor: "background.paper" } }}
    >
      <Box sx={{ padding: 4, maxWidth: 400, margin: "auto" }}>
        <Typography variant="h6" gutterBottom>
          {success
            ? "Account Activated!"
            : failed
            ? "Session Expired"
            : "Confirm Your Account"}
        </Typography>

        {success ? (
          <>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Your account has been successfully activated. You must go to the
              home page to log in.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
                navigate("/");
              }}
              fullWidth
              sx={{
                mt: 1,
                background: "linear-gradient(90deg, #536dfe 0%, #82b1ff 100%)",
                color: "white",
              }}
            >
              Go to Homepage
            </Button>
          </>
        ) : failed ? (
          <>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              You took too long to confirm your account. Please sign up again to
              complete your registration.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
                navigate("/signup");
              }}
              fullWidth
              sx={{
                mt: 1,
                background: "linear-gradient(90deg, #536dfe 0%, #82b1ff 100%)",
                color: "white",
              }}
            >
              Go to Sign Up
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
