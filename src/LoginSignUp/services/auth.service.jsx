import axios from "axios";

const API_URL = "https://cs203back.azurewebsites.net/api/v1/auth/";
axios.defaults.withCredentials = true

//edited  
const registerUser = (fullname, email, mobile, password) => {
  return axios.post(API_URL + "signup", {
    fullname,
    email,
    mobile,
    password,
  })
};

//edited
const authenticateUser = (email, password) => {
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

//edited
const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  registerUser,
  authenticateUser,
  logout,
  getUser,
}

export default AuthService;
