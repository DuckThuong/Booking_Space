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
  UserAvatar?: string;
  VenueTypeId?: number;
  PhoneNumber?: number;
  Logo?: string;
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

export interface Amenities {
  id: number;
  name: string;
  selected: boolean;
  icon: JSX.Element;
}
