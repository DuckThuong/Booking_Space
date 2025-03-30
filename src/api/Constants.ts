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
  avartar?: string;
  phoneNumber?: number;
  companyLogo?: string;
  companyName?: string;
  companyDescription?: string;
  companyLocation?: string;
  companyLatitue?: string;
  companyLongtitue?: string;
}
