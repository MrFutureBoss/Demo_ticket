import api from "@/utilities/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { Ticket, TicketState } from "@/store/interfaces/ticket";

export const getAllTickets = createAsyncThunk(
  "tickets/get_all_tickets",
  async (
    info: { filter?: number } = { filter: 50 },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(`/tickets/getAllTickets`, {
        params: {
          filter: info.filter,
        },
      });

      // console.log("Ticket data:", data);
      return fulfillWithValue({ tickets: data.tickets });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? error.message);
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(String(error));
    }
  }
);

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
  count: 0,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    ticketReset: (state) => {
      state.tickets = [];
      state.loading = true;
      state.error = null;
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllTickets.fulfilled,
      (state, action: PayloadAction<{ tickets: Ticket[] }>) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
      }
    );
    builder.addCase(getAllTickets.rejected, (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === "string" ? action.payload : "Unknown error";
    });
  },
});

export const { ticketReset } = ticketSlice.actions;
export default ticketSlice.reducer;
