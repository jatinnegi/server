export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdatePayload {
  countryCode?: string;
  phoneNumber?: string;
  state?: string;
  city?: string;
  address?: string;
  zipCode?: string;
}
