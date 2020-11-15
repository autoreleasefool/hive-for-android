import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Box} from 'components/Box';
import {Text} from 'components/Text';
import {UserSummaryView} from 'sections/lobby/views/UserSummaryView';

const UserSummaryViewStory = () => {
  return (
    <ScrollView>
      <Box backgroundColor="backgroundLight">
        <Text variant="body" padding="m">
          Empty
        </Text>
      </Box>
      <Box paddingBottom="m">
        <UserSummaryView />
      </Box>

      <Box backgroundColor="backgroundLight">
        <Text variant="body" padding="m">
          Single property
        </Text>
      </Box>
      <Box paddingBottom="m">
        <UserSummaryView displayName="Only display name" />
      </Box>
      <Box paddingBottom="m">
        <UserSummaryView elo={1024} />
      </Box>
      <Box paddingBottom="m">
        <UserSummaryView avatarUrl="https://avatars1.githubusercontent.com/u/6619581?v=4" />
      </Box>

      <Box backgroundColor="backgroundLight">
        <Text variant="body" padding="m">
          Multiple properties
        </Text>
      </Box>
      <Box paddingBottom="m">
        <UserSummaryView displayName="Display name and elo" elo={1024} />
      </Box>
      <Box paddingBottom="m">
        <UserSummaryView
          displayName="Display name and avatar"
          avatarUrl="https://avatars1.githubusercontent.com/u/6619581?v=4"
        />
      </Box>
      <Box paddingBottom="m">
        <UserSummaryView
          elo={1024}
          avatarUrl="https://avatars1.githubusercontent.com/u/6619581?v=4"
        />
      </Box>
      <Box paddingBottom="m">
        <UserSummaryView
          displayName="All the info"
          elo={1024}
          avatarUrl="https://avatars1.githubusercontent.com/u/6619581?v=4"
        />
      </Box>
      <Box paddingBottom="m">
        <UserSummaryView
          displayName="This user has a very long name and no avatar that should be truncated"
          elo={1024}
        />
      </Box>
      <Box paddingBottom="m">
        <UserSummaryView
          displayName="This user has a very long name and includes an avatar that should be truncated"
          elo={1024}
          avatarUrl="https://avatars1.githubusercontent.com/u/6619581?v=4"
        />
      </Box>
    </ScrollView>
  );
};

export default UserSummaryViewStory;
