import axiosClient from "./axiosClient";

class AuthApi {
  register(user) {
    const url = "/api/auth/register";
    return axiosClient.post(url, user);
  }

  login(credentials) {
    const url = "/api/auth/login";
    return axiosClient.post(url, credentials);
  }
}

const authApi = new AuthApi();
export default authApi;
