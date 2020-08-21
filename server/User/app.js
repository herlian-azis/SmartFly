require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const port = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`this app running on port ${port}`);
});
