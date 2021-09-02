const { PokemonModel } = require(`../modules/pokemon`);

const CreatePokemon = async (req, res) => {
  try {
    const { id, nombre, tipos } = req.body;
//  
    const pokemon = await PokemonModel.create({
      id: id,
      nombre: nombre,
      tipos: tipos,
    })
      .then((pokemonGuardado) => {
        res.json({ message: `Pokemon numero ${pokemonGuardado.id} guardado` });
      })
      .catch((err) => {
        res.json({ message: `${err}Error erroneo 1` });
      });
    /*   res.json(pokemon); */
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: `Error erroneo 2` });
  }
};

module.exports = CreatePokemon;
