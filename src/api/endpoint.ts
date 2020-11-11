import {Account} from './account';
import {Match} from './types/match';
import {SessionToken} from './types/signup';

export enum Endpoint {
  // Account
  login = 'login',
  signup = 'signup',
  createGuestAccount = 'createGuestAccount',
  logout = 'logout',
  checkToken = 'checkToken',

  // Matches
  openMatches = 'openMatches',
}

export type HiveAPIRequest =
  | LoginRequest
  | SignupRequest
  | CreateGuestAccountRequest
  | LogoutRequest
  | CheckTokenRequest
  | OpenMatchesRequest;

export type HiveAPIResponse<T extends Endpoint> = T extends Endpoint.login
  ? LoginResponse
  : T extends Endpoint.signup
  ? SignupResponse
  : T extends Endpoint.createGuestAccount
  ? CreateGuestAccountResponse
  : T extends Endpoint.logout
  ? LogoutResponse
  : T extends Endpoint.checkToken
  ? CheckTokenResponse
  : T extends Endpoint.openMatches
  ? OpenMatchesResponse
  : never;

interface BaseRequest<T extends Endpoint> {
  endpoint: T;
}

interface LoginRequest extends BaseRequest<Endpoint.login> {
  // endpoint: Endpoint.login;
  email: string;
  password: string;
}
interface LoginResponse extends SessionToken {}

interface SignupRequest extends BaseRequest<Endpoint.signup> {
  // endpoint: Endpoint.signup;
  email: string;
  displayName: string;
  password: string;
  verifyPassword: string;
}
interface SignupResponse {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  token: SessionToken;
}

interface CreateGuestAccountRequest extends BaseRequest<Endpoint.createGuestAccount> {
  // endpoint: Endpoint.createGuestAccount;
}
interface CreateGuestAccountResponse extends SignupResponse {}

interface LogoutRequest extends BaseRequest<Endpoint.logout> {
  // endpoint: Endpoint.logout;
  account: Account;
}
interface LogoutResponse {
  success: boolean;
}

interface CheckTokenRequest extends BaseRequest<Endpoint.checkToken> {
  // endpoint: Endpoint.checkToken;
  account: Account;
}
interface CheckTokenResponse extends SessionToken {}

interface OpenMatchesRequest extends BaseRequest<Endpoint.openMatches> {
  // endpoint: Endpoint.openMatches;
}
type OpenMatchesResponse = Match[];

export const path = (request: HiveAPIRequest): string => {
  switch (request.endpoint) {
    case Endpoint.login:
      return 'api/users/login';
    case Endpoint.signup:
      return 'api/users/signup';
    case Endpoint.createGuestAccount:
      return 'api/users/guestSignup';
    case Endpoint.logout:
      return 'api/users/logout';
    case Endpoint.checkToken:
      return 'api/users/validate';
    case Endpoint.openMatches:
      return 'api/matches/open';
  }
};

export const headers = (request: HiveAPIRequest): {[key: string]: string} => {
  switch (request.endpoint) {
    case Endpoint.login: {
      const auth = `${request.email}:${request.password}`;
      const buffer = Buffer.from(auth, 'utf-8');
      const base64Auth = buffer.toString('base64');
      return {Authorization: `Basic ${base64Auth}`};
    }
    case Endpoint.logout:
    case Endpoint.checkToken:
      return request.account.headers();
    case Endpoint.signup:
    case Endpoint.createGuestAccount:
    case Endpoint.openMatches:
      return {};
  }

  return {};
};

export const method = (request: HiveAPIRequest): 'GET' | 'POST' | 'DELETE' => {
  switch (request.endpoint) {
    case Endpoint.login:
    case Endpoint.signup:
    case Endpoint.createGuestAccount:
      return 'POST';
    case Endpoint.logout:
      return 'DELETE';
    case Endpoint.checkToken:
    case Endpoint.openMatches:
      return 'GET';
  }
};

export const requiresAccount = (request: HiveAPIRequest): boolean => {
  switch (request.endpoint) {
    case Endpoint.login:
    case Endpoint.logout:
    case Endpoint.signup:
    case Endpoint.createGuestAccount:
    case Endpoint.checkToken:
      return false;
    case Endpoint.openMatches:
      return true;
  }
};
