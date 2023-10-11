import React, { useEffect, useState } from "react";
import { Channel } from "stream-chat-react";
import MultiJoueurs from "./MultiJoueurs";

function Game({ perssonages, channel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  useEffect(() => {
    channel.on("user.watching.start", (event) => {
      setPlayersJoined(event.watcher_count === 2);
    });
  }, []);

  if (!playersJoined) {
    return (
      <div className="centered-container">
        
        <div className="waitingMessage">
          Waiting for other player to join...
        </div>
        <div className="loader"></div>
      </div>
    );
  }
  return (
    // <></>
    <Channel channel={channel}>
      <MultiJoueurs perssonages={perssonages} />
    </Channel>
  );
}

export default Game;
