import axiosClient from "./axiosClient";

class DirectorApi {
  getAll = () => {
    const url = "/api/directors";
    return axiosClient.get(url);
  };

  GetOne = (id) => {
    const url = `/api/directors/${id}`;
    return axiosClient.get(url);
  };

  AddNew = (director) => {
    const url = "/api/directors";
    return axiosClient.post(url, director);
  };

  Update = (director) => {
    const url = `/api/directors/${director.directorId}`;
    return axiosClient.put(url, director);
  };

  Remove = (id) => {
    const url = `/api/directors/${id}`;
    return axiosClient.delete(url);
  };
}

const directorApi = new DirectorApi();
export default directorApi;
