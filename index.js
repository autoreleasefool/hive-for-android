import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import App from './App';
import {name as appName} from './app.json';

if (process.env.STORYBOOK === 'true') {
  AppRegistry.registerComponent(appName, () => require('./storybook').default);
} else {
  AppRegistry.registerComponent(appName, () => App);
}
