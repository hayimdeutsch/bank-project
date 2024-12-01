// import LoginForm from "../components/LoginForm";
// import { Link } from "react-router-dom";
// import { Box, Typography} from '@mui/material'
// import Grid from '@mui/material/Grid2'

// export default function Home() {
//   return (

//       <Grid display={"flex"} flexDirection={"row"} alignItems={"center"} textAlign={"center"} padding={4} margin={"auto"} container spacing={2}>
//         <Grid size={{ xs: 6, md: 4 }} >
//       <LoginForm submitTo={"api/v1/login"} next={"/dashboard"}/>
//       <Box className="signupLink" sx={{ mt: 3 }}>
//         <Typography variant="body2">
//           Don’t have an account?{' '}
//           <Link color="primary" to="/signup">
//             Sign up here!
//           </Link>
//         </Typography>
//       </Box>
//       </Grid>
//       <Grid size={{ xs: 6, md: 8 }}>
//       <Typography variant="h4" component="h2" gutterBottom>
//         Banking That Works for You
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         Discover secure and innovative financial solutions designed to empower your goals. Join MoBank today and take control of your finances with ease.
//       </Typography>
//         </Grid>

//     </Grid>
//   );
// }


import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2'

export default function Home() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup")
  }
  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      justifyContent="center"
      sx={{
        padding: 4,
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >

      <Grid
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 4,
        }}
      >
         <Typography variant="h4" component="h2" gutterBottom>
          Banking That Works for You
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600 }}>
          Discover secure and innovative financial solutions designed to
          empower your goals. Join MoBank today and take control of your
          finances with ease.
        </Typography>
                  <Button onClick={handleClick} variant={"contained"} align="center">
            Join Now!
          </Button>
       </Grid> 
       <Grid
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 4,
        }}
      >      
        <img src="/OnlineBankingAnimation.png" alt="OnlineBankingCartoon" />
      </Grid>
    </Grid>
  );
}
