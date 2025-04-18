import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utilities/axiosInstance.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("user/login", {
        userName,
        password,
      });
      toast.success("Login Successfull!");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/signup",
  async ({ fullName, userName, password, gender }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        fullName,
        userName,
        password,
        gender,
      });
      toast.success("Account created successfully!!");
      console.log("regithunk",response.data.success)
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success("Logout successfull!!");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getProfileThunk = createAsyncThunk(
  "user/getprofile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/getprofile");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/getOtherusers");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);



