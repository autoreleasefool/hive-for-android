import React from 'react';
import {storiesOf} from '@storybook/react-native';
import MatchView from './sections/lobby/views/MatchView.stories';
import UserSummaryView from './sections/lobby/views/UserSummaryView.stories';

storiesOf('Sections/Lobby', module)
  .add('MatchView', () => <MatchView />)
  .add('UserSummaryView', () => <UserSummaryView />);
