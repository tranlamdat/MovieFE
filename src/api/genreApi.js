import axiosClient from "./axiosClient";

class GenreApi {
  getAll = () => {
    const url = "/api/genres";
    return axiosClient.get(url);
  };

  GetOne = (id) => {
    const url = `/api/genres/${id}`;
    return axiosClient.get(url);
  };

  AddNew = (genre) => {
    const url = "/api/genres";
    return axiosClient.post(url, genre);
  };

  Update = (genre) => {
    const url = `/api/genres/${genre.genreId}`;
    return axiosClient.put(url, genre);
  };

  Remove = (id) => {
    const url = `/api/genres/${id}`;
    return axiosClient.delete(url);
  };
}

const genreApi = new GenreApi();
export default genreApi;
