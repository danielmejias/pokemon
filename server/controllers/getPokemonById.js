const { PokemonModel } = require(`../modules/pokemon`);

const PokeByID = async (req, res) => {
  try {
    const { pokeId } = req.params;
    console.log(pokeId);

    const pokemon = await PokemonModel.find({ id: pokeId });

    res.json(pokemon);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: `Error erroneo` });
  }
};

module.exports = PokeByID;
