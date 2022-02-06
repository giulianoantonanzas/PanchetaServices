const express = require("express");
const bodyParser = require("body-parser");
const ProductRoutes = require("./routes/Products");

const uploader = require("./middlewares/uploader");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(4800, () => {
  console.log("El servidor está inicializado en el puerto 4800");
});

app.use("/api/products/", ProductRoutes);
