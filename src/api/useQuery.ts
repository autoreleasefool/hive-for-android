import {useCallback, useEffect, useState} from 'react';
import {baseURL} from 'utilities/constants';
import {Account, useAccount} from './account';
import {path, headers, method, requiresAccount, EndpointParams} from './endpoint';

type QueryParams = EndpointParams & {
  skip?: boolean;
};

enum QueryErrorType {
  noAccount,
  usingOfflineAccount,
  networkError,
  responseError,
}

type QueryError = {type: QueryErrorType} & (
  | {type: QueryErrorType.noAccount}
  | {type: QueryErrorType.usingOfflineAccount}
  | {type: QueryErrorType.networkError; error: Error}
  | {type: QueryErrorType.responseError; error: Error}
);

export const useQuery = <T = any>(request: QueryParams) => {
  const account = useAccount();

  const [didPerformFetch, setDidPerformFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<QueryError>();

  const postError = useCallback(
    (error: QueryError) => {
      setError(error);
      setIsLoading(false);
    },
    [setIsLoading, setError],
  );

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
        postError({type: QueryErrorType.networkError, error});
        return;
      }

      try {
        const json = await response.json();
        setData(json);
      } catch (error) {
        postError({type: QueryErrorType.responseError, error});
      }
    };

    const queryRequiresAccount = requiresAccount(request);
    if (queryRequiresAccount) {
      if (!account) {
        postError({type: QueryErrorType.noAccount});
        return;
      }

      if (account.isOffline()) {
        postError({type: QueryErrorType.usingOfflineAccount});
        return;
      }
    }

    setDidPerformFetch(true);
    performFetch(account);
  }, [account, postError, didPerformFetch, setDidPerformFetch]);

  return {
    isLoading,
    data,
    error,
  };
};
