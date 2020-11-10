import {Match} from 'api/types/match';

export type SpectatorRoute = {
  SpectatorLobby: undefined;
  MatchDetails: {match: Match};
};
