import { createContext } from "react";

export enum EMenuPokedexOptions {
  MENU,
  POKEDEX,
  PACK,
  EXIT
}

export type TMenuPokedexContext = {
  option: EMenuPokedexOptions;
  setOption: (option: EMenuPokedexOptions) => void;
}

export const MenuPokedexContext = createContext<TMenuPokedexContext>({
  option: EMenuPokedexOptions.MENU,
  setOption: () => {}
});