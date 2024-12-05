import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/UserContext";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";

export default function Header() {
  let [loggedIn, setLoggedIn] = useState(false);
  let [next, setNext] = useState("/");
  let { pathname } = useLocation();
  let { logout } = useAuthContext();
  let navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleOpen = () => setIsLoggingIn(true);

  const handleClick = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setNext("/dashboard");
        setLoggedIn(true);
        break;
      case "/admin/panel":
        setNext("/admin/panel");
        setLoggedIn(true);
        break;
      default:
        setNext("/");
        setLoggedIn(false);
    }
  }, [pathname]);

  return (
    <AppBar sx={{ width: "100%" }} position="sticky" className="Header">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {loggedIn ? (
          <>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h2"
              className="logo"
            >
              <NavLink to={next}>MO Bank</NavLink>
            </Typography>
            <Button color={"inherit"} onClick={handleClick}>
              <Typography variant="h6">Logout</Typography>
            </Button>
          </>
        ) : (
          <>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h2"
              className="logo"
            >
              <NavLink to={next}>MO Bank</NavLink>
            </Typography>
            <Button color={"inherit"} size="small" onClick={handleOpen}>
              <Typography variant="h6">Login</Typography>
            </Button>
            <LoginForm
              open={isLoggingIn}
              setOpen={setIsLoggingIn}
              submitTo={"api/v1/login"}
              next={"/dashboard"}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
