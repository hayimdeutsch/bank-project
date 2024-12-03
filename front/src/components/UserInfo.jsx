import { useEffect, useState } from "react";
import useProtectedFetch from "../hooks/useProtectedFetch";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";

export default function UserInfo() {
  let [details, setDetails] = useState({ userInfo: {} });
  let { loading, error, data } = useProtectedFetch("api/v1/user/info");

  useEffect(() => {
    setDetails({ ...data });
  }, [data]);

  return (
    <Box>
      {loading && <p>Loading...</p>}
      {data && (
        <Box
          sx={{
            width: 1,
            borderRadius: 3,
            border: 1,
            padding: 1,
            height: "100%",
            backgroundColor: "background.paper",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${details?.userInfo?.firstName} ${details?.userInfo?.lastName}`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AlternateEmailIcon />
                </ListItemIcon>
                <ListItemText primary={`${details?.userInfo?.email}`} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={`   ${details?.userInfo?.phone}`} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
      {/* { error && <p> {`Error - ${error?.msg}`}</p> } */}
    </Box>
  );
}
