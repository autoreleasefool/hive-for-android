import React from 'react';
import {Box} from 'components/Box';
import {MatchView} from 'sections/lobby/views/MatchView';

const player = {
  displayName: 'Joseph Roque',
  elo: 1024,
};

const MatchViewStory = () => {
  return (
    <Box padding="s" justifyContent="center" backgroundColor="background" flex={1}>
      <MatchView
        host={player}
        opponent={player}
        onPress={() => console.log('Pressed match view')}
      />
    </Box>
  );
};

export default MatchViewStory;
