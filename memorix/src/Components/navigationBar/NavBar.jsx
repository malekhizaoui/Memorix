import React, { useState } from "react";
import "./nav.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function NavBar({ isLoggedIn, setIsLoggedIn, client }) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { t,i18n } = useTranslation();
  const [active,setActive]=useState("acceuil")
  const getLang=localStorage.getItem("language")
  const changeLang=(lang)=>{
    localStorage.setItem("language",lang)
    i18n.changeLanguage(lang)
  }
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
      <div style={{flex:1}}>
      <a onClick={()=>{setActive('accueil');navigate('/')}} href="#"  className={active==="accueil"?"active btn-a":"btn-a"}>
        {t('acceuil')}
      </a>
      <a onClick={()=>{setActive('mode');navigate('/GameMode')}}href="#"   className={active==="mode"?"active btn-a":"btn-a"}>
        {t('mode')}
      </a>
      <a onClick={()=>{setActive('anime');navigate('/ListAnime')}} href="#"  className={active==="anime"?"active btn-a":"btn-a"}>
        {t('anime')}
      </a>
      {isLoggedIn ? (
        <a className="btn-a" onClick={logOut} href="#">
          {t("deconexion")}
        </a>
      ) : (
        <a
          href="Auth"
          className="btn-a"
        >
          {t("Sign up")}
        </a>
      )}
      </div>
      <div>
      <a  className={getLang==="fr"?"active btn-a":"btn-a"} onClick={()=>{changeLang("fr")}}>
        {t('frensh')}
      </a>
      <a  className={getLang==="en"?"active btn-a":"btn-a"}  onClick={()=>{changeLang("en")}}>
        {t('english')}
      </a>
      <a  className={getLang==="deu"?"active btn-a":"btn-a"}  onClick={()=>{changeLang("deu")}}>
        {t('german')}
      </a>
        
      </div>
    </div>
  );
}

export default NavBar;
