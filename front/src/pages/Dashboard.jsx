import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityTable from "../components/ActivityTable";
import UserInfo from "../components/UserInfo";
import TransferForm from "../components/TransferForm";
import { useAuthContext } from "../context/UserContext";
import { Box, Typography } from "@mui/material";

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
    <Box className="Dashboard" sx={{ alignContent: "center" }}>
      <Typography variant="h3">Dashboard</Typography>
      <Box
        display={"flex"}
        flexDirection="row"
        alignItems="stretch"
        spacing={2}
        justifyContent={"space-evenly"}
      >
        <UserInfo />
        <TransferForm setRefresh={setRefresh} />
      </Box>
      <ActivityTable refresh={refresh} />
    </Box>
  );
}
