import {Match} from './match';
import {User} from './user';

export interface UserDetails extends User {
  activeMatches?: Match[];
  pastMatches?: Match[];
}
