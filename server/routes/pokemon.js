const { Router } = require(`express`);

const router = Router();

router.get(`/:pokeId`, require(`../controllers/getPokemonById`));

router.post("/guardarPokemon", require("../controllers/createPokemon"));

module.exports = router;
