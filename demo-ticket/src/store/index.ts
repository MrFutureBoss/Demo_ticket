import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./reducers/ticketReducer";
import employeeReducer from "./reducers/employeeReducer";
import splitterReducer from "./reducers/splitterReducer";

const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    employee: employeeReducer,
    splitter: splitterReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
