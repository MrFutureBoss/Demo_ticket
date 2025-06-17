import api from "@/utilities/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import {
  TicketState,
  PaginationParams,
  TicketResponse,
} from "@/store/interfaces/ticket";

export const getAllTickets = createAsyncThunk(
  "tickets/get_all_tickets",
  async (
    params: PaginationParams = { filter: 200 },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get<TicketResponse>(`/tickets/getAllTickets`, {
        params: {
          filter: params.filter,
          page: params.page,
          page_size: params.page_size,
          type: params.type,
        },
      });

      if (!data || !data.tickets) {
        throw new Error("Invalid response format");
      }

      return fulfillWithValue(data);
    } catch (error: unknown) {
      console.error("API Error:", error);
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
  pagination: {
    total: 0,
    page: 1,
    page_size: 20,
    total_pages: 0,
  },
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    ticketReset: (state) => {
      state.tickets = [];
      state.loading = true;
      state.error = null;
      state.pagination = {
        total: 0,
        page: 1,
        page_size: 20,
        total_pages: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllTickets.fulfilled,
      (state, action: PayloadAction<TicketResponse>) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
        state.pagination = action.payload.pagination;
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
