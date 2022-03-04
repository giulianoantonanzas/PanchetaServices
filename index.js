const express = require("express");
const bodyParser = require("body-parser");
const ProductRoutes = require("./routes/Products");
const productImageRoute = require("./routes/ProductImage");
const User = require("./routes/User");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" })); //permite usar la ruta del local host 3000 , que es en donde levanto el react, para hacer las pruebas ( ya que sino existe un error al usar 2 http), evaluar quitar esto cuando vaya a produc.

app.listen(4800, () => {
  console.log("El servidor está inicializado en el puerto 4800");
});

//images routes
app.use(express.static(`${__dirname}/public`));

app.use("/api/products/", ProductRoutes);
app.use("/api/image-product/", productImageRoute);
app.use("/api/", User);
