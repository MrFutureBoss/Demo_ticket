"use client";

import { Splitter } from "antd";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import SideBar from "./SideBar";

interface BodyProps {
  children: React.ReactNode;
}

const Body = memo(function Body({ children }: BodyProps) {
  const isLeftVisible = useSelector(
    (state: RootState) => state.splitter.isLeftVisible
  );

  return (
    <div className="body-container">
      <Splitter className="splitter-container">
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

