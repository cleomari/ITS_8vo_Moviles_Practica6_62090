import { createContext } from "react";

export enum EPokedexMenuOption {
  POKEDEX = 1,
  PACK = 2,
  EXIT = 3
}

export enum EPokedexScreen {
  MENU,
  POKEDEX = 1,
  PACK = 2,
  EXIT = 3,
  DETAIL = 4, // nueva pantalla para detalles
}

export type TPokemonBasic = {
  name: string;
  url: string;
};

export type TMenuPokedexContext = {
  screen: EPokedexScreen;
  menuOption: EPokedexMenuOption;
  selectedPokemonIndex: number;
  activePokemonData: TPokemonBasic | null;
  setScreen: (option: EPokedexScreen) => void;
  setMenuOption: (option: EPokedexMenuOption) => void;
  setSelectedPokemonIndex: (index: number) => void;
  setActivePokemonData: (pokemon: TPokemonBasic | null) => void;
};

export const MenuPokedexContext = createContext<TMenuPokedexContext>({
  screen: EPokedexScreen.MENU,
  menuOption: EPokedexMenuOption.POKEDEX,
  selectedPokemonIndex: 0,
  activePokemonData: null,
  setScreen: () => {},
  setMenuOption: () => {},
  setSelectedPokemonIndex: () => {},
  setActivePokemonData: () => {},
});
