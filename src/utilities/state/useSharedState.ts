import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Observable} from './observable';

export class SharedStateContainer {
  private observables: {
    [key: string]: Observable<any>;
  } = {};

  getObservable<T>(id: string, initialValue: T): Observable<T> {
    let observable = this.observables[id];
    if (!observable) {
      observable = new Observable(initialValue);
      this.observables[id] = observable;
    }
    return observable;
  }
}

export const SharedStateContext = createContext(new SharedStateContainer());

export const useSharedState = <T>(id: string, initialValue: T): [T, (_: T) => void] => {
  const context = useContext(SharedStateContext);
  const observable = useMemo(() => context.getObservable<T>(id, initialValue), [context, id]);

  const setSharedValue = useCallback(
    (value: T) => {
      observable.setValue(value);
    },
    [observable],
  );

  const [value, setValue] = useState(observable.getValue());
  useEffect(() => {
    const observerId = observable.observeChanges(setValue);
    return () => {
      observable.removeObserver(observerId);
    };
  }, [observable]);

  return [value, setSharedValue];
};
