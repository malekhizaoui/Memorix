import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./auth.css";
function SignUp() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      navigate("/SignIn");
    });
  };
  return (
    <div className="signup">
      <form>
        <label htmlFor="chk" aria-hidden="true">
          {t("Sign up")}
        </label>
        <input
          placeholder={t("name")}
          onChange={(event) => {
            setUser({ ...user, firstName: event.target.value });
          }}
        />
        <input
          placeholder={t("lastname")}
          onChange={(event) => {
            setUser({ ...user, lastName: event.target.value });
          }}
        />
        <input
          placeholder={t("username")}
          onChange={(event) => {
            setUser({ ...user, username: event.target.value });
          }}
        />
        <input
          placeholder={t("password")}
          type="password"
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
        />
        <button type="button" onClick={signUp} className="btn-auth">
          {" "}
          {t("Sign up")}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
