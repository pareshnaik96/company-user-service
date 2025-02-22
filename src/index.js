const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const routes = require("./routes");
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.json());
connectDB();

app.use("/", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
