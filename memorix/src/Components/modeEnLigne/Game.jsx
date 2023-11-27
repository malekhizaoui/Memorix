import React, { useEffect, useState } from "react";
import { Channel } from "stream-chat-react";
import MultiJoueurs from "./MultiJoueurs";
import { useTranslation } from 'react-i18next';
import CustomInput from "../componentsUi/inputChatComponent/CustomInput";
function Game({ perssonages, channel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const { t } = useTranslation();
    
  useEffect(() => {
    channel.on("user.watching.start", (event) => {
      setPlayersJoined(event.watcher_count === 2);
    });
  }, []);

  if (!playersJoined) {
    return (
      <div className="centered-container">
        
        <div className="waitingMessage">
          {t('waitPlayer')}
        </div>
        <div className="loader"></div>
      </div>
    );
  }
  return (
    // <></>
    <Channel channel={channel} Input={CustomInput}>
      <MultiJoueurs perssonages={perssonages} />
    </Channel>
  );
}

export default Game;
