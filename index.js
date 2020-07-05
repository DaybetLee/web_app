const mongoose = require("mongoose");
const ip = require("ip");
const express = require("express");

const company = require("./routes/company");

mongoose
  .connect("mongodb://localhost/IPM", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const app = express();

const port = process.env.PORT || 10443;
app.listen(port, () =>
  console.log(`Server started http://${ip.address()}:${port}`)
);

app.use("/v1/api/companies", company);
