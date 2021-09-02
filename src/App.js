import React, { useState } from "react";
import PokemonCard from "./components/PokemonCard";
import FormularioIngreso from "./components/FormularioIngreso";
import axios from "axios";
import {Router, Link, navigate} from "@reach/router";

import "./App.scss";

function App() {
  let pokémon = [
    { id: 1, name: "Bulbasaur", types: ["poison", "grass"] },
    { id: 5, name: "Charmeleon", types: ["fire"] },
    { id: 9, name: "Blastoise", types: ["water"] },
    { id: 12, name: "Butterfree", types: ["bug", "flying"] },
    { id: 16, name: "Pidgey", types: ["normal", "flying"] },
    { id: 23, name: "Ekans", types: ["poison"] },
    { id: 24, name: "Arbok", types: ["poison"] },
    { id: 25, name: "Pikachu", types: ["electric"] },
    { id: 37, name: "Vulpix", types: ["fire"] },
    { id: 52, name: "Meowth", types: ["normal"] },
    { id: 63, name: "Abra", types: ["psychic"] },
    { id: 67, name: "Machamp", types: ["fighting"] },
    { id: 72, name: "Tentacool", types: ["water", "poison"] },
    { id: 74, name: "Geodude", types: ["rock", "ground"] },
    { id: 87, name: "Dewgong", types: ["water", "ice"] },
    { id: 98, name: "Krabby", types: ["water"] },
    { id: 115, name: "Kangaskhan", types: ["normal"] },
    { id: 122, name: "Mr. Mime", types: ["psychic"] },
    { id: 133, name: "Eevee", types: ["normal"] },
    { id: 144, name: "Articuno", types: ["ice", "flying"] },
    { id: 145, name: "Zapdos", types: ["electric", "flying"] },
    { id: 146, name: "Moltres", types: ["fire", "flying"] },
    { id: 148, name: "Dragonair", types: ["dragon"] },
  ];

  let tipos = [
    { types: "poison", color: "#a5c383" },
    { types: "grass", color: "#a5c383" },
    { types: "fire", color: "#ca4a40" },
    { types: "water", color: "#3f51b5" },
    { types: "bug", color: "white" },
    { types: "flying", color: "white" },
    { types: "normal", color: "white" },
    { types: "electric", color: "yellow" },
    { types: "psychic", color: "#abcede" },
    { types: "fighting", color: "brown" },
    { types: "rock", color: "brown" },
    { types: "ground", color: "brown" },
    { types: "ice", color: "#3f51b5" },
  ];
  let uniqid = require("uniqid");

  // State para un Pokemon
  const [contentpoke, setContentpoke] = useState([]);

  const [estadopoke, setEstadopoke] = useState(false);

  const [cartasPoke1, setCartasPoke1] = useState([]);
  const [cartasPoke2, setCartasPoke2] = useState([]);

  /* useEffect(()=> {
     fetchData();
 }, [data]);*/

  // page will reload whenever data is updated.

  const [newPokemon, setNewPokemon] = useState({
    id: "",
    name: "",
    types: "",
  });

  const guardarPokemon = () => {
    let objetoPokemon = {
      id: parseInt(newPokemon.id),
      name: newPokemon.name,
      types: newPokemon.types.split(","),
    };
    pokémon.push(objetoPokemon);
    /*     const api = axios
       .get(`https://pokeapi.co/api/v2/pokemon/${objetoPokemon.id}`)
       .then((response) => {
         console.log(response);
       });  */
  };

  const fromApiToDB = () => {
    for (let i = 1; i <= 890; i++) {
      const api = axios
        .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => {
          const tipos = response.data.types.map((item) => item.type.name);
          axios
            .post(`http://localhost:5000/api/pokemon/guardarPokemon`, {
              id: response.data.id,
              nombre: response.data.name,
              tipos: tipos,
            })
            .then((res) => {
              console.log(res);
            });
        });
    }
  };
  /*  useEffect(() => {
      let mounted = true;
      getList()
        .then(items => {
          if(mounted) {
            setList(items)
          }
        })
      return () => mounted = false;*/

  const repartirPokemon = () => {
    //    useEffect(() => {
    //controlar pokemon repetidos para un jugador.
    //890 pokemones
    const listaPokemonesId = [];
    const listaPokemonCards = [];
    for (let i = 0; i < 10; i++) {
      listaPokemonesId.push(Math.floor(Math.random() * 890));
    }
    listaPokemonesId.map((pokeid) => {
      const api = axios
        .get(`http://localhost:5000/api/pokemon/${pokeid}`)
        .then((response) => {
          //const tipos = response.data.types.map((item) => item.type.name);
          listaPokemonCards.push({
            id: response.data[0].id,
            name: response.data[0].nombre,
            types: response.data[0].tipos,
          });
          console.log(tipos.toString());
          if (listaPokemonCards.length === 10) {
            const listaPokeOrdenada = ordenarPokemones(listaPokemonCards);
            setCartasPoke1(listaPokeOrdenada.slice(0, 5));
            setCartasPoke2(listaPokeOrdenada.slice(5, 10));
            //navigate("/cargarDb");  IMPLEMENTAR ESTO SIN QUE SE ROMPA
          }
        });
    });
    //  }, [])
  };

  function ordenarPokemones(listaPokemones){
      // array temporal contiene objetos con posición y valor de ordenamiento
      var mapped = listaPokemones.map(function(el, i) {
        return { index: i, value: el };
      });

      // ordenando el array mapeado que contiene los valores reducidos
      mapped.sort(function(a, b) {
        if (a.value.types > b.value.types) {
          return 1;
        }
        if (a.value.types < b.value.types) {
          return -1;
        }
        return 0;
        });

      // contenedor para el orden resultante
      var result = mapped.map(function(el){
        return listaPokemones[el.index];
      });
      return result;
    }

  let poke = {
    id: contentpoke[0],
    name: contentpoke[1],
    tipo: contentpoke[2],
    bg: contentpoke[3],
    url: contentpoke[4],
  };

  const ButtonFromApitoDb = (props) => {
    const {primerPokemon} = props;
    return (
      <div path="/cargarDb">
        <button onClick={fromApiToDB}>
          Guardar Pokemon de la Api en la Base de Datos
        </button>
        {primerPokemon}
        <Link to="/">Volver al Home</Link>
      </div>
    );
  };

  const Home = () => {
    return (
      <div path="/">
        <>
          <Link to="/cargarDb">Cargar Base de Datos</Link>
          {estadopoke ? (
            <div className="PokeContainer__card-select">
              <h3>
                {poke.name} Nº {poke.id}
              </h3>
              <div
                className={`PokeContainer__card-circle`}
                style={{ background: poke.bg }}
              >
                <img src={poke.url} alt={poke.name} />
              </div>
              <h5>Tipo: {poke.tipo}</h5>
            </div>
          ) : null}

          <div className="PokeContainer">
            <div className="Jugador1 PokeContainer">
              Jugador1
              {cartasPoke1.map((unPokemon) => (
                <PokemonCard
                  key={uniqid()}
                  id={unPokemon.id}
                  name={unPokemon.name}
                  types={unPokemon.types.toString()}
                  bg={tipos
                    .filter((unTipo) => unTipo.types === unPokemon.types[0])
                    .map((tipoElegido) => tipoElegido.color)}
                  unPokemon={unPokemon}
                  selectPokemon={
                    // Se manda una props que contiene una funcion ( Arrow function )
                    (contentpoke) => setContentpoke(contentpoke)
                  }
                  onOff={(estadopoke) => setEstadopoke(estadopoke)}
                />
              ))}
            </div>
            <button onClick={repartirPokemon}>Repartir Cartas</button>
            <div className="Jugador2 PokeContainer">
              Jugador2
              {cartasPoke2.map((unPokemon) => (
                <PokemonCard
                  key={uniqid()}
                  id={unPokemon.id}
                  name={unPokemon.name}
                  types={unPokemon.types.toString()}
                  bg={tipos
                    .filter((unTipo) => unTipo.types === unPokemon.types[0])
                    .map((tipoElegido) => tipoElegido.color)}
                  unPokemon={unPokemon}
                  selectPokemon={
                    // Se manda una props que contiene una funcion ( Arrow function )
                    (contentpoke) => setContentpoke(contentpoke)
                  }
                  onOff={(estadopoke) => setEstadopoke(estadopoke)}
                />
              ))}
            </div>
            {/* <FormularioIngreso
          guardarPokemon={guardarPokemon}
          newPokemon={newPokemon}
          setNewPokemon={setNewPokemon}
        /> */}
            {console.log(cartasPoke1)}
          </div>
        </>
      </div>
    );
  };

  return (
    <>
    <Router>
      <Home path="/"></Home>
      {/* <ButtonFromApitoDb path="/cargarDb" primerPokemon ={cartasPoke1[0].name}></ButtonFromApitoDb> */}
      <ButtonFromApitoDb path="/cargarDb"></ButtonFromApitoDb>
    </Router>
    </>
  )
}

export default App;
