import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        paddingTop: 2, 
        mt: 4,
      }}
    >
      <Grid container spacing={8} paddingLeft={8} paddingRight={8}>
        <Grid size={{ xs: 4, sm: 8, md: 8 }}>
          <Typography variant="h6" gutterBottom>
            About MoBank
          </Typography>
          <Typography variant="body2">
          At MoBank, we believe banking should be simple, secure, and tailored to your unique needs. 
  Our mission is to empower individuals and businesses by providing cutting-edge financial solutions 
  designed for modern life. Whatever your needs, MoBank is here to help every step of the way.
          </Typography>
        </Grid>

        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body2">
            Email: support@mobank.com
          </Typography>
          <Typography variant="body2">
            Phone: 03 - INFINITY
          </Typography>
          <Typography variant="body2">
            Address: Jabotinsky St 1, Ramat Gan, IL
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          pt: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} MoBank. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

