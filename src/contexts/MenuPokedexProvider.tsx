import { JSX, ReactNode, useState } from "react";
import { EMenuPokedexOptions, MenuPokedexContext } from "./MenuPokedexContext";

export const MenuPokedexProvider = ({ children }: { children: ReactNode | JSX.Element | JSX.Element[] }) => {
  const [option, setOption] = useState(EMenuPokedexOptions.MENU);

  const setMenuOption = (option: EMenuPokedexOptions) => {
    setOption(option);
  };

  const getOption = () => {
    return option;
  }


  return (
    <MenuPokedexContext.Provider
      value={{
        option: getOption(),
        setOption: setMenuOption,
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  )
}