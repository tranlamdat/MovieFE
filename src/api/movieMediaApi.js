import axiosClient from "./axiosClient";

class MovieMediaApi {
  AddNew = (movieMedia) => {
    const url = "/api/movie-medias";
    return axiosClient.post(url, movieMedia);
  };

  Update = (id, movieMedia) => {
    const url = `/api/movie-medias/${id}`;
    return axiosClient.put(url, movieMedia);
  };

  Remove = (id) => {
    const url = `/api/movie-medias/${id}`;
    return axiosClient.delete(url);
  };
}

const movieMediaApi = new MovieMediaApi();
export default movieMediaApi;
