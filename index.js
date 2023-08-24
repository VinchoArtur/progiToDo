/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import 'intl-pluralrules';
import 'intl';
import 'intl/locale-data/jsonp/ru';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
