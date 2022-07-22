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
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        textAlign:'center',
        margin:'5px 0px'
      }}
    >
      {value === index && (
        
          <div>{children}</div>
        
      )}
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

export default function Header() {
  const [loggedIn, setLoginStatus] = React.useState("");
  const [isModalOpen, setModalOpenStatus] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);

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
            <Button
              style={{ margin: "0 5px" }}
              variant="contained"
              color="default"
              onClick={() => openModalHandler()}
            >
              LOGIN
            </Button>
          </div>
        </div>
      </header>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModalHandler}
        ariaHideApp={false}
        style={modalStyle}
      >
        <Tabs value={tabValue} onChange={tabChangeHandler}>
          <Tab label="LOGIN"></Tab>
          <Tab label="REGISTER"></Tab>
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <FormControl required>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" type="text" onChange={() => {loginUsernameHandler}}></Input>
            <FormHelperText>Username</FormHelperText>
          </FormControl>
          <br></br>
          <FormControl required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" onChange={() => {loginPasswordHandler}}></Input>
            <FormHelperText>password</FormHelperText>
          </FormControl>
          <br></br>
          <Button variant="contained" color="primary" value="login">Login</Button>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <FormControl required>
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <Input id="firstname" type="text" onChange={() => {registerFirstNameHandler}}></Input>
            <FormHelperText></FormHelperText>
          </FormControl>
          <br></br>
          <FormControl required>
            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <Input id="lastname" type="text" onChange={() => {registerLastNameHandler}}></Input>
            <FormHelperText></FormHelperText>
          </FormControl>
          <br></br>
          <FormControl required>
            <InputLabel htmlFor="emailid">Email</InputLabel>
            <Input id="emailid" type="email" onChange={() => {registerEmailHandler}}></Input>
            <FormHelperText></FormHelperText>
          </FormControl>
          <br></br>
          <FormControl required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" onChange={() => {regsiterPasswordHandler}}></Input>
            <FormHelperText></FormHelperText>
          </FormControl>
          <br></br>
          <FormControl required>
            <InputLabel htmlFor="contact">Contact No</InputLabel>
            <Input id="contact" type="text" onChange={() => {registerContactNumberHandler}}></Input>
            <FormHelperText id="contact" required='true'></FormHelperText>
          </FormControl>
          <br></br>
          <Button variant="contained" color="primary" value="Register">Register</Button>
        </TabPanel>
      </Modal>
    </div>
  );
}
