const http = require("../http/http");

module.exports = {
  //Get match
  async getMatch(req, res) {
    let result = [];
    let match = {};

    const data = req.params.data.split(",");
    for (item of data) {
      try {
        const get = await http.get(`name/${item}`);
        match = {
          search: item,
          match: get.data.map((match) => {
            return match.name;
          }),
        };
        result.push(match);
      } catch (err) {
        match = {
          search: item,
          match: ["Not found"],
        };
        result.push(match);
      }
    }
    res.json({ result: "OK", data: result });
  },

  //Get one
  async getOne(req, res) {
    try {
      const result = await http.get(`name/${req.params.data}?fullText=true`);
      res.json({ result: "OK", data: result.data[0].name });
    } catch (err) {
      res.json({ result: "KO" });
    }
  },

  //Get all
  async getList(req, res) {
    const result = await http.get("all");
    const countries = result.data.map((country) => {
      return {
        name: country.name,
        flag: country.flag,
        region: country.region,
      };
    });
    res.json(countries);
  },
};
