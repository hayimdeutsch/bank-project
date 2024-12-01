import ActivityTable from "../components/ActivityTable";
import UserInfo from '../components/UserInfo';
import TransferForm from '../components/TransferForm'
import { Stack } from "@mui/material";
import { useAuthContext } from "../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let { activeUser } = useAuthContext();
  let navigate = useNavigate();

  useEffect(() => {
    if (!activeUser?.user) {
      navigate("/");
    }
  }, [])

  return (
    <div className="Dashboard"> 
      <Stack direction="row" alignItems="stretch" spacing={2} border={1} justifyContent={"space-around"} >
      <UserInfo />
      <TransferForm />
      </Stack>
      <ActivityTable />
    </div>
  );
}
