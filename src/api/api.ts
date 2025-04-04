import axios from "axios";
import { API_BASE_URL, API_KEY } from "./apiConfig";
import { CreateVenueEnum, LoginPayload, RegisterPayload } from "./constants";

const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: any,
  params?: any
) => {
  try {
    const url = `${API_BASE_URL}/${endpoint}`;
    console.log("API Request URL:", url);

    const config = {
      method,
      url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      data: method !== "GET" ? data : undefined,
      params: method === "GET" ? params : undefined,
    };

    console.log("API Request Config:", config);
    const response = await axios(config);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
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
  doCreateUserByUserNameAndPassword: (userData: RegisterPayload) =>
    apiRequest(`${API_KEY.USER}/Register`, "POST", userData),
  doUserSubmitLogin: (userData: LoginPayload) =>
    apiRequest(`${API_KEY.USER}/Login`, "POST", userData),
  doGoogleLogin: () => apiRequest(`${API_KEY.USER}/GoogleLogin`, "GET"),
};

export const venueApi = {
  doGetListVenues: () => apiRequest(`${API_KEY.VENUE}/GetVenueTypes`, "GET"),
  doCreateVenue: (venueData: CreateVenueEnum) =>
    apiRequest(`${API_KEY.VENUE}/SignUpVenue`, "POST", venueData),
  getVenueTypes: () => apiRequest(`${API_KEY.VENUE}/GetVenueTypes`, "GET"),
};
