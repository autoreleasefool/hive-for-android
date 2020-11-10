import React, {ComponentProps} from 'react';
import {Pressable} from 'react-native';
import {Box} from 'components/Box';
import {UserSummaryView} from './UserSummaryView';

interface Props {
  host: ComponentProps<typeof UserSummaryView>;
  opponent?: ComponentProps<typeof UserSummaryView>;
  onPress: () => void;
}

export const MatchView = ({host, opponent, onPress}: Props) => {
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <Box opacity={pressed ? 0.7 : 1}>
          <Box flexDirection="row">
            <UserSummaryView
              displayName={host.displayName}
              elo={host.elo}
              avatarUrl={host.avatarUrl}
            />
            <UserSummaryView
              displayName={opponent?.displayName}
              elo={opponent?.elo}
              avatarUrl={opponent?.avatarUrl}
            />
          </Box>
        </Box>
      )}
    </Pressable>
  );
};
