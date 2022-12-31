export interface AstrologerItemProps {
  username: string;
  city: string;
  first_name: string;
  last_name: string;
  country: string;
  num_of_reviews: number;
  rating: number;
  profile_picture: string;
  price: number;
}

export interface AstrologerReviewProps {
  key: string;
  rater: string;
  rating: number;
  review_date: string;
  review_comment: string;
}
