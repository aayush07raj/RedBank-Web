import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import firstView from './firstView';
import FirstView from './firstView';
import SecondView from './SecondView';
import { Component } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: '100vh',
  },
}));
export default function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <FirstView />
      <SecondView />
    </div>
  );
}
