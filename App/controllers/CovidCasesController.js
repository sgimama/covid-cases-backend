const http = require("../http/http");
const Config = require("../config/api");

module.exports = {
  //Get match
  async getCases(req, res) {
    const { country } = req.body;

    const [confirmed, deaths, vaccines] = await Promise.all([
      http.get(Config.urls.GET_HISTORY, {
        params: {
          country: country,
          status: "confirmed",
        },
      }),
      http.get(Config.urls.GET_HISTORY, {
        params: {
          country: country,
          status: "deaths",
        },
      }),
      http.get(Config.urls.GET_VACCINES, {
        params: {
          country: country,
        },
      }),
    ]);

    const historyConfirmed = confirmed.data.All.dates;
    const historyDeaths = deaths.data.All.dates;
    const resultVaccines = vaccines.data.All;

    const history = [];
    for (let day in historyConfirmed) {
      const dataDay = {
        day: day,
        confirmed: historyConfirmed[day],
        deaths: historyDeaths[day],
      };
      history.push(dataDay);
    }

    const data = {
      history: history,
      vaccines: {
        vaccinated: resultVaccines.people_vaccinated,
        partially_vaccinated: resultVaccines.people_partially_vaccinated,
      }
    }

    res.json(data);
  },
};
