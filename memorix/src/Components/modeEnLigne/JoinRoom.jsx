import React, { useState } from "react";
import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { useLocation } from "react-router-dom";
import Game from "./Game";
import "./onlineGame.css";
import { useTranslation } from "react-i18next";
function JoinRoom() {
  const location = useLocation();
  const [enemyUserName, setEnemyUsername] = useState("");
  const [channel, setChannel] = useState(null);
  const api_key = "dcqq9m3xdtzr";
  const { t } = useTranslation();
  const client = StreamChat.getInstance(api_key);


  const createChannel = async () => {
    if (enemyUserName !== client.user.name) {
      const response = await client.queryUsers({
        name: { $eq: enemyUserName },
      });

      if (response.users.length === 0) {
        alert("User not found");
        return;
      }

      const newChannel = await client.channel("messaging", {
        members: [client.userID, response.users[0].id],
      });
      await newChannel.watch();
      setChannel(newChannel);
    }
  };

  return (
    <>
      {channel ? (
        <Chat client={client}>
          <Game perssonages={location.state} channel={channel} />
        </Chat>
      ) : (
        <Chat client={client}>
          <div className="joinGame">
            <h4>{t("CreateGame")}</h4>
            <input
              placeholder={t('rivaleName')+"..."}
              onChange={(event) => {
                setEnemyUsername(event.target.value);
              }}
            />
            <button
              onClick={() => {
                createChannel();
              }}
            >
              {t("joinOrStart")}
            </button>
          </div>
        </Chat>
      )}
    </>
  );
}

export default JoinRoom;
