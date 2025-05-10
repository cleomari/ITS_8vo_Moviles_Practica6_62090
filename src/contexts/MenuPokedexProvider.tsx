import { JSX, ReactNode, useState } from "react";
import {
  EPokedexMenuOption,
  EPokedexScreen,
  MenuPokedexContext,
  TPokemonBasic
} from "./MenuPokedexContext";

export const MenuPokedexProvider = ({
  children,
}: {
  children: ReactNode | JSX.Element | JSX.Element[];
}) => {
  const [screen, setScreen] = useState(EPokedexScreen.MENU);
  const [menuOption, setMenuOption] = useState(EPokedexMenuOption.POKEDEX);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);
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
        setActivePokemonData
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  );
};
