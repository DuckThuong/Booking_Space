export const API_BASE_URL = "https://noted-rhino-humbly.ngrok-free.app";

export const API_KEY = {
  USER: "Authentication",
  VENUE: "Venue",
};

export const QUERY_KEY = {
  GET_USER: `${API_BASE_URL}/${API_KEY.USER}`,
  GET_VENUE: `${API_BASE_URL}/${API_KEY.VENUE}`,
  VENUE_TYPES: `${API_BASE_URL}/${API_KEY.VENUE}/GetVenueTypes`,
};
