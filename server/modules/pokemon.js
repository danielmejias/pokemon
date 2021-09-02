const mongoose = require(`mongoose`);
const { Schema, model } = mongoose;

const PokemonSchema = new Schema({
  id: {
    type: Number,
    required: [true, `el pokemon necesita un id`],
  },

  nombre: {
    type: String,
    required: [true, `el pokemon necesita un nombre`],
  },

  tipos: {
    type: Array,
    required: [true, `el pokemon necesita tipos`],
  },
});

const PokemonModel = model(`pokemon`, PokemonSchema, `Pokemones`);

module.exports = { PokemonModel, PokemonSchema };
