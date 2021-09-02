const express = require("express");
const cors = require("cors"); // This is new

const PORT = 5000;
const app = express();
require(`./Config/connectToDB`)();

app.use(express.json());
app.use(cors());

app.use(`/api`, require(`./routes/api`)); // Anclaje a la ruta api

app.listen(PORT, () => console.log(`1/2: El servidor esta en PORT: ${PORT}`));
