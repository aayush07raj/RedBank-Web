import {
  Card,
  makeStyles,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#CCCCCC",
  },
  PageHeader: {
    diplay: "flex",
    padding: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },

  PageTitle: {
    paddingLeft: theme.spacing(4),
    "& .MuiTypography-h6": {
      opacity: "0.6",
    },
  },
}));

function PageHeader(props) {
  const classes = useStyles();
  const { title, subtitle } = props;
  return (
    <Paper elevation={5} square className={classes.root}>
      <div className={classes.PageHeader}>
        <div className={classes.PageTitle}>
          <Typography variant="h3" component="div">
            {title}
          </Typography>
          <Divider />
          <Typography variant="h6" component="div">
            {subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default PageHeader;
