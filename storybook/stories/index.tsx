import React from 'react';
import {storiesOf} from '@storybook/react-native';
import MatchView from './sections/lobby/views/MatchView.stories';

storiesOf('Sections/Lobby', module).add('MatchView', () => <MatchView />);
