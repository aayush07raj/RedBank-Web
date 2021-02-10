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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
}));

function ServiceCard({ img, name, descp, page }) {
  const classes = useStyles();
  console.log(img)
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
          <CardMedia
            component="img"
            image={img}
            height="150"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {descp}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary" onClick={handleClick}>
            Click
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default ServiceCard;
