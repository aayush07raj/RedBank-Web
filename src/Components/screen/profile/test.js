import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  ButtonGroup,
  Typography,
  FormControl,
  Container,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia,
} from "@material-ui/core";
import axios from "axios";
import states from "./states.json";
import { useForm } from "./useForm";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
  },
}));

function HosProfile() {
  const [initialValues, setInitialValues] = useState({
    name: "",
    userId: "",
    donorStatus: 0,
  });
  const loggedInState = useSelector((state) => state.loggedIn);

  const [fulldata, setfulldata] = useState({
    email: "",
    phone: [""],
    license_number: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    drivesConducted: "",
    salesMade: "",
    requestMade: "",
  });

  const [errors, setError] = useState({
    phone: "",
    license_number: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    password: "",
    cpassword: "",
  });

  const validate = () => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const errors = {};
    if (fulldata.address.trim() === "") {
      errors.address = "Address cannot be empty";
    }
    if (fulldata.state === "") {
      errors.state = "State cannot be empty";
    }
    if (fulldata.district === "") {
      errors.district = "District cannot be empty";
    }
    if (!/^[1-9][0-9]{5}$/.test(fulldata.pincode.trim())) {
      errors.pincode = "Invalid pincode format";
    }
    if (fulldata.phone.length >= 1 && !fulldata.phone[0]) {
      console.log("Working error");
      errors.phone = "wrong number";
    }
    if (fulldata.phone.length >= 2 && !fulldata.phone[1]) {
      console.log("Working error");
      errors.phone = "wrong number";
    }
    if (fulldata.phone.length >= 3 && !fulldata.phone[2]) {
      console.log("Working error");
      errors.phone = "wrong number";
    }
    if (fulldata.phone.length >= 4 && !fulldata.phone[3]) {
      console.log("Working error");
      errors.phone = "wrong number";
    }
    if (fulldata.phone.length >= 5 && !fulldata.phone[4]) {
      console.log("Working error");
      errors.phone = "wrong number";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const validatePass = () => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const errors = {};

    if (!strongRegex.test(newPass.password.trim())) {
      errors.password = "Enter a stronger password";
    }
    if (newPass.cpassword !== newPass.password || newPass.cpassword === "") {
      errors.cpassword = "Password is either empty or Passwords do not match";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const [touched, setTouched] = useState([false, false, false, false, false]);

  const [maxLimit, setMaxLimit] = useState("Add a phone number");
  const [enable, setEnable] = useState(true);
  const [visibility, setVisibility] = useState("visible");
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);

  const handleNumberChange = (e, id) => {
    const updatedData = { ...fulldata };
    updatedData.phone[id] = e.target.value;
    setfulldata(updatedData);
  };

  const handleAdd = () => {
    if (fulldata.phone.length < 5) {
      setfulldata((prevState) => ({
        ...prevState,
        phone: [...prevState.phone, ""],
      }));
    }
  };

  const handleDelete = () => {
    if (fulldata.phone.length > 1) {
      setVisibility("visible");
      setfulldata((prevState) => {
        const newState = { ...prevState };
        newState.phone.pop();
        return newState;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setEnable(false);
      setSelectedStateIndex(
        states.states.findIndex((item) => item.state === value)
      );
    }
    const updatedData = { ...fulldata };
    updatedData[name] = value;
    setfulldata(updatedData);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/profile/fetchuserprofile", {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        setInitialValues(response.data);
      })
      .catch();
    anotherAxios();
  }, []);

  const anotherAxios = () => {
    axios
      .get("http://localhost:8080/profile/fetchuserdata", {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        setfulldata(response.data);
        console.log(response.data);
      })
      .catch();
  };
  const margin = { marginTop: "15px" };

  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  // For Editing
  const [enableReadOnly, setEdit] = useState(true);

  const history = useHistory();

  const handleEdit = () => {
    window.alert("You can start editing !");
    setEdit(false);
    console.log(initialValues);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errors = validate();
    setTouched([true, true, true, true, true]);
    setError(errors);
    if (errors) return;
    setEdit(true);
    console.log(initialValues);
    console.log(values);
    axios
      .put("http://localhost:8080/profile/updatehosprofile", fulldata, {
        headers: {
          Authorization: "Bearer " + loggedInState.userToken,
        },
      })
      .then((response) => {
        window.alert("Changes have been saved !");
      })
      .catch();
    // }
  };

  const [verify, setVerify] = useState(true);
  const [pass, checkPass] = useForm({
    password: "",
  });

  const verifyPassword = () => {
    console.log(pass.password);
    axios
      .post(
        "http://localhost:8080/profile/verifycurrentpassword",
        {
          currentPassword: pass.password,
        },
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log("working");
          handleClickOpen();
        }
        console.log("works");
      })
      .catch();
  };

  // Modal for Change Password
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Change passsword state
  const [newPass, changePass] = useForm({
    password: "",
    cpassword: "",
  });

  const changePassword = (e) => {
    const errors = validatePass();
    setError(errors);

    if (errors) {
      return;
    }
    axios
      .put(
        "http://localhost:8080/profile/changepassword",
        {
          newPassword: newPass.password,
        },
        {
          headers: {
            Authorization: "Bearer " + loggedInState.userToken,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          window.alert("New Password successfully saved");
          history.push({
            pathname: "/home",
          });
        }
      })
      .catch();
  };

  return (
    <>
      <Grid container>
        <Grid container align="center" className={classes.container}>
          <Grid item xs={12} sm={5}>
            <CardMedia
              image="https://i.pinimg.com/originals/a9/7d/fb/a97dfbb8f6b6fa186bfc85a8a1a26ffa.jpg"
              style={{ height: 150, width: 150 }}
              component="img"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <CardContent>
              <Typography variant="h6">
                Hospital Name : {initialValues.name}
              </Typography>
              <Typography variant="h6">
                User Id : {initialValues.userId}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Grid>
        </Grid>

        <Grid container align="center" className={classes.container}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5">
              {" "}
              Request Made:{" "}
              <span style={{ color: "#e94394" }}> {fulldata.requestMade}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5">
              Drive Conducted:{" "}
              <span style={{ color: "blue" }}> {fulldata.drivesConducted}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5">
              Request Made:{" "}
              <span style={{ color: "green" }}> {fulldata.requestMade}</span>
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={8} sm={12} align="center">
          <Typography variant="h4">About</Typography>
        </Grid>

        <Grid container className={classes.container} align="center">
          <Grid item xs={12} sm={12}>
            <Typography variant="h5">Email : {fulldata.email}</Typography>
            <Typography variant="h5">
              License Number : {fulldata.license_number}
            </Typography>

            {fulldata.phone.map((val, idx) => (
              <Typography style={{ margin: "10px" }} variant="h5">
                {`Phone-${idx + 1} :  `}
                {enableReadOnly ? (
                  <label>{fulldata.phone[idx]}</label>
                ) : (
                  <>
                    <TextField
                      type="text"
                      name={`phone${idx}`}
                      value={val}
                      onChange={(e) => {
                        handleNumberChange(e, idx);
                        setTouched((prevState) => {
                          let newState = [...prevState];
                          newState[idx] = true;
                          return newState;
                        });
                      }}
                      key={idx}
                      inputProps={{
                        maxLength: 10,
                      }}
                      // error={!fulldata.phone[idx] && touched[idx] ? true : false}
                      // helperText={!fulldata.phone[idx] && touched[idx] ? errors.phone : ""}
                    ></TextField>
                    <div>
                      <ButtonGroup
                        variant="text"
                        color="default"
                        align="center"
                      >
                        {fulldata.phone.length < 5 ? (
                          <Button onClick={handleAdd}>{maxLimit}</Button>
                        ) : null}
                        {fulldata.phone.length === 1 ? null : (
                          <Button
                            onClick={handleDelete}
                            style={{ visibility: `${visibility}` }}
                          >
                            Delete phone number
                          </Button>
                        )}
                      </ButtonGroup>
                    </div>
                  </>
                )}
              </Typography>
            ))}

            <Typography style={{ margin: "10px" }} variant="h5">
              Address :{" "}
              {enableReadOnly ? (
                <label>{fulldata.address}</label>
              ) : (
                <TextField
                  name="address"
                  value={fulldata.address}
                  onChange={handleChange}
                  error={errors && errors.address ? true : false}
                  helperText={errors && errors.address ? errors.address : null}
                ></TextField>
              )}{" "}
            </Typography>
            <Typography style={{ margin: "10px" }} variant="h5">
              State :{" "}
              {enableReadOnly ? (
                <label>{fulldata.state}</label>
              ) : (
                <FormControl size="small" variant="outlined" style={margin}>
                  <InputLabel>
                    {errors && errors.state ? (
                      <p style={{ color: "#dc004e" }}>{errors.state}</p>
                    ) : (
                      <span></span>
                    )}
                  </InputLabel>
                  <Select
                    name="state"
                    onChange={handleChange}
                    value={fulldata.state}
                    error={errors && errors.state ? true : false}
                    helperText={errors && errors.state ? errors.state : null}
                  >
                    {states.states.map((item, id) => (
                      <MenuItem value={item.state} key={id}>
                        {item.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}{" "}
            </Typography>
            <Typography style={{ margin: "10px" }} variant="h5">
              District :{" "}
              {enableReadOnly ? (
                <label>{fulldata.district}</label>
              ) : (
                <FormControl size="small" variant="outlined" style={margin}>
                  <InputLabel>
                    {errors && errors.district ? (
                      <p style={{ color: "#dc004e" }}>{errors.district}</p>
                    ) : (
                      <span></span>
                    )}
                  </InputLabel>
                  <Select
                    inputProps={{ readOnly: enable }}
                    name="district"
                    onChange={handleChange}
                    value={fulldata.district}
                    error={errors && errors.district ? true : false}
                    helperText={
                      errors && errors.district ? errors.district : null
                    }
                  >
                    {states.states[selectedStateIndex].districts.map(
                      (item, id) => (
                        <MenuItem value={item} key={id}>
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              )}{" "}
            </Typography>
            <Typography style={{ margin: "10px" }} variant="h5">
              Pincode :{" "}
              {enableReadOnly ? (
                <label>{fulldata.pincode}</label>
              ) : (
                <TextField
                  name="pincode"
                  value={fulldata.pincode}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: 6,
                  }}
                  error={errors && errors.pincode ? true : false}
                  helperText={errors && errors.pincode ? errors.pincode : null}
                ></TextField>
              )}{" "}
            </Typography>
          </Grid>
        </Grid>
        <Grid align="center" item xs={12}>
          <ButtonGroup
            variant="contained"
            aria-label="contained primary button group"
            size="small"
          >
            {enableReadOnly ? (
              <Button color="secondary" onClick={handleEdit}>
                Edit profile
              </Button>
            ) : (
              <Button color="secondary" onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </ButtonGroup>
          <Grid align="center" item xs={12}>
            {verify ? (
              <>
                <Button
                  onClick={() => {
                    setVerify(false);
                  }}
                >
                  Change your password
                </Button>
              </>
            ) : (
              <>
                <Typography>Confirm Your Password:</Typography>
                <Input
                  name="password"
                  type="password"
                  value={pass.password}
                  onChange={checkPass}
                />
                <Button
                  onClick={() => {
                    verifyPassword();
                  }}
                >
                  Verify
                </Button>
              </>
            )}
          </Grid>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Password Change"}</DialogTitle>
            <DialogContent>Type a new Password</DialogContent>
            <DialogActions>
              <Input
                name="password"
                type="password"
                value={newPass.password}
                onChange={changePass}
                error={errors && errors.password ? true : false}
                helperText={errors && errors.password ? errors.password : null}
              />
            </DialogActions>
            <DialogActions>
              <Input
                name="cpassword"
                type="password"
                value={newPass.cpassword}
                onChange={changePass}
                error={errors && errors.cpassword ? true : false}
                helperText={
                  errors && errors.cpassword ? errors.cpassword : null
                }
              />
            </DialogActions>
            <DialogActions>
              <Button onClick={changePassword}>Submit</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
}
export default HosProfile;
