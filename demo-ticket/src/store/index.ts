import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./reducers/ticketReducer";

const combinedReducer = {
  ticket: ticketReducer,
};

const store = configureStore({
  reducer: combinedReducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;
