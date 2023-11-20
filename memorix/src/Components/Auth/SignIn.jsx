  import React, { useEffect, useState } from "react";
  import Axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate ,useLocation} from "react-router-dom";
import { StreamChat } from "stream-chat";
import { useTranslation } from 'react-i18next';

import "./auth.css";
function SignIn({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const api_key = "msyqt539twqg";
  const client = StreamChat.getInstance(api_key);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();


  const cookies = new Cookies();
  const login = () => {
    console.log("djhv",username);
    Axios.post("https://memorixappgameserver.onrender.com/login", {
      username,
      password,
    }).then((res) => {
      console.log("res.data",res.data);
      const { firstName, lastName, username, token, userId } = res.data;
      client.connectUser(
        {
          id: userId,
          name: username,
          firstName: firstName,
          lastName: lastName,
          // hashedPassword: cookies.get("hashedPassword"),
        },
        token
      );
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      console.log("mlkn", location.state);
      setIsLoggedIn(true);
      location.state? navigate("/ListAnime", { mode: location.state.mode }): navigate("/GameMode");
    }).catch((err)=>{
      console.log("err",err);
    });
  };
  return (
      <div className="login">
        <form>
          <label htmlFor="chk" aria-hidden="true">
            {t("login")}
          </label>
          <input
            placeholder={t("username")}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            placeholder={t("password")}
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button type="button" className="btn-auth" onClick={login}>{t("login")}</button>
        </form>
      </div>
  );
}

export default SignIn;
