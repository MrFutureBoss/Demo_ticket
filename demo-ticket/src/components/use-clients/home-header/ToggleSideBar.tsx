"use client";
import Icons from "@/components/icons/Icons";
import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLeftVisibility } from "@/store/reducers/splitterReducer";
import type { RootState } from "@/store";

const ToggleSideBar = memo(function ToggleSideBar() {
  const dispatch = useDispatch();
  const isLeftVisible = useSelector((state: RootState) => state.splitter.isLeftVisible);

  const handleClick = useCallback(() => {
    dispatch(toggleLeftVisibility());
  }, [dispatch]);

  return (
    <div className="header-icon" onClick={handleClick}>
      <Icons name={isLeftVisible ? "expand" : "collapse"} />
    </div>
  );
});

export default ToggleSideBar;
