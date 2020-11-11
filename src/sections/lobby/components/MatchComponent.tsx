import {MatchView} from '../views/MatchView';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Match} from 'api/types/match';
import {SpectatorRoute} from 'navigation/spectator/SpectatorRoute';

interface Props {
  match: Match;
}

export const MatchComponent = ({match}: Props) => {
  const navigation = useNavigation<StackNavigationProp<SpectatorRoute>>();

  const onPress = useCallback(() => {
    navigation.navigate('MatchDetails', {matchId: match.id});
  }, [navigation, match]);

  if (!match.host) {
    return null;
  }

  return <MatchView host={match.host} opponent={match.opponent} onPress={onPress} />;
};
