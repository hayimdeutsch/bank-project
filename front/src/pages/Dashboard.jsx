import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityTable from "../components/ActivityTable";
import UserInfo from "../components/UserInfo";
import TransferForm from "../components/TransferForm";
import Balance from "../components/Balance";
import { useAuthContext } from "../context/UserContext";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Dashboard() {
  let { activeUser } = useAuthContext();
  let navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!activeUser?.user) {
      navigate("/");
    }
  }, []);

  return (
    <Box
      className="Dashboard"
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
    >
      <Typography my={4} variant="h3">
        Dashboard
      </Typography>
      <Grid
        container
        spacing={10}
        alignContent="center"
        justifyContent={"space-between"}
        sx={{
          backgroundColor: "background.default",
          color: "text.primary",
          width: "85%",
        }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <UserInfo refresh={refresh} />
        </Grid>
        <Grid height={"100%"} size={{ xs: 12, md: 6 }}>
          <TransferForm setRefresh={setRefresh} />
        </Grid>
      </Grid>
      <ActivityTable refresh={refresh} />
    </Box>
  );
}
