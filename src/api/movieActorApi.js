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

  AddNew = (movieActor) => {
    const url = "/api/movie-actors";
    return axiosClient.post(url, movieActor);
  };

  Update = (movieActor) => {
    const url = `/api/movie-actors/${movieActor.movieActorId}`;
    return axiosClient.put(url, movieActor);
  };

  Remove = (id) => {
    const url = `/api/movie-actors/${id}`;
    return axiosClient.delete(url);
  };
}

const movieActorApi = new MovieActorApi();
export default movieActorApi;
