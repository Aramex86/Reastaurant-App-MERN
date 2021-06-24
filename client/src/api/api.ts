import {
  AddNoteType,
  AddReview,
  LoginType,
  LogoutUserType,
  ProfileBgType,
  RestaurantType,
} from "./../types/types";
import axios from "axios";
import { RegisterType, ReviewsType } from "../types/types";

export const MY_API = "AIzaSyBhr_PmeQMzMCoERPzs3cfNNzuJ89Ld_Ss";

// axios.defaults.withCredentials = true;
const instance = axios.create({
  // baseURL: `http://localhost:5000/api/v1/`,
  baseURL: `https://secret-woodland-40370.herokuapp.com`,
  withCredentials: true,
});

export const restaurantsApi = {
  getRestaurants() {
    return instance
      .get(`restaurants/`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  getRestaurant(id: string) {
    return instance
      .get(`restaurants/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err.message));
  },
  updateRestaurant(data: ReviewsType, id: string) {
    return instance
      .post(`restaurants/update/${id}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err.message));
  },
  addRestaurant(data: any, photo: any) {
    const formData = new FormData();

    formData.append("photo", photo);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("cuisine_type", data.cuisine_type);
    formData.append("lat", data.lat);
    formData.append("lng", data.lng);
    formData.append("neighborhood", data.neighborhood);

    console.log(formData);
    return instance
      .post("/restaurants/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err.message));
  },
};

export const usersApi = {
  registerUser(data: RegisterType) {
    return instance
      .post("users/register", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  },
  loginUser(data: LoginType) {
    return instance
      .post(`users/login`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.meesage;
      });
  },
  authUser() {
    return instance
      .get("users/auth")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  },
  logoutUser() {
    return instance
      .get<LogoutUserType>("users/logout")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },
  likedRes(data: RestaurantType, id: string) {
    return instance
      .post<RestaurantType>(`users/like/${id}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },
  deleteLikedRes(userId: string, resId: string) {
    return instance
      .post(`users/deletelike/${resId}`, { userId: userId })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },
  addReviewToProfile(data: AddReview) {
    return instance
      .post(`users/addreview`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },

  getReview(id: string) {
    return instance
      .get(`users/reviews/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
  },
  getLikedRest(id: string) {
    return instance
      .get(`users/liked/${id}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => err);
  },
  userPhotoUpload(data: any, id: string) {
    const formData = new FormData();

    formData.append("avatar", data);

    return instance
      .post(`users/profile/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return instance
            .get(`users/profile/image/${id}`)
            .then((res) => {
              console.log(res.data);
              return `http://localhost:5000/${res.data}`;
            })
            .catch((err) => err);
        }
      })
      .catch((err) => err);
  },
  userGetImage(id: string) {
    return instance
      .get(`users/profile/image/${id}`)
      .then((res) => {
        return `http://localhost:5000/${res.data}`;
      })
      .catch((err) => err);
  },
  selectedBg(id: string, data: ProfileBgType) {
    return instance
      .post(`users/profile/addbg/${id}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
  },
  addUserNote(id: string, data: AddNoteType) {
    return instance
      .post(`users/profile/addnote/${id}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
  },
  getUserNote(id: string) {
    return instance
      .get(`users/profile/getnote/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
  },
  deleteNone(userId: string, id: string) {
    return instance
      .post(`users/profile/deletenote/${userId}`, { _id: id })
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
  },
};

export const profileBgApi = {
  getBg() {
    return instance
      .get(`profilebg/setbg`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
  },
  getSelectedBg(id: string) {
    return instance
      .get(`profilebg/setprofilebg/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },
};
