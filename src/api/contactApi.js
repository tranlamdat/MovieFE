import axiosClient from "./axiosClient";

class ContactApi {
  getAll = () => {
    const url = "/api/contacts";
    return axiosClient.get(url);
  };

  GetOne = (id) => {
    const url = `/api/contacts/${id}`;
    return axiosClient.get(url);
  };

  AddNew = (contact) => {
    const url = "/api/contacts";
    return axiosClient.post(url, contact);
  };

  Update = (contact) => {
    const url = `/api/contacts/${contact.contactId}`;
    return axiosClient.put(url, contact);
  };

  Remove = (id) => {
    const url = `/api/contacts/${id}`;
    return axiosClient.delete(url);
  };
}

const contactApi = new ContactApi();
export default contactApi;
