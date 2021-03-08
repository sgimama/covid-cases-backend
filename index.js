const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./App/routes/api");
const sequelize = require("./App/database/db");

const PORT = 3001;

const app = express();
require("./App/database/asociations");

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.use("/api", apiRouter);
// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("tablas creadas");
    })
    .catch((error) => {
      console.log(`Se ha producido un error ${error}.`);
    });
});
