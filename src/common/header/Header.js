import React, { useState } from "react";
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
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
  const [showRequiredregisterEmailId, setRequiredRegisterEmailIDd] =
    useState("dispNone");
  const [showRequiredregisterPassword, setRequiredRegisterPasword] =
    useState("dispNone");
  const [userLoggedIn, setuserLoginStatus] = useState(false);
  const [registrationSuccess, setRegistrationStatus] = useState(false);

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

 async function onloginClickHandler(e) {
    loginUserName === ""
      ? setRequiredLoginUsername("dispBlock")
      : setRequiredLoginUsername("dispNone");
    loginPassword === ""
      ? setRequiredloginPassword("dispBlock")
      : setRequiredloginPassword("dispNone");

    if(loginUserName === "" || loginPassword === "") {
      return;
    }

    try {
      const encodedCredentials = window.btoa(loginUserName + ":" + loginPassword);
      const rawResponse = await fetch(props.baseUrl + "auth/login" ,{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json",
          "authorization": `Basic ${encodedCredentials}`
        }
      })

      const response = await rawResponse.json();

      if(rawResponse.ok) {
        setuserLoginStatus(true);
        console.log(rawResponse.headers.get('access-token'));
        closeModalHandler();
        console.log("Login Success");
      } else {
        new Error("Login Failed");
        console.log("Error Logging in.")
      }

    } catch(e) {
      
    }
    
    console.log("Login Button Clicked");
  }

  async function onregisterUserHandler(e) {
    registerFirstName === ""
      ? setRequiredRegiterFirstName("dispBlock")
      : setRequiredRegiterFirstName("dispNone");
    registerLastName === ""
      ? setRequiredRegisterLastName("dispBlock")
      : setRequiredRegisterLastName("dispNone");
    registerEmailId === ""
      ? setRequiredRegisterEmailIDd("dispBlock")
      : setRequiredRegisterEmailIDd("dispNone");
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
      console.log("Mandatory Fields missing for Registration");
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

      const response = await rawResponse.json();
      if (rawResponse.ok) {
        console.log("User registration success");
        console.log(response);
        setRegistrationStatus(true);
      } else {
        new Error("Error when registering the user");
        console.log("Error in Registering . Error in Fetch");
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div>
      <header className="header">
        <div className="header-logo-image">
          <img src={logo}></img>
        </div>
        <div className="header-btn">
          <div>
            <Button
              style={{ margin: "0 5px" }}
              variant="contained"
              color="primary"
              onClick={() => alert("Book Show Button clicked")}
            >
              BOOK SHOW
            </Button>
          </div>
          <div>
            {userLoggedIn ? (
              <Button
                style={{ margin: "0 5px" }}
                variant="contained"
                color="default"
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
