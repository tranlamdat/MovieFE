import axiosClient from "./axiosClient";

class CountryApi {
  getAll = () => {
    const url = "https://restcountries.com/v3.1/all";
    return axiosClient.get(url);
  };
}

const countryApi = new CountryApi();
export default countryApi;
