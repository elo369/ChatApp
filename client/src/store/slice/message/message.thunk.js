import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance.js";

export const sendMessageThunk  = createAsyncThunk(
    "message/send",
    async ({ receiverId, message }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(`/message/send/${receiverId}`, {
          message
        });
        return response.data;
      } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        return rejectWithValue(errorOutput);
      }
    }
  );

export const getMessageThunk = createAsyncThunk(
    "message/get",
    async ({ receiverId }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/message/messages/${receiverId}`);
        return response.data;
      } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage;
        return rejectWithValue(errorOutput);
      }
    }
  );