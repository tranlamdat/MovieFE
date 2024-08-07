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
