const http = require("../http/http");

module.exports = {
  //Get match
  async getList(req, res) {
    const data = req.params.data.split(",");
    let result = {};
    for (item of data) {
      const get = await http.get(`name/${item}`);
      result = {
        ...result,
        [item]: get.data.map((match) => {
          return match.name;
        }),
      };
    }
    res.json(result);
  },

  //Get one
  async getOne(req, res) {
    const result = await http.get(`name/${req.params.data}?fullText=true`);
    res.json(result.data[0].name);
  },

  //Get all
  async getMatch(req, res) {
    const result = await http.get("all");
    const countries = result.data.map((countrie) => {
      return countrie.name;
    });
    res.json(countries);
  },
};
