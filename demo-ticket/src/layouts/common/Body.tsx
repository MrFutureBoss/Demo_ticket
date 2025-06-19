"use client";

import { Splitter } from "antd";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import SideBar from "./SideBar";
import ChatButton from "@/components/chat/ChatButton";

interface BodyProps {
  children: React.ReactNode;
}

const Body = memo(function Body({ children }: BodyProps) {
  const isLeftVisible = useSelector(
    (state: RootState) => state.splitter.isLeftVisible
  );

  const handleResize = (sizes: number[]) => {
    // Optional: You can handle the resize event here if needed
    console.log('Panels resized:', sizes);
  };

  return (
    <div className="body-container">
      <ChatButton />
      <Splitter className="splitter-container" onResize={handleResize}>
        <Splitter.Panel
          defaultSize="15%"
          min="10%"
          max="40%"
          collapsible={{ start: !isLeftVisible }}
          size={isLeftVisible ? "15%" : 0}
        >
          <SideBar />
        </Splitter.Panel>
        <Splitter.Panel>{children}</Splitter.Panel>
      </Splitter>
    </div>
  );
});

export default Body;

