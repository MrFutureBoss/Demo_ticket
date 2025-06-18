import { combineReducers } from "@reduxjs/toolkit";
import ticketReducer from "./reducers/ticketReducer";
import employeeReducer from "./reducers/employeeReducer";
import splitterReducer from "./reducers/splitterReducer";
import modalReducer from "./reducers/modalReducer";

const rootReducer = combineReducers({
  ticket: ticketReducer,
  employee: employeeReducer,
  splitter: splitterReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
