import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import App from './App';

LogBox.ignoreLogs([
    "Overwriting fontFamily style attribute preprocessor"
  ]);

registerRootComponent(App);
