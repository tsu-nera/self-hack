import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake'

import App  from './src/components/organisms/App';

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App as any);