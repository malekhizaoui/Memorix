import React from "react";
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";
import './chat.css'
function CustomInput() {
  const { handleSubmit } = useMessageInputContext();
  return (
    <div className="str-chat__input-flat str-chat__input-flat--send-button-active inputCustom">
      <div className="str-chat__input-flat-wrapper">
        <div >
          <ChatAutoComplete />
        </div>
        <button className onClick={handleSubmit}> Send Message</button>
      </div>
    </div>
  );
}

export default CustomInput;
