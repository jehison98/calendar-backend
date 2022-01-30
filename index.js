const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

//console.log(process.env);
//Crear el servidor de express
const app = express();

//Data Base
dbConnection();

//CORS
app.use(cors());

//Directorio Publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//Si no encuntra alguna ruta de las anteriores redirige a la ruta index.html
app.use(function (req, res) {
  // Invalid request
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
