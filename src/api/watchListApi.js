import axiosClient from "./axiosClient";

class WatchListApi {
  AddNew = (watchList) => {
    const url = "/api/watch-lists";
    return axiosClient.post(url, watchList);
  };

  GetByUserId = (userId) => {
    const url = `/api/watch-lists/${userId}/user`;
    return axiosClient.get(url);
  };

  Remove = (id) => {
    const url = `/api/watch-lists/${id}`;
    return axiosClient.delete(url);
  };
}

const watchListApi = new WatchListApi();
export default watchListApi;
