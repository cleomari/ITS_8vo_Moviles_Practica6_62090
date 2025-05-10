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

const LIMIT = 6;

const PokedexListScreen = forwardRef((props, ref) => {
  const {
    selectedPokemonIndex,
    setSelectedPokemonIndex,
    setActivePokemonData,
    screen,
  } = useContext(MenuPokedexContext);

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);

  const loadPokemons = async (nextOffset: number, defaultIndex = 0) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${nextOffset}`);
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
    setOffset(nextOffset);
    setSelectedPokemonIndex(defaultIndex);
  };

  useEffect(() => {
    if (screen === EPokedexScreen.POKEDEX) {
      loadPokemons(0);
    }
  }, [screen]);

  useEffect(() => {
    if (pokemonList[selectedPokemonIndex]) {
      setActivePokemonData(pokemonList[selectedPokemonIndex]);
    }
  }, [selectedPokemonIndex, pokemonList]);

  // Exponer funciones al botón Cross
  useImperativeHandle(ref, () => ({
    goNext: () => {
      if (selectedPokemonIndex < LIMIT - 1) {
        setSelectedPokemonIndex(selectedPokemonIndex + 1);
      } else {
        loadPokemons(offset + LIMIT, 0);
      }
    },
    goPrev: () => {
      if (selectedPokemonIndex > 0) {
        setSelectedPokemonIndex(selectedPokemonIndex - 1);
      } else if (offset > 0) {
        loadPokemons(offset - LIMIT, LIMIT - 1);
      }
    }
  }));

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)]">
      {pokemonList.map((pokemon, idx) => (
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
