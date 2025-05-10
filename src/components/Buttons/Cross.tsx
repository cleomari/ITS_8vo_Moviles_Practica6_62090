import { useContext } from "react";
import {
  EPokedexScreen,
  MenuPokedexContext,
} from "../../contexts/MenuPokedexContext";

export const Cross = () => {
  const {
    screen,
    menuOption,
    setMenuOption,
    selectedPokemonIndex,
    setSelectedPokemonIndex,
  } = useContext(MenuPokedexContext);

  const handleUp = () => {
    if (screen === EPokedexScreen.MENU) {
      const newOption = menuOption - 1 < 1 ? 3 : menuOption - 1;
      setMenuOption(newOption);
    } else if (screen === EPokedexScreen.POKEDEX) {
      setSelectedPokemonIndex(selectedPokemonIndex > 0 ? selectedPokemonIndex - 1 : 0);
    }
  };

  const handleDown = () => {
    if (screen === EPokedexScreen.MENU) {
      const newOption = menuOption + 1 > 3 ? 1 : menuOption + 1;
      setMenuOption(newOption);
    } else if (screen === EPokedexScreen.POKEDEX) {
      setSelectedPokemonIndex(selectedPokemonIndex + 1 < 6 ? selectedPokemonIndex + 1 : 0); // El límite se maneja en la lista
    }
  };

  return (
    <div id="cross">
      <div id="leftcross" className="gameboy-button">
        <div id="leftT"></div>
      </div>
      <div id="topcross" className="gameboy-button" onClick={handleUp}>
        <div id="upT"></div>
      </div>
      <div id="rightcross" className="gameboy-button">
        <div id="rightT"></div>
      </div>
      <div id="midcross" className="gameboy-button">
        <div id="midCircle"></div>
      </div>
      <div id="botcross" className="gameboy-button" onClick={handleDown}>
        <div id="downT"></div>
      </div>
    </div>
  );
};
