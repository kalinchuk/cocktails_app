import BaseApi from "./BaseApi";

const DrinksApi = {
  search: (query, index, limit) => {
    return BaseApi.get(
      `/search`,
      { query, index, limit }
    );
  },

  details: (id) => {
    return BaseApi.get(
      `/detail?id=${id}`
    );
  }
};

export default DrinksApi;