const express = require("express");
const cors = require("cors");
const apiRouter = require("./App/routes/api");
const sequelize = require("./App/database/db");

const PORT = process.env.PORT || 3000;

const app = express();
require("./App/database/asociations");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.use("/api", apiRouter);
// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

  sequelize
    .sync({ force: true })
    .then(() => {
      console.log("tables makes");
    })
    .catch((error) => {
      console.log(`error ${error}.`);
    });
});
  