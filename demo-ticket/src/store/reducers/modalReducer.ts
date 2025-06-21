import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ModalProps } from "../interfaces/modal";
import { Ticket } from "../interfaces/ticket";

const initialState: ModalProps = {
  ticketDetail: {} as Ticket,
  openTicketDetail: false,
  ticketDetailLoading: false,
  ticketDetailType: 'regular' as 'regular' | 'open'
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenTicketDetail: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        openTicketDetail: action.payload,
      };
    },
    setTicketDetail: (state, action: PayloadAction<Ticket>) => {
      return {
        ...state,
        ticketDetail: action.payload,
      };
    },
    setTicketDetailLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        ticketDetailLoading: action.payload,
      };
    },
    setTicketDetailType: (state, action: PayloadAction<'regular' | 'open'>) => {
      return {
        ...state,
        ticketDetailType: action.payload,
      };
    }
  },
  extraReducers: () => {},
});

export const { 
  setOpenTicketDetail, 
  setTicketDetail, 
  setTicketDetailLoading,
  setTicketDetailType 
} = modalSlice.actions;
export default modalSlice.reducer;
