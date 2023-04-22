/**
 * @format
 */

// Para que funcionen los colores de la app 
import './setup';
import './setupColors';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Para que funcione el servicio de reproducción
import TrackPlayer from 'react-native-track-player';
import PlayBackService from './src/services/PlaybackService';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => PlayBackService);
