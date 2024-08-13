import axiosClient from "./axiosClient";

class UserApi {
  getAll = () => {
    const url = "/api/users";
    return axiosClient.get(url);
  };

  GetOne = (id) => {
    const url = `/api/users/${id}`;
    return axiosClient.get(url);
  };

  AddNew = (user) => {
    const url = "/api/users";
    return axiosClient.post(url, user);
  };

  Update = (user) => {
    const url = `/api/users/${user.get('userId')}`;
    return axiosClient.put(url, user);
  };

  Remove = (id) => {
    const url = `/api/users/${id}`;
    return axiosClient.delete(url);
  };

  ChangePassword = (id, user) => {
    const url = `/api/users/${id}/change-password`;
    return axiosClient.put(url, user);
  };
}

const userApi = new UserApi();
export default userApi;
