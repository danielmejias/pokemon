const { Router } = require(`express`);

const router = Router();

router.use(`/pokemon`, require(`./pokemon`)); // Anclaje con el archivo de rutas pokemon.js

module.exports = router;
