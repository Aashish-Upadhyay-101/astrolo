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
  price: number;
}

export interface MessageInterface {
  id: string;
  from_user: UserType;
  to_user: UserType;
  conversation: string;
  content: string;
  read: boolean;
  created_at: string;
}

export interface ConversationListInterface {
  id: string;
  name: string;
  last_message: MessageInterface;
  other_user: UserType;
}

export interface AppointmentResponse {
  customer: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
  };
  astrologer: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
  };
  location: string;
  start_date: string;
  start_time: string;
  status: string;
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

export interface AppointmentUpdate {
  username: string;
  status: string;
}
