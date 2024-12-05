// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../utils/api";
// import {
//   Dialog,
//   Box,
//   Button,
//   TextField,
//   FormGroup,
//   Typography,
// } from "@mui/material";

// export default function ActivationForm({ open, setOpen, userInfo }) {
//   const emailRef = useRef();
//   const [code, setCode] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [failed, setFailed] = useState(false);
//   const [resendStatus, setResendStatus] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("userInfo", userInfo);
//     if (!emailRef.current) {
//       emailRef.current = userInfo.email;
//     }
//     console.log("emailRef", emailRef);
//   }, [open]);

//   useEffect(() => {
//     return () => {
//       const deletePendingUser = async () => {
//         try {
//           const email = emailRef.current;
//           console.log("emailRef", emailRef);
//           console.log("email", email);
//           console.log();
//           if (!email) {
//             console.warn("No email to delete pending user");
//             return;
//           }

//           await axios.post("api/v1/signup/cancel", { email });

//           console.log("Pending user deleted successfully");
//         } catch (error) {
//           console.error("Error deleting user:", error);
//         }
//       };

//       deletePendingUser();
//     };
//   }, []);

//   // useEffect(() => {
//   //   return () => {
//   //     const deletePendingUser = async () => {
//   //       if (!success && !failed) {
//   //         try {
//   //           console.log(userInfo);
//   //           await axios.post("api/v1/signup/cancel", { email: userInfo.email });
//   //         } catch (err) {
//   //           console.log(err);
//   //         }
//   //       }
//   //     };
//   //     deletePendingUser();
//   //   };
//   // }, []);

//   const handleResendCode = async () => {
//     try {
//       setResendStatus("Resending...");
//       await axios.post("/api/v1/signup/confirmation/resend", {
//         email: userInfo.email,
//       });
//       setResendStatus("Code resent successfully!");
//     } catch (err) {
//       console.error("Error resending code:", err);
//       setResendStatus("Failed to resend code. Please try again later.");
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.post("/api/v1/signup/confirmation", {
//         confirmationCode: code,
//         email: userInfo.email,
//       });
//       setSuccess(true);
//       setError("");
//       setCode("");
//     } catch (err) {
//       if (err.status === 410) {
//         setFailed(true);
//       } else if (err.status === 400) {
//         setError("Wrong code, try again!");
//       } else if (err.status === 403) {
//         setError("Confirmation code expired. Request a new code.");
//       } else {
//         setError("Confirmation failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       sx={{ "& .MuiPaper-root": { backgroundColor: "background.paper" } }}
//     >
//       <Box sx={{ padding: 4, maxWidth: 400, margin: "auto" }}>
//         <Typography variant="h6" gutterBottom>
//           {success
//             ? "Account Activated!"
//             : failed
//             ? "Session Expired"
//             : "Confirm Your Account"}
//         </Typography>

//         {success ? (
//           <>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               Your account has been successfully activated. You must go to the
//               home page to log in.
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={() => {
//                 setOpen(false);
//                 navigate("/");
//               }}
//               fullWidth
//               sx={{
//                 mt: 1,
//                 background: "linear-gradient(90deg, #536dfe 0%, #82b1ff 100%)",
//                 color: "white",
//               }}
//             >
//               Go to Homepage
//             </Button>
//           </>
//         ) : failed ? (
//           <>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               You took too long to confirm your account. Please sign up again to
//               complete your registration.
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={() => {
//                 setOpen(false);
//                 navigate("/signup");
//               }}
//               fullWidth
//               sx={{
//                 mt: 1,
//                 background: "linear-gradient(90deg, #536dfe 0%, #82b1ff 100%)",
//                 color: "white",
//               }}
//             >
//               Go to Sign Up
//             </Button>
//           </>
//         ) : (
//           <>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               Enter the confirmation code sent to your email.
//             </Typography>
//             <form onSubmit={handleSubmit}>
//               <FormGroup sx={{ gap: 2 }}>
//                 <TextField
//                   label="Confirmation Code"
//                   id="confirmationCode"
//                   name="confirmationCode"
//                   value={code}
//                   onChange={(e) => {
//                     setError("");
//                     setCode(e.target.value);
//                   }}
//                   required
//                   fullWidth
//                 />
//               </FormGroup>
//               {error ? (
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   color="secondary"
//                   size="large"
//                   sx={{ mt: 3 }}
//                 >
//                   {error}
//                 </Button>
//               ) : (
//                 <Button
//                   size="large"
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                   sx={{ mt: 3 }}
//                 >
//                   Confirm Account
//                 </Button>
//               )}
//             </form>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{ marginTop: 2 }}
//             >
//               Didn’t receive a code?{" "}
//               <Button
//                 variant="text"
//                 onClick={handleResendCode}
//                 sx={{ textTransform: "none" }}
//               >
//                 Resend Code
//               </Button>
//             </Typography>
//             {resendStatus && (
//               <Typography variant="body2" color="text.secondary">
//                 {resendStatus}
//               </Typography>
//             )}
//           </>
//         )}
//       </Box>
//     </Dialog>
//   );
// }

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

export default function ActivationForm({ open, setOpen, userInfo }) {
  const emailRef = useRef();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [resendStatus, setResendStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = async () => {
      emailRef.current = localStorage.getItem("userEmail") || userInfo.email;
      if (emailRef.current) {
        try {
          await axios.post("api/v1/signup/cancel", { email: emailRef.current });
          localStorage.setItem("userEmail", "");

          console.log("Pending user deleted on tab close");
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      const deletePendingUser = async () => {
        if (emailRef.current) {
          try {
            await axios.post("api/v1/signup/cancel", {
              email: emailRef.current,
            });
            console.log("Pending user deleted successfully");
          } catch (error) {
            console.error("Error deleting user:", error);
          } finally {
            localStorage.removeItem("userEmail"); // Always remove the email from localStorage
          }
        }
      };

      deletePendingUser();
      window.removeEventListener("beforeunload", handleBeforeUnload); // Cleanup listener
    };
  }, []);

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
      await axios.post("/api/v1/signup/confirmation", {
        confirmationCode: code,
        email: userInfo.email,
      });
      setSuccess(true);
      setError("");
      setCode("");
    } catch (err) {
      if (err.status === 410) {
        setFailed(true);
      } else if (err.status === 400) {
        setError("Wrong code, try again!");
      } else if (err.status === 403) {
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
