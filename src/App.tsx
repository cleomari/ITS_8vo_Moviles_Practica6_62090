import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import Pokedex from './components/Pokedex';
import './theme/variables.css';
import { MenuPokedexProvider } from './contexts/MenuPokedexProvider';
import { PokedexMenu } from './components/Menu/PokedexMenu';
import PokedexListScreen from './components/Screens/PokedexListScreen';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <MenuPokedexProvider>
          <Pokedex>
            <Route exact path="/home">
              <PokedexMenu />
            </Route>
            <Route exact path="/pokedex">
              <PokedexListScreen />
            </Route>
            <Route exact path="/pack">
              <>Esta es la bolsa de objetos</>
            </Route>
            <Route exact path="/exit">
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

export default App;
