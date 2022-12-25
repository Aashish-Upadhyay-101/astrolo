export interface UserTokenResponse {
  access: string;
  refresh: string;
  message?: string;
}

export interface UserType {
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
  };
  phone_number: string;
  country: string;
  gender: string;
  zip_code: string;
  city: string;
  about_me: string;
  profile_picture: string;
  profile_intro_video: string;
  profile_type: string;
}

export interface RegisterUserFieldType {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}
