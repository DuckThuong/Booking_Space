import axios from "axios";
import { API_BASE_URL, API_KEY } from "./apiConfig";
import { CreateVenueEnum, LoginPayload, RegisterPayload } from "./itemApi";

export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: any,
  params?: any
) => {
  try {
    const url = `${API_BASE_URL}/${endpoint}`;
    const accessToken = localStorage.getItem("accessToken");

    const config = {
      method,
      url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      data: method !== "GET" ? data : undefined,
      params: method === "GET" ? params : undefined,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export enum OrderStateEnum {
  ALL = "ALL",
  Pending = "Pending",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export const userApi = {
  doLogin: (data: LoginPayload) =>
    apiRequest(`${API_KEY.USER}/Login`, "POST", data),
  doCreateUserByUserNameAndPassword: (userData: RegisterPayload) =>
    apiRequest(`${API_KEY.USER}/Register`, "POST", userData),
  doLogOut: () => apiRequest(`${API_KEY.USER}/LogOut`, "POST"),
  doGoogleLogin: () => apiRequest(`${API_KEY.USER}/GoogleLogin`, "GET"),
};

export const venueApi = {
  doGetListVenues: () => apiRequest(`${API_KEY.VENUE}/GetVenueTypes`, "GET"),
  doCreateVenue: (venueData: CreateVenueEnum) =>
    apiRequest(`${API_KEY.VENUE}/SignUpVenue`, "POST", venueData),
  getVenueTypes: () => apiRequest(`${API_KEY.VENUE}/GetVenueTypes`, "GET"),
  getVenueByUser: () => apiRequest(`${API_KEY.VENUE}/GetUserVenues`, "GET"),
  getVenueById: () => apiRequest(`${API_KEY.VENUE}/GetUserVenues`, "GET"),
};
