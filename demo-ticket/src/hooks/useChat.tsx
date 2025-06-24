import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import readHTML from "../utilities/convert/readHTML";

export type MessageInfo = {
  message: {
    role: "user" | "assistant";
    content: string;
  };
  status: "success" | "loading" | "error";
};

export type ChatState = {
  messages: MessageInfo[];
  loading: boolean;
  error: string | null;
};

const API_URL =
  "https://n8n.cennos.intranet/webhook/16aa0cb9-0c48-45dd-923e-99a2c439b4dd";

interface ChatResponse {
  output: string;
}

// Helper function to format response
const formatResponse = (response: ChatResponse): string => {
  if (!response || !response.output) {
    return '[⚠️ Invalid webhook response body]';
  }

  let formattedResponse = response.output;
  
  // Replace newlines with <br/>
  formattedResponse = formattedResponse.replace(/\n/g, '<br/>');
  
  // Replace bold markdown with HTML bold
  formattedResponse = formattedResponse.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  
  // Replace markdown links with HTML links 
  formattedResponse = formattedResponse.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  return formattedResponse;
};

// Create axios instance with default config
const chatApi = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Thêm các options cho CORS
  withCredentials: false,
  proxy: false
});

// Add request interceptor for debugging
chatApi.interceptors.request.use(
  (config) => {
    console.log("Request config:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
chatApi.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    loading: false,
    error: null,
  });

  const sendMessage = async (content: string) => {
    if (!content) return;

    if (state.loading) {
      message.error(
        "Request is in progress, please wait for the request to complete."
      );
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));
    console.log("Sending message to:", API_URL);
    console.log("Request payload:", { message: content });

    try {
      const response = await chatApi.post<ChatResponse>("", {
        message: content,
      });
      
      console.log("Full response:", response);
      const data = response.data;
      console.log("Response data:", data);
      
      if (!data || !data.output) {
        throw new Error("Invalid response format");
      }

      const formattedOutput = formatResponse(data);
      console.log("Formatted output:", formattedOutput);

      const userMessage: MessageInfo = {
        message: { role: "user", content },
        status: "success",
      };

      const assistantMessage: MessageInfo = {
        message: { 
          role: "assistant", 
          content: readHTML(formattedOutput) as string
        },
        status: "success",
      };

      setState((prev) => ({
        ...prev,
        loading: false,
        error: null,
        messages: [...prev.messages, userMessage, assistantMessage],
      }));

      return { userMessage, assistantMessage };
    } catch (error) {
      console.error("Error details:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
      }
      
      const errorMessage = axios.isAxiosError(error)
        ? `Request failed: ${error.message}`
        : "Failed to get response from assistant";
        
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      message.error(errorMessage);
    }
  };

  const clearMessages = () => {
    setState((prev) => ({ ...prev, messages: [], error: null }));
  };

  return {
    messages: state.messages,
    loading: state.loading,
    error: state.error,
    sendMessage,
    clearMessages,
  };
};
