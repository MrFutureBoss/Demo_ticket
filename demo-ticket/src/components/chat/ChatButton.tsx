"use client";

import React, { useState } from "react";
import { FloatButton } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import ChatBox from "./ChatBox";

export default function ChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      {!isChatOpen && (
        <FloatButton
          icon={<MessageOutlined />}
          type="primary"
          onClick={() => setIsChatOpen(true)}
          className="chat-float-button"
        />
      )}
    </>
  );
}
