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

export interface CreateVenueEnum {
  step?: number;
  venueTypeId?: number;
  userAvatar?: string;
  fullName?: string;
  phoneNumber?: number;
  venueLogo?: string;
  venueName?: string;
  venueDescription?: string;
  venueLocation?: string;
  venueLatitude?: string;
  venueLongtitude?: string;
}
