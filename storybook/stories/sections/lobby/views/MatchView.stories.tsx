import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {MatchView} from 'sections/lobby/views/MatchView';

const player = {
  displayName: 'Joseph Roque',
  elo: 1024,
};

const MatchViewStory = () => {
  return (
    <ScrollView>
      <MatchView
        host={player}
        opponent={player}
        onPress={() => console.log('Pressed match view')}
      />
      <MatchView host={player} onPress={() => console.log('Pressed match view')} />
    </ScrollView>
  );
};

export default MatchViewStory;
