import {
  IonContent,
  IonPage,
  useIonRouter
} from '@ionic/react';
import React, { useContext } from 'react';

import { EPokedexMenuOption, EPokedexScreen, MenuPokedexContext } from '../contexts/MenuPokedexContext';
import '../theme/variables.css';
import { Cross } from './Buttons/Cross';
import PokemonDetailScreen from './Screens/PokemonDetailScreen'; // ⚠️ importar

interface PokedexProps {
  children: React.ReactNode;
  listRef: React.RefObject<any>;
}

const Pokedex: React.FC<PokedexProps> = ({ children, listRef }) => {
  const { menuOption, screen, setMenuOption, setScreen } = useContext(MenuPokedexContext);
  const router = useIonRouter();

  const onBigBlueButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
  if (screen === EPokedexScreen.MENU) {
    const path = EPokedexMenuOption[menuOption].toLowerCase();
    setScreen(menuOption as unknown as EPokedexScreen);
    router.push(`/${path}`);
  } else if (screen === EPokedexScreen.POKEDEX) {
    setScreen(EPokedexScreen.DETAIL); // 💥 Cambia a la vista detallada del Pokémon activo
  }
}

  const toggleScreen = () => {
    if (screen === EPokedexScreen.EXIT) {
      setScreen(EPokedexScreen.MENU);
      setMenuOption(EPokedexMenuOption.POKEDEX);
      router.push('/home');
    } else {
      setScreen(EPokedexScreen.EXIT);
      router.push('/exit');
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div id="pokedex">
          <div id="left">
            <div id="bg_curve1_left"></div>
            <div id="bg_curve2_left"></div>
            <div id="curve1_left">
              <div id="buttonGlass"><div id="reflect"></div></div>
              <div id="miniButtonGlass1"></div>
              <div id="miniButtonGlass2"></div>
              <div id="miniButtonGlass3"></div>
            </div>
            <div id="curve2_left">
              <div id="junction">
                <div id="junction1"></div>
                <div id="junction2"></div>
              </div>
            </div>
            <div id="screen">
              <div id="topPicture">
                <div id="buttontopPicture1"></div>
                <div id="buttontopPicture2"></div>
              </div>
              <div id="picture">
                {screen === EPokedexScreen.DETAIL ? <PokemonDetailScreen /> : children}
              </div>
              <div id="buttonbottomPicture" className="gameboy-button" onClick={toggleScreen}></div>
              <div id="speakers">
                <div className="sp"></div>
                <div className="sp"></div>
                <div className="sp"></div>
                <div className="sp"></div>
              </div>
            </div>
            <div id="bigbluebutton" className="gameboy-button" onClick={onBigBlueButtonClick}></div>
            <div id="barbutton1" className="gameboy-button"></div>
            <div id="barbutton2" className="gameboy-button"></div>
            <Cross listRef={listRef} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Pokedex;
