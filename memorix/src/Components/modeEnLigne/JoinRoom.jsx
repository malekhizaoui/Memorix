import React, { useEffect, useState } from "react";
import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { useLocation } from "react-router-dom";
import Game from "./Game"
import './onlineGame.css'
function JoinRoom() {
    const location = useLocation();
    const [enemyUserName, setEnemyUsername] = useState("");
    const [channel, setChannel] = useState(null);
    const api_key = "dcqq9m3xdtzr";
    const client = StreamChat.getInstance(api_key);
    console.log("");
    const createChannel = async () => {
      console.log("client",client);
      if(enemyUserName!==client.user.name){
         const response = await client.queryUsers({ name: { $eq: enemyUserName } })
    
        if (response.users.length === 0) {
          alert("User not found");
          return;
        }
    
        const newChannel = await client.channel("messaging", {
          members: [client.userID, response.users[0].id],
        });
        console.log('newChannel',newChannel);
        await newChannel.watch();
        setChannel(newChannel);
      }
       
      };

  return (
<>

      {channel ? (
        <Chat client={client}>
          <Game perssonages={location.state} channel={channel}/>
        </Chat>
      ) : (
        <Chat client={client} >

        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Username of rival..."
            onChange={(event) => {
                setEnemyUsername(event.target.value);
            }}
          />
          <button onClick={()=>{createChannel()}}> Join/Start Game</button>
        </div>
        </Chat>

      )}
    </>  )
}

export default JoinRoom