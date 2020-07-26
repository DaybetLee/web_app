const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const ip = require("ip");
const express = require("express");
const config = require("config");
const cors = require("cors");

const company = require("./routes/company");
const agent = require("./routes/agent");
const policyholder = require("./routes/policyholder");
const policy = require("./routes/policy");
const user = require("./routes/user");
const superadmin = require("./routes/superadmin");
const authentication = require("./routes/authentication");

// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL ERROR: jwtPrivateKey is not defined.");
//   process.exit(1);
// }
// $export vidly_jwtPrivateKey=mySecureKey

mongoose
  .connect("mongodb://localhost/IPM", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 10443;
app.listen(port, () =>
  console.log(`Server started http://${ip.address()}:${port}`)
);

app.use("/v1/api/company", company);
app.use("/v1/api/agent", agent);
app.use("/v1/api/policyholder", policyholder);
app.use("/v1/api/policy", policy);
app.use("/v1/api/user", user);
app.use("/v1/api/superadmin", superadmin);
app.use("/v1/api/authentication", authentication);
