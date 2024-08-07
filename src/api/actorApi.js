import axiosClient from "./axiosClient";

class ActorApi {
  getAll = () => {
    const url = "/api/actors";
    return axiosClient.get(url);
  };

  GetOne = (id) => {
    const url = `/api/actors/${id}`;
    return axiosClient.get(url);
  };

  AddNew = (actor) => {
    const url = "/api/actors";
    return axiosClient.post(url, actor);
  };

  Update = (actor) => {
    const url = `/api/actors/${actor.get('actorId')}`;
    return axiosClient.put(url, actor);
  };

  Remove = (id) => {
    const url = `/api/actors/${id}`;
    return axiosClient.delete(url);
  };

  Search = (query) => {
    const url = `/api/actors/search?name=${query}`;
    return axiosClient.get(url);
  };
}

const actorApi = new ActorApi();
export default actorApi;
