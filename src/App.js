import { useEffect, useState } from "react";
import Pokemons from "./components/Pokemons/Pokemons";
import axios from "axios";
import classes from "./App.module.css";

function App() {
  const [loadPokemons, setLoadPokemons] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [pokemons, setPokemons] = useState([]);

  const getAllPokemons = () => {
    axios.get(loadPokemons).then((res) => setLoadPokemons(res.data.next));
    axios
      .get(loadPokemons)
      .then((res) =>
        res.data.results.map((pokemon) =>
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then((res) =>
              setPokemons((prevPokemons) => [...prevPokemons, res.data])
            )
        )
      );
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className={classes["app-container"]}>
      <h1>Pokemon Kingdom</h1>
      <div className={classes["pokemon-container"]}>
        <div className={classes["all-container"]}>
          {pokemons.map((pokemon, index) => (
            <Pokemons
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
              height={pokemon.height}
              weight={pokemon.weight}
              stat1={pokemon.stats[0].stat.name}
              stat2={pokemon.stats[1].stat.name}
              stat3={pokemon.stats[2].stat.name}
              stat4={pokemon.stats[3].stat.name}
              stat5={pokemon.stats[4].stat.name}
              stat6={pokemon.stats[5].stat.name}
              bs1={pokemon.stats[0].base_stat}
              bs2={pokemon.stats[1].base_stat}
              bs3={pokemon.stats[2].base_stat}
              bs4={pokemon.stats[3].base_stat}
              bs5={pokemon.stats[4].base_stat}
              bs6={pokemon.stats[5].base_stat}
            />
          ))}
        </div>
        <button
          className={classes["load-more"]}
          onClick={() => getAllPokemons()}
        >
          More Pokemons
        </button>
      </div>
    </div>
  );
}

export default App;
