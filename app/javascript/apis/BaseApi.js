import React from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api"
});

const BaseApi = {
  get: (path, params) => {
    var uri = `${path}?${buildQuery(params)}`;
    return client.get(uri);
  }
};

const buildQuery = (params) => {
  if (!params) {
    return null;
  }

  var esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => (
      Array.isArray(params[k]) ? (
        params[k].map(i => (k + "=" + i))
      ) : (k + "=" + (params[k] ? esc(params[k]) : ""))
    ))
    .reduce((acc, val) => acc.concat(val), [])
    .join("&");
};

export default BaseApi;