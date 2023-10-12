import React, { useEffect } from "react";
import "./nav.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function NavBar({ isLoggedIn, setIsLoggedIn, client }) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { t,i18n } = useTranslation();

  const getLang=async()=>{
   const lang= localStorage.getItem('language')
   if(lang){
    changeLang(lang)
  }else{
    changeLang('fr')
  }
  }
  useEffect(()=>{
    getLang()
  },[])
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
      <a href="/" className="active btn-a">
        {t('acceuil')}
      </a>
      <a href="GameMode" className="btn-a">
        Mode
      </a>
      <a href="ListAnime" className="btn-a">
        Animes
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
      <a  className="active btn-a" onClick={()=>{changeLang("fr")}}>
        {t('frensh')}
      </a>
      <a  className="active btn-a" onClick={()=>{changeLang("en")}}>
        {t('English')}
      </a>
        
      </div>
    </div>
  );
}

export default NavBar;
