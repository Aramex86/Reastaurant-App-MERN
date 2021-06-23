export interface RestaurantType {
  _id: string;
  id: number;
  name: string;
  address: string;
  cuisine_type: string;
  latlng: Latlngtype;
  neighborhood: string;
  reviews: Array<ReviewsType>;
  image: string;
}
export interface AddRestaurantType {
  name: string;
  address: string;
  cuisine_type: string;
  lat: string;
  lng: string;
  neighborhood: string;
  photo?: File;
}

interface Latlngtype {
  lat: number;
  lng: number;
}

export interface ReviewsType {
  _id?: string;
  name: string;
  date?: string;
  raiting: number;
  comments: string;
  createdAt: string;
}

export interface SendCommentType {
  name: string;
  raiting: number;
  comments: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordCheck?: string;
}

export interface RegUserRsponseType {
  success: boolean;
  message?: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}

export interface LoginResponseType {
  loginSuccess: boolean;
  message: string;
}

export type IsAuthType = {
  _id: string;
  isAuth: boolean;
  email: string;
  name: string;
  lastname: string;
  likedRest: RestaurantType[];
  reviews: AddReview[];
  image: string;
  selectedBg: ProfileBgType;
};

export interface LogoutUserType {
  success: boolean;
}

export interface IHistory {
  review: ReviewsType[];
}

export type AddReview = {
  id: string;
  restName: string;
  raiting: number;
  comment: string;
};

export type PhotoType = {
  lastModified: number;
  lastModifiedDate: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type ProfileBgType = {
  _id: string;
  color: string;
  bgimage: string;
};

export type AddNoteType = {
  status: string;
  title: string;
  note: string;
};

export type NoteType = {
  status: string;
  title: string;
  note: string;
  _id: string;
  date: string;
};
