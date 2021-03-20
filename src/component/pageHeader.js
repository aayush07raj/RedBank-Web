import {
  Card,
  makeStyles,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    display: "inline-block",
  },
  PageHeader: {
    diplay: "flex",
    padding: theme.spacing(3),
  },
  PageTitle: {
    paddingLeft: theme.spacing(4),
  },
}));

function PageHeader(props) {
  const classes = useStyles();
  const { title, subtitle } = props;
  return (
    <Paper elevation={5} square>
      <div className={classes.PageHeader}>
        <div className={classes.PageTitle}>
          <Typography className={classes.heading} variant="h4" component="div">
            {title}
          </Typography>
          <Typography className={classes.heading} variant="h6" component="div">
            {subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default PageHeader;
