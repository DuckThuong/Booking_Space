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
  UserAvatar?: File;
  VenueTypeId?: number;
  PhoneNumber?: number;
  Logo?: File;
  Name?: string;
  Description?: string;
  Address?: VenueAddress;
  step?: number;
}

export interface VenueAddress {
  Street?: string;
  City?: string;
  District?: string;
  Latitude?: string;
  Longitude?: string;
}

