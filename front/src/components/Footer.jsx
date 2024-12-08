import { Box, Divider, Typography, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box
      className="footer"
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        pt: 2,
        px: 10,
        mt: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Box sx={{ maxWidth: "85%" }}>
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
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          display: "flex",
          maxWidth: "85%",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          py: 1,
          mx: "auto",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} MoBank. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={4}>
          <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
            Email: support@mobank.com
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
            Phone: 03 - INFINITY
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
            Address: Jabotinsky St 1, Ramat Gan, IL
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
