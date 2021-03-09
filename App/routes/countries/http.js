const axios = require("axios");
const Config = require("./apiConfig");

const http = axios.create({
  baseURL: Config.baseURL,
  headers: Config.headers,
});

module.exports = http;