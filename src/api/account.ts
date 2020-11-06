import {useSharedState} from 'utilities/state';

const offlineId = '602c977d-168a-4771-8599-9f35ed1abd41';
const offlineToken = 'offline';

export class Account {
  userId: string;
  token: string;
  isGuest: boolean;

  constructor(userId: string, token: string, isGuest: boolean) {
    this.userId = userId;
    this.token = token;
    this.isGuest = isGuest;
  }

  headers(): {[key: string]: string} {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  isOffline(): boolean {
    return this.userId === offlineId || this.token === offlineToken;
  }
}

export const useMutableAccount = (): [Account | undefined, (_: Account | undefined) => void] => {
  const [account, setAccount] = useSharedState<Account | undefined>('account', undefined);

  // TODO: load cached account

  return [account, setAccount];
};

export const useAccount = (): Account | undefined => {
  const [account] = useMutableAccount();
  return account;
};
