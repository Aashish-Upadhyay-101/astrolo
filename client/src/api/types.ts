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
  id: string;
  phone_number: string;
  country: string;
  gender: string;
  zip_code: string;
  city: string;
  about_me: string;
  profile_picture: string;
  profile_intro_video: string;
  profile_type: string;
  num_of_reviews: number;
  rating: number;
}

export interface ReviewType {
  id: string;
  rater: string;
  astrologer: string;
  created_at: string;
  rating: number;
  review_comment: string;
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

export interface AppointmentBookedResponseType {
  message: string;
}

export interface AppointmentBooking {
  astrologer_username: string;
  start_date: string;
  start_time: string;
}
