export const API_BASE_URL = "https://coworkingspace-production-1d94.up.railway.app";

export const API_KEY = {
  USER: "Authentication",
  VENUE: "Venue",
};

export const QUERY_KEY = {
  GET_USER: `${API_BASE_URL}/${API_KEY.USER}`,
  GET_VENUE: `${API_BASE_URL}/${API_KEY.VENUE}`,
  VENUE_TYPES: `${API_BASE_URL}/${API_KEY.VENUE}/GetVenueTypes`,
};
