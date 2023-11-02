import { BrowserRouter as Router } from "react-router-dom";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import RouteConnected from "./Routes/RouteConnected";
import RouteDisconnected from "./Routes/RouteDisconnected";
import NavBar from "./Components/navigationBar/NavBar";
import { useTranslation } from 'react-i18next';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const userId = cookies.get("userId");
  const api_key = "ja2mczkz2wf7";
  const client = StreamChat.getInstance(api_key);
  const { t,i18n } = useTranslation();
  const changeLang=(lang)=>{
    localStorage.setItem("language",lang)
    i18n.changeLanguage(lang)
  }
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
  const retrieveUserSession = () => {
      if (token) {
        client.connectUser(
            {
              id: cookies.get("userId"),
              name: cookies.get("username"),
              firstName: cookies.get("firstName"),
              lastName: cookies.get("lastName"),
              hashedPassword: cookies.get("hashedPassword"),
            },
            token
          )
          setIsLoggedIn(true)
    }
  };
  useEffect(() => {
    console.log("userId,", userId);
    retrieveUserSession();
  },[isLoggedIn]);

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} client={client}/>
      {isLoggedIn ? (
        <RouteConnected isLoggedIn={isLoggedIn} />
      ) : (
        <RouteDisconnected
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </Router>
  );
}

export default App;
