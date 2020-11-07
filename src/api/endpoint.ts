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
      return 'api/users/login';
    case Endpoint.signup:
      return 'api/users/signup';
    case Endpoint.createGuestAccount:
      return 'api/users/guestSignup';
    case Endpoint.logout:
      return 'api/users/logout';
    case Endpoint.checkToken:
      return 'api/users/validate';
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

    case Endpoint.logout:
      return request.account.headers();
    case Endpoint.checkToken:
      return request.account.headers();

    case Endpoint.signup:
    case Endpoint.createGuestAccount:
      return {};
  }
};

export const method = (request: EndpointParams): string => {
  switch (request.endpoint) {
    case Endpoint.login:
    case Endpoint.signup:
    case Endpoint.createGuestAccount:
      return 'POST';
    case Endpoint.logout:
      return 'DELETE';
    case Endpoint.checkToken:
      return 'GET';
  }
};

export const requiresAccount = (request: EndpointParams): boolean => {
  console.log(JSON.stringify(request));
  switch (request.endpoint) {
    case Endpoint.login:
    case Endpoint.logout:
    case Endpoint.signup:
    case Endpoint.createGuestAccount:
    case Endpoint.checkToken:
      return false;
  }
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
