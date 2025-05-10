import { ReactNode, useState } from "react";
import {
  EPokedexMenuOption,
  EPokedexScreen,
  MenuPokedexContext,
  TPokemonBasic
} from "./MenuPokedexContext";

type Props = {
  children: ReactNode;
};

export const MenuPokedexProvider = ({ children }: Props) => {
  const [screen, setScreen] = useState(EPokedexScreen.MENU);
  const [menuOption, setMenuOption] = useState(EPokedexMenuOption.POKEDEX);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState<number>(0);
  const [activePokemonData, setActivePokemonData] = useState<TPokemonBasic | null>(null);

  return (
    <MenuPokedexContext.Provider
      value={{
        screen,
        menuOption,
        selectedPokemonIndex,
        activePokemonData,
        setScreen,
        setMenuOption,
        setSelectedPokemonIndex,
        setActivePokemonData,
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  );
};
