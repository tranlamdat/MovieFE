import axiosClient from "./axiosClient";

class MovieActorApi {
  getAll = () => {
    const url = "/api/movie-actors";
    return axiosClient.get(url);
  };

  GetOne = (id) => {
    const url = `/api/movie-actors/${id}`;
    return axiosClient.get(url);
  };

  AddNew = (movie) => {
    const url = "/api/movie-actors";
    return axiosClient.post(url, movie);
  };

  Update = (movie) => {
    const url = `/api/movie-actors/${movie.movieId}`;
    return axiosClient.put(url, movie);
  };

  Remove = (id) => {
    const url = `/api/movie-actors/${id}`;
    return axiosClient.delete(url);
  };
}

const movieActorApi = new MovieActorApi();
export default movieActorApi;
