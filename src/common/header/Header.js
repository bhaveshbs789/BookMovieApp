import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import { Button } from "@material-ui/core";
import Modal from "react-modal";

export default function Header() {
  const [loggedIn, setLoginStatus] = React.useState("");

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

      
    </div>
  );
}


