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
  userAvatar?: File;
  venueTypeId?: number;
  fullName?: string;
  phoneNumber?: number;
  venueLogo?: File;
  venueName?: string;
  venueDescription?: string;
  venueStreet?: string;
  venueCity?: string;
  venueDistrict?: string;
  venueLatitude?: string;
  venueLongtitude?: string;
  step?: number;
}
