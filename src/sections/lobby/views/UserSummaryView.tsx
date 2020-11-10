import React from 'react';
import {Box} from 'components/Box';
import {HexImage} from 'components/HexImage';
import {Text} from 'components/Text';

interface Props {
  displayName?: string;
  elo?: number;
  avatarUrl?: string;
}

export const UserSummaryView = ({displayName, elo, avatarUrl}: Props) => {
  return (
    <Box flexDirection="row">
      {avatarUrl ? (
        <HexImage source={{uri: avatarUrl}} style={{width: 44, height: 44}} />
      ) : (
        <Box width={44} height={44} backgroundColor="highlightWarning" />
      )}
      <Box>
        <Text variant="subheader">{displayName ?? 'N/A'}</Text>
        {elo ? <Text variant="caption">{`${elo} ELO`}</Text> : null}
      </Box>
    </Box>
  );
};
