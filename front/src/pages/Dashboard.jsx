import ActivityTable from "../components/ActivityTable";
import UserInfo from "../components/UserInfo";
import TransferForm from "../components/TransferForm";
import { Stack, Button } from "@mui/material";
import { useAuthContext } from "../context/UserContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let { activeUser } = useAuthContext();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!activeUser?.user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="Dashboard">
      <Stack
        direction="row"
        alignItems="stretch"
        spacing={2}
        justifyContent={"space-around"}
      >
        <UserInfo />
        <Button onClick={handleOpen}>Send Money</Button>
        <TransferForm open={open} handleClose={handleClose} />
      </Stack>
      <ActivityTable />
    </div>
  );
}
