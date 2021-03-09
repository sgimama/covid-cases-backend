const axios = require("axios");
const Config = require("../config/api");

const http = axios.create({
  baseURL: Config.baseURL,
  headers: Config.headers,
});

module.exports = http;