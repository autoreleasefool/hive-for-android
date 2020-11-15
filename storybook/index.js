import {configure} from '@storybook/react-native';
import './rn-addons';
import StorybookRoot from './stories/StorybookRoot';

configure(() => {
  require('./stories');
}, module);

export default () => StorybookRoot;
