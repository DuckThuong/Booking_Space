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
  userAvatar?: File | string;
  fullName?: string;
  phoneNumber?: number;
  venueLogo?: File | string;
  venueName?: string;
  venueDescription?: string;
  venueStreet?: string;
  venueCity?: string;
  venueDistrict?: string;
  venueLatitude?: string;
  venueLongtitude?: string;
}
