import React from "react";
import "./nav.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function NavBar({ isLoggedIn, setIsLoggedIn, client }) {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="style-nav">
      <a href="/" className="active btn-a">
        HOME
      </a>
      <a href="GameMode" className="btn-a">
        MODE
      </a>
      <a href="ListAnime" className="btn-a">
        ANIMES
      </a>
      {isLoggedIn ? (
        <a className="btn-a" onClick={logOut} href="#">
          Disconnect
        </a>
      ) : (
        <a
          href="Auth"
          className="btn-a"
        >
          SignUp
        </a>
      )}
    </div>
  );
}

export default NavBar;
