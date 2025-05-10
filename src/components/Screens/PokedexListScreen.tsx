import React, {
  useEffect,
  useState,
  useContext,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { EPokedexScreen, MenuPokedexContext } from "../../contexts/MenuPokedexContext";

interface Pokemon {
  name: string;
  image: string;
  url: string;
}

export const PokedexListScreen = forwardRef((props, ref) => {
  const {
    selectedPokemonIndex,
    setSelectedPokemonIndex,
    setActivePokemonData,
    screen,
  } = useContext(MenuPokedexContext);

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);

  const LIMIT = 20;

  // Exponer funciones al padre
  useImperativeHandle(ref, () => ({
    nextPage: () => setPage((prev) => prev + 1),
    prevPage: () => setPage((prev) => (prev > 0 ? prev - 1 : 0)),
  }));

  useEffect(() => {
    const fetchPokemons = async () => {
      const offset = page * LIMIT;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
      const data = await response.json();

      const pokemonWithImages = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            url: pokemon.url
          };
        })
      );

      setPokemonList(pokemonWithImages);
      setSelectedPokemonIndex(0);
    };

    fetchPokemons();
  }, [page]);

  // Actualiza el Pokémon activo cuando cambia el índice
  useEffect(() => {
    if (pokemonList[selectedPokemonIndex]) {
      setActivePokemonData(pokemonList[selectedPokemonIndex]);
    }
  }, [selectedPokemonIndex, pokemonList]);

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)]">
      {pokemonList.slice(page * 6, page * 6 + 6).map((pokemon, idx) => (
        <div
          key={pokemon.name}
          className={`flex items-center gap-2 ${
            idx === selectedPokemonIndex ? 'bg-gray-200 rounded' : ''
          }`}
        >
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-[20px] h-[20px] object-contain"
          />
          <span className="capitalize">{pokemon.name}</span>
        </div>
      ))}
    </div>
  );
});

export default PokedexListScreen;
