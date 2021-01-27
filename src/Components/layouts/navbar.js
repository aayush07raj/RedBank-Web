import React, { Fragment } from "react";
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
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Logo from "./logo.svg";

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
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button
              color="inherit"
              component={Link}
              to="/about"
              style={{ padding: 5 }}
              variant="h7"
            >
              About{" "}
            </Button>
            <Button
              onClick={handleMenu}
              color="inherit"
              style={{ padding: 5 }}
              variant="h7"
            >
              {" "}
              Services{" "}
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <Button
              color="inherit"
              component={Link}
              to="/about"
              style={{ padding: 5 }}
              variant="h7"
            >
              Profile{" "}
            </Button>

            <IconButton
              // aria-label="account of current user"
              // aria-controls="menu-appbar"
              // aria-haspopup="true"
              // onClick={handleMenu}
              color="inherit"
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </div>
          {/* <IconButton color="inherit">
            <MoreIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      {/* {mobileMenu} */}
    </Fragment>
  );
}

// Logged Out
