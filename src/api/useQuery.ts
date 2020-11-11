import {useCallback, useEffect, useState} from 'react';
import {baseURL} from 'utilities/constants';
import {Account, useAccount} from './account';
import {
  path,
  headers,
  method,
  requiresAccount,
  HiveAPIRequest,
  HiveAPIResponse,
  Endpoint,
} from './endpoint';

type QueryRequest = HiveAPIRequest & {
  skip?: boolean;
};

enum QueryErrorType {
  noAccount,
  usingOfflineAccount,
  networkError,
  responseError,
}

type QueryError = {type: QueryErrorType; message: string} & (
  | {type: QueryErrorType.noAccount}
  | {type: QueryErrorType.usingOfflineAccount}
  | {type: QueryErrorType.networkError; error: Error}
  | {type: QueryErrorType.responseError; error: Error}
);

type QueryHookResults<T extends Endpoint> = {
  isLoading: boolean;
  isRefreshing: boolean;
  error: QueryError | undefined;
  data: HiveAPIResponse<T> | undefined;
  refresh: () => void;
};

export const useQuery = <T extends Endpoint>(request: QueryRequest): QueryHookResults<T> => {
  const account = useAccount();

  const [didPerformFetch, setDidPerformFetch] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<HiveAPIResponse<T>>();
  const [error, setError] = useState<QueryError>();

  const postError = useCallback(
    (error: QueryError) => {
      setError(error);
      setIsLoading(false);
    },
    [setIsLoading, setError],
  );

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setError(undefined);
    setDidPerformFetch(false);
  }, [setDidPerformFetch, setError, setIsRefreshing]);

  useEffect(() => {
    if (request.skip || didPerformFetch) {
      return;
    }

    const performFetch = async (account: Account | undefined) => {
      let url = `${baseURL}/${path(request)}`;
      let response: Response;
      try {
        response = await fetch(url, {
          method: method(request),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(account?.headers() ?? {}),
            ...headers(request),
          },
        });
      } catch (error) {
        console.error('Network request failed', error);
        postError({type: QueryErrorType.networkError, message: 'Network error', error});
        return;
      }

      try {
        const json = await response.json();
        setData(json);
        setIsLoading(false);
        setIsRefreshing(false);
      } catch (error) {
        console.error('Response parsing failed', error);
        try {
          let text = await response.text();
          console.error('Failed to parse response:', text);
        } catch {
          // Ignore
        }

        postError({type: QueryErrorType.responseError, message: 'Response error', error});
      }
    };

    const queryRequiresAccount = requiresAccount(request);
    if (queryRequiresAccount) {
      if (!account) {
        console.error('No account available for request');
        postError({type: QueryErrorType.noAccount, message: 'No account available'});
        return;
      }

      if (account.isOffline()) {
        console.error('User is offline, cannot make network request');
        postError({type: QueryErrorType.usingOfflineAccount, message: 'Currently offline'});
        return;
      }
    }

    setDidPerformFetch(true);
    performFetch(account);
  }, [
    account,
    postError,
    didPerformFetch,
    setDidPerformFetch,
    setIsLoading,
    setIsRefreshing,
    request,
  ]);

  return {
    isLoading,
    isRefreshing,
    data,
    error,
    refresh,
  };
};
