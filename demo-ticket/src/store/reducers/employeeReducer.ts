import api from "@/utilities/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { Employee, EmployeeState } from "@/store/interfaces/employee";

export const getAllEmployees = createAsyncThunk(
  "employees/get_all_employees",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/users/get_users`);
      return fulfillWithValue({ employees: data.employees });
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

export const getEmployeeById = createAsyncThunk(
  "employees/get_employee_by_id",
  async (
    { employee_id }: { employee_id?: number },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const params = {
        employee_id: employee_id,
      };
      const { data } = await api.get(`/users/get_users`, { params });
      console.log("data", data);
      return fulfillWithValue({ employee: data.data });
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

const initialState: EmployeeState = {
  employees: [],
  employee: null,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    employeeReset: (state) => {
      state.employee = null;
      state.employees = [];
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllEmployees.fulfilled,
      (state, action: PayloadAction<{ employees: Employee[] }>) => {
        state.loading = false;
        state.employees = action.payload.employees;
      }
    );
    builder.addCase(getAllEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === "string" ? action.payload : "Unknown error";
    });
    builder.addCase(getEmployeeById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getEmployeeById.fulfilled,
      (state, action: PayloadAction<{ employee: Employee }>) => {
        state.loading = false;
        state.employee = action.payload.employee;
      }
    );
    builder.addCase(getEmployeeById.rejected, (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === "string" ? action.payload : "Unknown error";
    });
  },
});

export const { employeeReset } = employeeSlice.actions;
export default employeeSlice.reducer;
