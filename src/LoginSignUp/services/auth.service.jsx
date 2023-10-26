import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/auth/";
axios.defaults.withCredentials = true

const register = (fullname, email, mobile, password) => {
  return axios.post(API_URL + "signup", {
    fullname,
    email,
    mobile,
    password,
  })
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    }, 
    { withCredentials: true, }
    )
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
  
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
