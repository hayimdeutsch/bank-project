import { useEffect, useState } from "react";
import formatCurrency from "../utils/formatCurrency";
import useProtectedFetch from "../hooks/useProtectedFetch";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function UserInfo({ refresh }) {
  let [details, setDetails] = useState({ userInfo: {} });
  let {
    loading: loadingInfo,
    error: infoError,
    data: userInfo,
  } = useProtectedFetch("/user/info");
  let {
    loading: loadingBalance,
    error: balanceError,
    data: balance,
  } = useProtectedFetch("/user/balance", refresh);

  return (
    // <Box sx={{ width: "100%", height: "100%" }}>
    //   {loadingInfo && <p>Loading...</p>}
    <>
      {userInfo && (
        <Box
          sx={{
            borderRadius: 3,
            border: 1,
            padding: 2,
            height: "220px",
            width: "100%",
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ alignSelf: "center", fontWeight: "bold" }}
            variant="h5"
          >
            User Info
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${userInfo?.userInfo?.firstName} ${userInfo?.userInfo?.lastName}`}
                  primaryTypographyProps={{
                    sx: { textAlign: "right", fontWeight: "bold" },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AlternateEmailIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${userInfo?.userInfo?.email}`}
                  primaryTypographyProps={{
                    sx: { textAlign: "right", fontWeight: "bold" },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${userInfo?.userInfo?.phone}`}
                  primaryTypographyProps={{
                    sx: { textAlign: "right", fontWeight: "bold" },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
      {/* { error && <p> {`Error - ${error?.msg}`}</p> } */}
      {/* </Box> */}
    </>
  );
}
