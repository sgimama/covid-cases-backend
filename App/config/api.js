const config = {
    baseURL: "https://covid-api.mmediagroup.fr/v1",
    headers: {
        "Content-type": "application/json",
      },
      urls: {
        GET_CASES: "/cases",
        GET_HISTORY: "/history",
        GET_VACCINES: "/vaccines",
      },

}

module.exports = config;