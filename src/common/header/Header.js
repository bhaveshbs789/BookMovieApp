import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        textAlign: "center",
        margin: "20px 0px",
      }}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Header(props) {
  const [isModalOpen, setModalOpenStatus] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [loginUserName, setloginUserName] = React.useState("");
  const [loginPassword, setloginPassword] = React.useState("");
  const [registerFirstName, setregisterFirstName] = React.useState("");
  const [registerLastName, setregisterLastName] = React.useState("");
  const [registerPassword, setregisterPassword] = React.useState("");
  const [registerEmailId, setregisterEmailId] = React.useState("");
  const [registerContactNumber, setregisterContactNumber] = React.useState("");
  const [showRequiredLoginUsername, setRequiredLoginUsername] =
    useState("dispNone");
  const [showRequiredloginPassword, setRequiredloginPassword] =
    useState("dispNone");
  const [showRequiredregisterFirstName, setRequiredRegiterFirstName] =
    useState("dispNone");
  const [showRequiredregisterLastName, setRequiredRegisterLastName] =
    useState("dispNone");
  const [showRequiredregisterContactNumber, setRequiredRegisterContactNumber] =
    useState("dispNone");
  const [showRequiredregisterEmailId, setRequiredRegisterEmailID] =
    useState("dispNone");
  const [showRequiredregisterPassword, setRequiredRegisterPasword] =
    useState("dispNone");
  const [userLoggedIn, setuserLoginStatus] = useState(
    sessionStorage.getItem("access-token") === null ? false : true
  );
  const [registrationSuccess, setRegistrationStatus] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    setloginUserName("");
    setloginPassword("");
    setregisterFirstName("");
    setregisterLastName("");
    setregisterPassword("");
    setregisterEmailId("");
    setregisterContactNumber("");
  }, [userLoggedIn, registrationSuccess]);

  const tabChangeHandler = (e, newTabValue) => {
    setTabValue(newTabValue);
  };

  const modalStyle = {
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModalHandler() {
    setModalOpenStatus(true);
    setloginUserName("");
    setloginPassword("");
    setregisterFirstName("");
    setregisterLastName("");
    setregisterPassword("");
    setregisterEmailId("");
    setregisterContactNumber("");
    setRequiredLoginUsername("dispNone");
    setRequiredloginPassword("dispNone");
    setRequiredRegiterFirstName("dispNone");
    setRequiredRegisterLastName("dispNone");
    setRequiredRegisterContactNumber("dispNone");
    setRequiredRegisterEmailID("dispNone");
    setRequiredRegisterPasword("dispNone");
    setTabValue(0);
  }

  function closeModalHandler() {
    setModalOpenStatus(false);
  }

  function loginUsernameHandler(e) {
    setloginUserName(e.target.value);
  }

  function loginPasswordHandler(e) {
    setloginPassword(e.target.value);
  }

  function registerFirstNameHandler(e) {
    setregisterFirstName(e.target.value);
  }

  function registerLastNameHandler(e) {
    setregisterLastName(e.target.value);
  }

  function registerEmailHandler(e) {
    setregisterEmailId(e.target.value);
  }

  function registerPasswordHandler(e) {
    setregisterPassword(e.target.value);
  }

  function registerContactNumberHandler(e) {
    setregisterContactNumber(e.target.value);
  }

  async function onLogoutClickHandler() {
    try {
      const rawRepsonse = await fetch(props.baseUrl + "auth/logout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "*/*",
          authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
        },
      });

      if (rawRepsonse.ok) {
        setuserLoginStatus(false);
        sessionStorage.removeItem("access-token");
      } else {
        new Error("Logout Failed");
      }
    } catch (e) {
      console.log("Error Logging out." + e.message);
    }
  }

  function onBookShowClickHandler() {
    if (sessionStorage.getItem("access-token") == null) {
      setModalOpenStatus(true);
    }
  }

  async function onloginClickHandler(e) {
    loginUserName === ""
      ? setRequiredLoginUsername("dispBlock")
      : setRequiredLoginUsername("dispNone");
    loginPassword === ""
      ? setRequiredloginPassword("dispBlock")
      : setRequiredloginPassword("dispNone");

    if (loginUserName === "" || loginPassword === "") {
      return;
    }

    try {
      const encodedCredentials = window.btoa(
        loginUserName + ":" + loginPassword
      );
      const rawResponse = await fetch(props.baseUrl + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Basic ${encodedCredentials}`,
        },
      });

      if (rawResponse.ok) {
        setuserLoginStatus(true);
        sessionStorage.setItem(
          "access-token",
          rawResponse.headers.get("access-token")
        );
        closeModalHandler();
      } else {
        setLoginError(true);
        new Error("Login Failed");
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async function onregisterUserHandler(e) {
    registerFirstName === ""
      ? setRequiredRegiterFirstName("dispBlock")
      : setRequiredRegiterFirstName("dispNone");
    registerLastName === ""
      ? setRequiredRegisterLastName("dispBlock")
      : setRequiredRegisterLastName("dispNone");
    registerEmailId === ""
      ? setRequiredRegisterEmailID("dispBlock")
      : setRequiredRegisterEmailID("dispNone");
    registerPassword === ""
      ? setRequiredRegisterPasword("dispBlock")
      : setRequiredRegisterPasword("dispNone");
    registerContactNumber === ""
      ? setRequiredRegisterContactNumber("dispBlock")
      : setRequiredRegisterContactNumber("dispNone");

    if (
      registerFirstName === "" ||
      registerLastName === "" ||
      registerEmailId === "" ||
      registerPassword === "" ||
      registerContactNumber === ""
    ) {
      return;
    }

    let body = {
      email_address: registerEmailId,
      first_name: registerFirstName,
      last_name: registerLastName,
      mobile_number: registerContactNumber,
      password: registerPassword,
    };

    try {
      const rawResponse = await fetch(props.baseUrl + "signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json;charset=UTF-8",
        },
        body: JSON.stringify(body),
      });

      if (rawResponse.ok) {
        setRegistrationStatus(true);
      } else {
        new Error("Error when registering the user");
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div>
      <header className="header">
        <div className="header-logo-image">
          <img src={logo} alt="Movie Logo"></img>
        </div>
        <div className="header-btn">
          <div>
            {props.showBookShowButton && userLoggedIn ? (
              <Link
                to={"/bookshow/" + props.movieId}
                style={{ textDecoration: "none" }}
              >
                <Button
                  style={{ margin: "0 5px" }}
                  variant="contained"
                  color="primary"
                >
                  BOOK SHOW
                </Button>
              </Link>
            ) : (
              ""
            )}
            {props.showBookShowButton && !userLoggedIn ? (
              <Button
                style={{ margin: "0 5px" }}
                variant="contained"
                color="primary"
                onClick={onBookShowClickHandler}
              >
                BOOK SHOW
              </Button>
            ) : (
              ""
            )}
          </div>
          <div>
            {userLoggedIn ? (
              <Button
                style={{ margin: "0 5px" }}
                variant="contained"
                color="default"
                onClick={onLogoutClickHandler}
              >
                LOGOUT
              </Button>
            ) : (
              <Button
                style={{ margin: "0 5px" }}
                variant="contained"
                color="default"
                onClick={() => openModalHandler()}
              >
                LOGIN
              </Button>
            )}
          </div>
        </div>
      </header>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModalHandler}
        ariaHideApp={false}
        style={modalStyle}
      >
        <Tabs value={tabValue} onChange={tabChangeHandler} variant="scrollable">
          <Tab label="LOGIN"></Tab>
          <Tab label="REGISTER"></Tab>
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <FormControl required>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              type="text"
              onChange={loginUsernameHandler}
            ></Input>
            <FormHelperText id="username" className={showRequiredLoginUsername}>
              <span className="required">required</span>
            </FormHelperText>
          </FormControl>
          <br></br>
          <br></br>
          <FormControl required>
            <InputLabel htmlFor="loginpassword">Password</InputLabel>
            <Input
              id="loginpassword"
              type="password"
              onChange={loginPasswordHandler}
            ></Input>
            <FormHelperText
              id="loginpassword"
              className={showRequiredloginPassword}
            >
              <span className="required">required</span>
            </FormHelperText>
          </FormControl>
          <br></br>
          <br></br>
          {loginError ? (
            <span className="login-error">
              Incorrect Username or Password. Try Again!
            </span>
          ) : (
            ""
          )}

          <Button
            variant="contained"
            color="primary"
            value="login"
            onClick={onloginClickHandler}
          >
            Login
          </Button>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <FormControl required>
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <Input
              id="firstname"
              type="text"
              onChange={registerFirstNameHandler}
            ></Input>
            <FormHelperText
              id="firstname"
              className={showRequiredregisterFirstName}
            >
              <span className="required">required</span>
            </FormHelperText>
          </FormControl>
          <br></br>
          <br></br>
          <FormControl required>
            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <Input
              id="lastname"
              type="text"
              onChange={registerLastNameHandler}
            ></Input>
            <FormHelperText
              id="lastname"
              className={showRequiredregisterLastName}
            >
              <span className="required">required</span>
            </FormHelperText>
          </FormControl>
          <br></br>
          <br></br>
          <FormControl required>
            <InputLabel htmlFor="emailid">Email</InputLabel>
            <Input
              id="emailid"
              type="email"
              onChange={registerEmailHandler}
            ></Input>
            <FormHelperText
              id="emailid"
              className={showRequiredregisterEmailId}
            >
              <span className="required">required</span>
            </FormHelperText>
          </FormControl>
          <br></br>
          <br></br>
          <FormControl required>
            <InputLabel htmlFor="registrationpassword">Password</InputLabel>
            <Input
              id="registrationpassword"
              type="password"
              onChange={registerPasswordHandler}
            ></Input>
            <FormHelperText
              id="registrationpassword"
              className={showRequiredregisterPassword}
            >
              <span className="required">required</span>
            </FormHelperText>
          </FormControl>
          <br></br>
          <br></br>
          <FormControl required>
            <InputLabel htmlFor="contact">Contact No</InputLabel>
            <Input
              id="contact"
              type="text"
              onChange={registerContactNumberHandler}
            ></Input>
            <FormHelperText
              id="contact"
              className={showRequiredregisterContactNumber}
            >
              <span className="required">required</span>
            </FormHelperText>
          </FormControl>
          <br></br>
          <br></br>
          {registrationSuccess ? (
            <span className="registration-success">
              Registration Successful. Please Login!
            </span>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            color="primary"
            value="Register"
            onClick={onregisterUserHandler}
          >
            Register
          </Button>
        </TabPanel>
      </Modal>
    </div>
  );
}
