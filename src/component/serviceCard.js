import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import ForwardIcon from "@material-ui/icons/Forward";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: 350,
  },
}));

function ServiceCard({ img, name, descp, page }) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: page,
    });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia component="img" image={img} height="150" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {descp}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="secondary"
            onClick={handleClick}
            endIcon={<ForwardIcon />}
          >
            Click here
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default ServiceCard;
