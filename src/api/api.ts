import axios from "axios";
import { API_BASE_URL, API_KEY } from "./apiConfig";
import { CreateVenueEnum, LoginPayload, RegisterPayload } from "./constants";

const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: any,
  params?: any
) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  const config = {
    method,
    url,
    headers: {
      Accept: "application/json",
    },
    data: method !== "GET" ? data : undefined,
    params: method === "GET" ? params : undefined,
  };

  const { data: responseData } = await axios(config);
  return responseData;
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
    apiRequest(`${API_KEY.VENUE}/RegisterVenue`, "POST", venueData),
};
