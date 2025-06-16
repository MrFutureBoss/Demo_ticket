"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../../store/slices/counterSlice";
import type { RootState } from "../../../store/rootReducer";

export default function Test() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button type="button" onClick={() => dispatch(increment())}>
        Count: {count}
      </button>
    </div>
  );
}
