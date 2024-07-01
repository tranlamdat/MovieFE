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
    const url = `/api/actors/${actor.actorId}`;
    return axiosClient.put(url, actor);
  };

  Remove = (id) => {
    const url = `/api/actors/${id}`;
    return axiosClient.delete(url);
  };
}

const actorApi = new ActorApi();
export default actorApi;
