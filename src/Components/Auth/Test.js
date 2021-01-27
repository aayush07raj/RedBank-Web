import React, { Component } from "react";
import Joi from "joi";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";

const paperStyle = {
  display: "flex",
  width: 380,
  flexDirection: "column",
  padding: "30px",
};

const margin = { marginTop: "20px" };
class Test extends Component {
  state = {
    account: { name: "", password: "" },
    errors: {},
  };

  validateProperty = ({ name, value }) => {
    if (name === "name") {
      if (value.trim() === "") return "Username is required";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required";
    }
  };

  validate = () => {
    const errors = {};

    const { account } = this.state;

    if (account.name.trim() === "") errors.name = "required";
    if (account.password.trim() === "") errors.password = "required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("Submitted");
  };

  render() {
    const { account } = this.state;
    return (
      <>
        <Grid item xs={12} container justify="center" alignItems="center">
          <form onSubmit={this.handleSubmit}>
            <Paper style={paperStyle} elevation={5}>
              <TextField
                style={margin}
                label="Name"
                placeholder="Enter your name"
                type="text"
                fullWidth
                variant="outlined"
                name="name"
                value={account.name}
                onChange={this.handleChange}
                error={this.state.errors && this.state.errors.name}
                helperText={
                  this.state.errors && this.state.errors.name
                    ? this.state.errors.name
                    : null
                }
              />

              <TextField
                style={margin}
                label="Password"
                placeholder="Enter your password"
                type="password"
                fullWidth
                variant="outlined"
                name="password"
                value={account.password}
                onChange={this.handleChange}
                error={this.state.errors && this.state.errors.password}
                helperText={
                  this.state.errors && this.state.errors.password
                    ? this.state.errors.password
                    : null
                }
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={margin}
              >
                Login
              </Button>
            </Paper>
          </form>
        </Grid>
      </>
    );
  }
}
export default Test;
