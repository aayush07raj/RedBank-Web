import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import MoreIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import MenuIcon from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
// import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
// import {makeStyles} from "@material-ui/core/styles";

// const useStyles =makeStyles(theme => ({

// }));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
  // sectionDesktop: {
  //   display: "none",
  //   [theme.breakpoints.up("sm")]: {
  //     display: "flex"
  //   }
  // }
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
  // Service Dropdown
  const [anchorEle, setAnchorEle] = React.useState(null);
  // const open = Boolean(anchorEle);

  const serviceHandleMenu = (event) => {
    setAnchorEle(event.currentTarget);
  };

  const serviceHandleClose = () => {
    setAnchorEle(null);
  };
  // const mobileMenu = (
  //   <Menu>
  //     <MenuItem component={Link} to="/about">
  //       About
  //     </MenuItem>
  //     <MenuItem component={Link} to="/about">
  //       Service
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <Fragment className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Photos
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
              onClick={serviceHandleMenu}
              color="inherit"
              style={{ padding: 5 }}
              variant="h7"
            >
              {" "}
              Services{" "}
            </Button>
            <Menu
              id="simple-menu"
              anchorEle={anchorEle}
              // keepMounted
              open={Boolean(anchorEle)}
              anchorEle={open}
              onClose={serviceHandleClose}
            >
              <MenuItem onClick={serviceHandleClose}>Profile</MenuItem>
              <MenuItem onClick={serviceHandleClose}>My account</MenuItem>
              <MenuItem onClick={serviceHandleClose}>Logout</MenuItem>
            </Menu>

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
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
























// ******************************************************************************************
// ****************************************************************************************







import React, { Fragment, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
// import Avatar from '@material-ui/core/Avatar';

import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
  // sectionDesktop: {
  //   display: "none",
  //   [theme.breakpoints.up("sm")]: {
  //     display: "flex"
  //   }
  // }
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

  // const mobileMenu = (
  //   <Menu>
  //     <MenuItem component={Link} to="/about">
  //       About
  //     </MenuItem>
  //     <MenuItem component={Link} to="/about">
  //       Service
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <Fragment className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        {/* <Avatar alt="Remy Sharp" src="./redbanklogo.svg" /> */}
          <Typography variant="h6" className={classes.title}>
            Photos
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


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
// }));

// export default function DenseAppBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar variant="dense">
//           <Typography variant="h6" color="inherit">
//             Photos
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
