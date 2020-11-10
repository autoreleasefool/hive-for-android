import {User} from './user';

export interface MatchUser extends User {}

export enum MatchStatus {
  notStarted = 1,
  active = 2,
  ended = 3,
}

export interface Match {
  id: string;
  host?: User;
  opponent?: User;
  winner?: User;

  options: string;
  gameOptions: string;
  createdAt?: Date;
  duration?: number;
  status: MatchStatus;
  isComplete: boolean;
}
