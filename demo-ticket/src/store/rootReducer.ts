import { combineReducers } from "@reduxjs/toolkit";
import ticketReducer from "./reducers/ticketReducer";

const rootReducer = combineReducers({
  ticket: ticketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
