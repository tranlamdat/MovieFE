import axiosClient from "./axiosClient";

class MovieApi {
  getAll = () => {
    const url = "/api/movies";
    return axiosClient.get(url);
  };

  GetOne = (id) => {
    const url = `/api/movies/${id}`;
    return axiosClient.get(url);
  };

  AddNew = (movie) => {
    const url = "/api/movies";
    return axiosClient.post(url, movie);
  };

  Update = (movie) => {
    const url = `/api/movies/${movie.movieId}`;
    return axiosClient.put(url, movie);
  };

  Remove = (id) => {
    const url = `/api/movies/${id}`;
    return axiosClient.delete(url);
  };
}

const movieApi = new MovieApi();
export default movieApi;
