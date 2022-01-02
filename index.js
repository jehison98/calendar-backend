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

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
