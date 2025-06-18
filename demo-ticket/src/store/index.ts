import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./reducers/ticketReducer";
import employeeReducer from "./reducers/employeeReducer";
import splitterReducer from "./reducers/splitterReducer";
import modalReducer from "./reducers/modalReducer";
const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    employee: employeeReducer,
    splitter: splitterReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
