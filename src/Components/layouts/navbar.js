import React, { Fragment, useEffect } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Badge,
  MenuIcon,
  Divider,
} from "@material-ui/core/";
import { Link, useHistory } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Logo from "./logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { loggingOut } from "../../redux/Actions/login";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Cookies from "universal-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: 40,
  },
  menu: {
    height: "400px",
    overflow: "auto",
  },
}));

export default function MenuAppBar({ user }) {
  const loggedInState = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [notificationsList, setNotifications] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEL2] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosed = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    const cookies = new Cookies();
    dispatch(loggingOut());
    cookies.remove("Auth", { path: "/" });
    history.push("/");
  };

  const handleClick2 = (event) => {
    axios
      .get(`http://localhost:8080/notifications`, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        if (response.data[0]) {
          setNotifications(response.data.reverse());
        }
      });
    setAnchorEL2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEL2(null);
  };

  //calling every 10 seconds
  // setInterval(() => {
  //   axios
  //     .get(`http://localhost:8080/notifications`, {
  //       headers: {
  //         Authorization: "Bearer " + loggedInState.userToken,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data[0]) {
  //         setNotifications(response.data.reverse());
  //       }
  //     });
  // }, 60000);

  return (
    <Fragment className={classes.root}>
      <AppBar position="static" style={{ background: "#E94364" }}>
        <Toolbar>
          {/* <Avatar alt="Remy Sharp" src="./redbanklogo.svg" /> */}
          <Typography
            to="/Home"
            component={Link}
            variant="h6"
            className={classes.title}
          >
            <img src={Logo} alt="logo" className={classes.logo} />
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton onClick={handleClick2} color="inherit">
              <Badge color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              id="simple-menu 2"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={handleClose2}
              className={classes.menu}
            >
              {notificationsList.length === 0 ? (
                <MenuItem
                  onClick={handleClose2}
                  style={{
                    width: "300px",
                    fontSize: "13px",
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  >
                    <p>No new notifications</p>
                  </div>
                </MenuItem>
              ) : (
                notificationsList.map((val, idx) => (
                  <>
                    <MenuItem
                      onClick={handleClose2}
                      style={{
                        width: "300px",
                        fontSize: "12px",
                      }}
                    >
                      <div
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                      >
                        <p> {val.message}</p>
                      </div>
                    </MenuItem>
                    <Divider />
                  </>
                ))
              )}
            </Menu>

            <Button color="inherit" component={Link} to="/About" variant="h7">
              About
            </Button>
            <Button onClick={handleMenu} color="inherit" variant="h7">
              Services
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {loggedInState.userType === 1 ? (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link to="/BuyBlood">Buy Blood</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/FindDonors">Find Donors</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/MyCommitments">My Commitments</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/MyPurchases">My Purchases</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/ActiveDonorReq">My Donation Requests</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/UpcomingDrive">Upcoming Drives</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/MyInvites">My Invites</Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  {loggedInState.userType === 3 ? (
                    <>
                      <MenuItem onClick={handleClose}>
                        <Link to="/BuyBlood">Buy Blood</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/FindDonors">Find Donors</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MyCommitments">My Commitments</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MyPurchases">My Purchases</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/ActiveDonorReq">My Donation Requests</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/ConductDrive">Conduct Drive</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MyDrives">My Drives</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MyInventory">My Inventory</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MySales">My Sales</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MyAnalytics">My Analytics</Link>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={handleClose}>
                        <Link to="/BuyBlood">Buy Blood</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/FindDonors">Find Donors</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MyCommitments">My Commitments</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MyPurchases">My Purchases</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/ActiveDonorReq">My Donation Requests</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/ConductDrive">Conduct Drive</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MyDrives">My Drives</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MyInventory">My Inventory</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/MyAnalytics">My Analytics</Link>
                      </MenuItem>
                    </>
                  )}
                </>
              )}
            </Menu>
            <Button
              color="inherit"
              component={Link}
              to="/profile"
              // style={{ padding: 5 }}
              variant="h7"
            >
              Profile{" "}
            </Button>
            <IconButton color="inherit" onClick={handleClickOpen}>
              <PowerSettingsNewIcon />
            </IconButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are You Sure, you want to logout?"}
              </DialogTitle>
              <DialogContent></DialogContent>
              <DialogActions>
                <Button onClick={handleClosed} color="primary">
                  No
                </Button>
                <Button onClick={handleLogout} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
