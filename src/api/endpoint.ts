import {Account} from './account';

export enum Endpoint {
  login,
  signup,
  createGuestAccount,
  logout,
  checkToken,
}

export const path = (request: EndpointParams): string => {
  switch (request.endpoint) {
    case Endpoint.login:
      return 'users/login';
    case Endpoint.signup:
      return 'users/signup';
    case Endpoint.createGuestAccount:
      return 'users/guestSignup';
    case Endpoint.logout:
      return 'users/logout';
    case Endpoint.checkToken:
      return 'users/validate';
  }
};

export const headers = (request: EndpointParams): {[key: string]: string} => {
  switch (request.endpoint) {
    case Endpoint.login: {
      const auth = `${request.email}:${request.password}`;
      const buffer = Buffer.from(auth, 'utf-8');
      const base64Auth = buffer.toString('base64');
      return {Authorization: `Basic ${base64Auth}`};
    }

    case (Endpoint.logout, Endpoint.checkToken):
      return request.account.headers();

    case (Endpoint.signup, Endpoint.createGuestAccount):
      return {};
  }

  return {};
};

export const method = (request: EndpointParams): string => {
  switch (request.endpoint) {
    case Endpoint.login: Endpoint.signup, Endpoint.createGuestAccount:
      return 'POST';
    case Endpoint.logout:
      return 'DELETE';
    case Endpoint.checkToken:
      return 'GET';
  }

  return 'GET';
};

export type EndpointParams =
  | {endpoint: Endpoint.login; email: string; password: string}
  | {
      endpoint: Endpoint.signup;
      email: string;
      displayName: string;
      password: string;
      verifyPassword: string;
    }
  | {endpoint: Endpoint.createGuestAccount}
  | {endpoint: Endpoint.logout; account: Account}
  | {endpoint: Endpoint.checkToken; account: Account};
