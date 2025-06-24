import React from "react";
import useSWR from "swr";
import api from "@/utilities/api";
import api from "@/utilities/api";
import type { TicketResponse, PaginationParams, TicketFilterParams } from "./interfaces/ticket";

const fetcher = async (url: string, params: PaginationParams & TicketFilterParams) => {
  const response = await api.get<TicketResponse>(url, { params });
  return response.data;
};

export const useTickets = (params: PaginationParams & TicketFilterParams = {}) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["tickets/getAllTickets", params],
    ([url, params]) => fetcher(url, params),
    {
      // Tự động revalidate khi focus vào window
      revalidateOnFocus: true,
      // Tự động revalidate khi reconnect
      revalidateOnReconnect: true,
      // Polling mỗi 5 giây để kiểm tra dữ liệu mới
      refreshInterval: 5000,
      // Deduping interval để tránh gọi API quá nhiều
      dedupingInterval: 2000,
      // Retry khi gặp lỗi
      errorRetryCount: 3,
      // Thời gian chờ giữa các lần retry
      errorRetryInterval: 5000,
      // Optimistic updates
      optimisticData: (currentData: TicketResponse) => {
        return currentData;
      },
      // Revalidate khi params thay đổi
      revalidateIfStale: true,
    }
  );

  // Log results when data changes
  React.useEffect(() => {
    if (data) {
      console.log("Tickets Data Updated:", {
        tickets: data.tickets,
        pagination: data.pagination,
        timestamp: new Date().toISOString(),
      });
    }
  }, [data]);

  return {
    tickets: data?.tickets || [],
    pagination: data?.pagination,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useTickets;
