import axiosClient from "./axiosClient";

class MovieApi {
  getAll = () => {
    const url = "/api/movies";
    return axiosClient.get(url);
  };

  OpenThisWeek = () => {
    const url = "/api/movies/open-this-week";
    return axiosClient.get(url);
  };

  ComingSoon = () => {
    const url = "/api/movies/coming-soon";
    return axiosClient.get(url);
  };

  RelatedMovie = (genreId) => {
    const url = `/api/movies/related/${genreId}`;
    return axiosClient.get(url);
  }

  UpdateView = (id) => {
    const url = `/api/movies/view/${id}`;
    return axiosClient.put(url);
  };

  Search = (query, type) => {
    const url = `/api/movies/search?name=${query}&type=${type}`;
    return axiosClient.get(url);
  };

  TopMostView = (top) => {
    const url = `/api/movies/top-most-view?top=${top}`;
    return axiosClient.get(url);
  };

  TopMovieLike = (top) => {
    const url = `/api/movies/top-movie-like?top=${top}`;
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
