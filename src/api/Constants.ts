export interface RegisterPayload {
  email: string;
  password: string;
  userName: string;
  fullName: string;
}
export interface LoginPayload {
  userName: string;
  password: string;
}

export interface VenuePayload {
  venueTypeId: number;
  name: string;
  description: string;
  image: string;
}
