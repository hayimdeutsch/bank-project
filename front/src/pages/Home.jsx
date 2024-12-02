import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
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
                  <Button sx={{mt: 3}} onClick={handleClick} variant={"contained"} align="center">
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
