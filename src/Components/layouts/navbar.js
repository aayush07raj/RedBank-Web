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
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Grow from "@material-ui/core/Grow";
// import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  space: {
    margin: "auto",
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

  const [open4, setOpen4] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const anchorRef = React.useRef(null);
  const anchorRef2 = React.useRef(null);
  const anchorRef3 = React.useRef(null);

  const [notify, setNotify] = React.useState("");
  const [name, setName] = React.useState("");

  const handleClickOpen = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleToggle2 = () => {
    setOpen2((prevOpen) => !prevOpen);
  };
  const handleToggle3 = () => {
    setOpen3((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleClose2 = (event) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
      return;
    }

    setOpen2(false);
  };
  const handleClose3 = (event) => {
    if (anchorRef3.current && anchorRef3.current.contains(event.target)) {
      return;
    }

    setOpen3(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  function handleListKeyDown2(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen2(false);
    }
  }
  function handleListKeyDown3(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen3(false);
    }
  }

  const handleLogout = async () => {
    const cookies = new Cookies();
    dispatch(loggingOut());
    cookies.remove("Auth", { path: "/" });
    history.push("/Login");
  };

  const handleClick2 = (event) => {
    setOpen((prevOpen) => !prevOpen);
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
    setOpen(event.currentTarget);
  };

  useEffect(() => {
    if (loggedInState.userType === 1) {
      axios
        .get("http://localhost:8080/profile/fetchuserprofile", {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        })
        .then((response) => {
          setName(response.data.name);
          if (response.data.donorStatus === 2) {
            setNotify("not eligible");
          } else {
            setNotify("eligible");
          }
        })
        .catch();
    }
  }, []);

  return (
    <Fragment className={classes.root}>
      <AppBar position="static" style={{ background: "#E94364" }}>
        <Toolbar>
          <Typography to="/Home" component={Link} variant="h6">
            <img src={Logo} alt="logo" className={classes.logo} />
          </Typography>
          <Typography variant="h5" style={{ padding: "10px" }}>
            RedBank
          </Typography>
          <Typography className={classes.space}></Typography>

          <div className={classes.sectionDesktop}>
            <IconButton ref={anchorRef} onClick={handleClick2} color="inherit">
              <Badge color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              className={classes.menu}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        {notificationsList.length === 0 ? (
                          <MenuItem
                            onClick={handleClose}
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
                                onClick={handleClose}
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
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            <Button color="inherit" component={Link} to="/About" variant="h7">
              About
            </Button>
            <Button ref={anchorRef2} onClick={handleToggle2} color="inherit">
              Services
            </Button>

            <Popper
              open={open2}
              anchorEl={anchorRef2.current}
              role={undefined}
              transition
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose2}>
                      <MenuList
                        autoFocusItem={open2}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown2}
                      >
                        {loggedInState.userType === 1 ? (
                          <>
                            <MenuItem onClick={handleClose2}>
                              <Button
                                onClick={handleClose2}
                                color="inherit"
                                component={Link}
                                to="/BuyBlood"
                                variant="h7"
                              >
                                Buy Blood
                              </Button>
                            </MenuItem>
                            <MenuItem onClick={handleClose2}>
                              <Button
                                onClick={handleClose2}
                                color="inherit"
                                component={Link}
                                to="/FindDonors"
                                variant="h7"
                              >
                                Find Donors
                              </Button>
                            </MenuItem>
                            <MenuItem onClick={handleClose2}>
                              <Button
                                onClick={handleClose2}
                                color="inherit"
                                component={Link}
                                to="/MyCommitments"
                                variant="h7"
                              >
                                My Commitments
                              </Button>
                            </MenuItem>
                            <MenuItem onClick={handleClose2}>
                              <Button
                                onClick={handleClose2}
                                color="inherit"
                                component={Link}
                                to="/MyPurchases"
                                variant="h7"
                              >
                                My Purchases
                              </Button>
                            </MenuItem>
                            <MenuItem onClick={handleClose2}>
                              <Button
                                onClick={handleClose2}
                                color="inherit"
                                component={Link}
                                to="/MyDonationReq"
                                variant="h7"
                              >
                                My Donation Requests
                              </Button>
                            </MenuItem>
                            <MenuItem onClick={handleClose2}>
                              <Button
                                onClick={handleClose2}
                                color="inherit"
                                component={Link}
                                to="/UpcomingDrive"
                                variant="h7"
                              >
                                Upcoming Drives
                              </Button>
                            </MenuItem>
                            <MenuItem onClick={handleClose2}>
                              <Button
                                onClick={handleClose2}
                                color="inherit"
                                component={Link}
                                to="/MyInvites"
                                variant="h7"
                              >
                                My Invites
                              </Button>
                            </MenuItem>
                          </>
                        ) : (
                          <>
                            {loggedInState.userType === 3 ? (
                              <>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/BuyBlood"
                                    variant="h7"
                                  >
                                    Buy Blood
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/FindDonors"
                                    variant="h7"
                                  >
                                    Find Donors
                                  </Button>
                                </MenuItem>

                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MyPurchases"
                                    variant="h7"
                                  >
                                    My Purchases
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MyDonationReq"
                                    variant="h7"
                                  >
                                    My Donation Requests
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/ConductDrive"
                                    variant="h7"
                                  >
                                    Conduct Drive
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MyDrives"
                                    variant="h7"
                                  >
                                    My Drives
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MyInventory"
                                    variant="h7"
                                  >
                                    My Inventory
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MyAnalytics"
                                    variant="h7"
                                  >
                                    My Analytics
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MySales"
                                    variant="h7"
                                  >
                                    My Sales
                                  </Button>
                                </MenuItem>
                              </>
                            ) : (
                              <>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/BuyBlood"
                                    variant="h7"
                                  >
                                    Buy Blood
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/FindDonors"
                                    variant="h7"
                                  >
                                    Find Donors
                                  </Button>
                                </MenuItem>

                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MyPurchases"
                                    variant="h7"
                                  >
                                    My Purchases
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MyDonationReq"
                                    variant="h7"
                                  >
                                    My Donation Requests
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/ConductDrive"
                                    variant="h7"
                                  >
                                    Conduct Drive
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MyDrives"
                                    variant="h7"
                                  >
                                    My Drives
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MyInventory"
                                    variant="h7"
                                  >
                                    My Inventory
                                  </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                  <Button
                                    onClick={handleClose2}
                                    color="inherit"
                                    component={Link}
                                    to="/MyAnalytics"
                                    variant="h7"
                                  >
                                    My Analytics
                                  </Button>
                                </MenuItem>
                              </>
                            )}
                          </>
                        )}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <IconButton
              ref={anchorRef3}
              onClick={handleToggle3}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Popper
              open={open3}
              anchorEl={anchorRef3.current}
              role={undefined}
              transition
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose3}>
                      <MenuList
                        autoFocusItem={open3}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown3}
                      >
                        <MenuItem onClick={handleClose3}>
                          <AccountBoxRoundedIcon />
                          <Button
                            color="inherit"
                            component={Link}
                            to="/profile"
                            variant="h7"
                          >
                            Profile
                          </Button>
                        </MenuItem>
                        <MenuItem onClick={handleClose3}>
                          <ExitToAppIcon />
                          <Button
                            color="inherit"
                            onClick={handleClickOpen}
                            variant="h7"
                          >
                            Logout
                          </Button>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            <Dialog
              open={open4}
              onClose={handleClose4}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are You Sure, you want to logout?"}
              </DialogTitle>
              <DialogContent></DialogContent>
              <DialogActions>
                <Button onClick={handleClose4} color="inherit">
                  No
                </Button>
                <Button onClick={handleLogout} color="inherit" autoFocus>
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
