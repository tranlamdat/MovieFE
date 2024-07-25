import axiosClient from "./axiosClient";

class MovieMediaApi {
  AddNew = (actor) => {
    const url = "/api/movie-medias";
    return axiosClient.post(url, actor);
  };

  Remove = (id) => {
    const url = `/api/movie-medias/${id}`;
    return axiosClient.delete(url);
  };
}

const movieMediaApi = new MovieMediaApi();
export default movieMediaApi;
