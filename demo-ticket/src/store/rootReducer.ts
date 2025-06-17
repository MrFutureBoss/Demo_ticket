import { combineReducers } from "@reduxjs/toolkit";
import ticketReducer from "./reducers/ticketReducer";
import employeeReducer from "./reducers/employeeReducer";
import splitterReducer from "./reducers/splitterReducer";

const rootReducer = combineReducers({
  ticket: ticketReducer,
  employee: employeeReducer,
  splitter: splitterReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
