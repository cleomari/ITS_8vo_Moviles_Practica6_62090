import {
  IonContent,
  IonPage
} from '@ionic/react';
import React from 'react';

import '../theme/variables.css';
import { PokedexMenu } from './Menu/PokedexMenu';

const Pokedex: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
      <div id="pokedex">
      <div id="left">
        <div id="logo"></div>
        <div id="bg_curve1_left"></div>
        <div id="bg_curve2_left"></div>
        <div id="curve1_left">
          <div id="buttonGlass">
            <div id="reflect"></div>
          </div>
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
            <PokedexMenu />
          </div>
          <div id="buttonbottomPicture" className="gameboy-button"></div>
          <div id="speakers">
            <div className="sp"></div>
            <div className="sp"></div>
            <div className="sp"></div>
            <div className="sp"></div>
          </div>
        </div>
        <div id="bigbluebutton" className="gameboy-button"></div>
        <div id="barbutton1" className="gameboy-button"></div>
        <div id="barbutton2" className="gameboy-button"></div>
        <div id="cross">
          <div id="leftcross" className="gameboy-button">
            <div id="leftT"></div>
          </div>
          <div id="topcross" className="gameboy-button">
            <div id="upT"></div>
          </div>
          <div id="rightcross" className="gameboy-button">
            <div id="rightT"></div>
          </div>
          <div id="midcross" className="gameboy-button">
            <div id="midCircle"></div>
          </div>
          <div id="botcross" className="gameboy-button">
            <div id="downT"></div>
          </div>
        </div>
      </div>
    </div>
      </IonContent>
    </IonPage>
  );
};

export default Pokedex;