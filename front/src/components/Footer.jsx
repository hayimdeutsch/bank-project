import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Footer = () => {
  return (
    <Box
      className="foot"
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        paddingTop: 2,
        px: 10,
        mt: 4,
      }}
    >
      <Grid container sx={{ px: 10 }} spacing={8}>
        <Grid size={{ xs: 4, sm: 8, md: 8 }}>
          <Typography variant="h6" gutterBottom>
            About MoBank
          </Typography>
          <Typography variant="body2">
            At MoBank, we believe banking should be simple, secure, and tailored
            to your unique needs. Our mission is to empower individuals and
            businesses by providing cutting-edge financial solutions designed
            for modern life. Whatever your needs, MoBank is here to help every
            step of the way.
          </Typography>
        </Grid>

        <Grid size={{ xs: 4, sm: 4, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
            Email: support@mobank.com
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
            Phone: 03 - INFINITY
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
            Address: Jabotinsky St 1, Ramat Gan, IL
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          pb: 1,
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
