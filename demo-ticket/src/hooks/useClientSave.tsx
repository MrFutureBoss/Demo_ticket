import React from "react";
import useSWR from "swr";
import api2 from "@/utilities/api2";
import type { ClientSaveResponse } from "./interfaces/clientSave";
import { message } from "antd";
import _ from "lodash";

const tempId = "685371d8f34e520fbd196759";
const STORAGE_KEY = "clientSaveData";

const fetcher = async (url: string) => {
  const response = await api2.get<ClientSaveResponse>(url);
  return response.data;
};

const saveToSessionStorage = (data: ClientSaveResponse | object) => {
  try {
    const toSave = (data as ClientSaveResponse).data || data;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error("Error saving to sessionStorage:", error);
  }
};

const getFromSessionStorage = () => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error reading from sessionStorage:", error);
    return null;
  }
};

export const useClientSave = () => {
  const { data, error, isLoading, mutate } = useSWR(
    [`clientSave/getClientSave/${tempId}`],
    ([url]) => fetcher(url),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 5000,
      dedupingInterval: 2000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      optimisticData: (currentData: ClientSaveResponse) => currentData,
      revalidateIfStale: true,
    }
  );

  React.useEffect(() => {
    if (data) {
      const stored = getFromSessionStorage();
      if (!stored) {
        saveToSessionStorage(data);
      } else {
        const isDifferent = JSON.stringify(data.data) !== JSON.stringify(stored);
        if (isDifferent) {
          saveToSessionStorage(data);
        }
      }
    }
  }, [data]);

  const getClientSaveData = () => {
    if (data?.data) {
      return data.data;
    }
    const storedData = getFromSessionStorage();
    if (storedData) {
      return storedData;
    }
    return null;
  };

  const isUsingCachedData = !data?.data && getFromSessionStorage() !== null;

  const patchClientSave = async (patchData: Partial<Record<string, unknown>>) => {
    try {
      const oldData = getFromSessionStorage() || {};
      const newData = _.merge({}, oldData, patchData);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      mutate({ data: newData }, false);
      await api2.patch(`/clientSave/patchClientSave/${tempId}`, patchData);
      mutate();
      message.success("Cập nhật thành công!");
    } catch (error) {
      message.error("Cập nhật thất bại!");
      console.error(error);
    }
  };

  return {
    clientSave: getClientSaveData(),
    isLoading,
    isError: error,
    mutate,
    clearCache: () => {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
        console.log("Cache cleared");
      } catch (error) {
        console.error("Error clearing sessionStorage:", error);
      }
    },
    isUsingCachedData,
    forceRefresh: () => {
      mutate();
    },
    patchClientSave,
  };
};

export default useClientSave;
