import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

import './theme/variables.css';

import Pokedex from './components/Pokedex';
import { MenuPokedexProvider } from './contexts/MenuPokedexProvider';
import { PokedexMenu } from './components/Menu/PokedexMenu';
import PokedexListScreen from './components/Screens/PokedexListScreen';
import React, { useRef } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const listRef = useRef(null); // este ref se pasa a Pokedex y luego a Cross

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <MenuPokedexProvider>
            <Pokedex listRef={listRef}>
              <Route exact path="/home">
                <PokedexMenu />
              </Route>
              <Route exact path="/pokedex">
                <PokedexListScreen ref={listRef} />
              </Route>
              <Route exact path="/pack">
                <>Esta es la bolsa de objetos</>
              </Route>
              <Route exact path="/exit">
                <>Saliendo...</>
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Pokedex>
          </MenuPokedexProvider>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
