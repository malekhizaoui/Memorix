import React, { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { useLocation } from "react-router-dom";
import "./auth.css";
function SignIn({ setIsLoggedIn }) {
  const location = useLocation();
  const multijoueur = location.state && location.state.mode;
  const navigate = useNavigate();
  const api_key = "dcqq9m3xdtzr";
  const client = StreamChat.getInstance(api_key);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("location.state", !!location.state);
  }, []);
  const cookies = new Cookies();
  const login = () => {
    console.log("mlkhj");
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
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
      location.state
        ? navigate("/ListAnime", { mode: location.state.mode })
        : navigate("/GameMode");
    });
  };
  return (
      <div className="login">
        <form>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button type="button" className="btn-auth" onClick={login}>Login</button>
        </form>
      </div>
  );
}

export default SignIn;
