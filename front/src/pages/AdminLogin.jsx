// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../utils/api";
// import sendForm from "../utils/submitForm";
// import { useAuthContext } from "../context/UserContext";

// import {
//   Box,
//   Dialog,
//   FormGroup,
//   FormControl,
//   FormLabel,
//   TextField,
//   Button,
//   Typography,
// } from "@mui/material";

// export default function AdminLogin() {
//   let [ email, setEmail ] = useState('');
//   let [ password, setPassword ] = useState('');
//   let [error, setError] = useState(null);
//   let navigate = useNavigate();
//   let { login } = useAuthContext();

//   const handleSubmit = async (e) => {
//     try {
//       let response = await sendForm(e, "../api/v1/admin/login", axios);
//       login({
//         user: formData?.email,
//         accessToken: response?.data?.accessToken,
//         refreshToken: response?.data?.refreshToken
//       });
//       handleClose();
//       navigate("/admin/panel");
//     } catch (error) {
//       console.log(error);
//       if (error?.response &&
//         (error.response?.status === 400 || error.response?.status === 403)) {
//           setError("Email or Password are Incorrect");
//       } else {
//         setFormData({
//           email: '',
//           password: ''
//         })
//         navigate("/")
//       }
//     }
//   }

//   return (
//     <Box
//     className="AdminLoginForm"
//     sx={{
//       backgroundColor: "background.default",
//       color: "text.primary",
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: 4,
//     }}
//   >
//     <Box
//       sx={{
//         backgroundColor: "background.paper",
//         padding: 4,
//         borderRadius: 2,
//         boxShadow: 3,
//         maxWidth: 500,
//         width: "100%",
//       }}
//     >
//         <Typography align="center" variant="h4" gutterBottom>
//           Admin Login
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <FormGroup>
//             <FormControl>
//               <FormLabel htmlFor="email">
//                 Email
//               </FormLabel>
//               <TextField
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => { setError(null); setEmail(e.target.value)}}
//                 fullWidth
//                 required
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel htmlFor="password">
//                 Password
//               </FormLabel>
//               <TextField
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => { setError(null); setPassword(e.target.value)}}
//                 fullWidth
//                 required
//               />
//             </FormControl>
//           </FormGroup>

//             {error && <Box sx={{my:2, color:"red"}} className="errorMsg">{error}</Box>}
//           <Button type="submit" fullWidth variant="contained" sx={{mt: 1}} >Login</Button>
//         </form>
//       </Box>
//     </Box>
//   )
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import submitForm from "../utils/submitForm";
import { useAuthContext } from "../context/UserContext";

import {
  Box,
  FormGroup,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleSubmit = async (e) => {
    try {
      let response = await submitForm(e, "../api/v1/admin/login", axios);
      login({
        user: email,
        accessToken: response?.data?.accessToken,
        refreshToken: response?.data?.refreshToken,
      });
      navigate("/admin/panel");
    } catch (error) {
      console.log(error);
      if (
        error?.response &&
        (error.response?.status === 400 || error.response?.status === 403)
      ) {
        setError("Email or password are incorrect");
      } else {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    }
  };

  return (
    <Box
      className="SignupForm"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
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
        <Typography align="center" variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup sx={{ gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                size="small"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setError(null);
                  setEmail(e.target.value);
                }}
                fullWidth
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setError(null);
                  setPassword(e.target.value);
                }}
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
              background: "linear-gradient(90deg, #536dfe 0%, #82b1ff 100%)",
              color: "white",
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}
