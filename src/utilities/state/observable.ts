import {v4 as uuid} from 'uuid';

class Observer<T> {
  id = uuid();
  private onChange: (value: T) => void;

  constructor(onChange: (_: T) => void) {
    this.onChange = onChange;
  }

  valueDidChange(value: T) {
    this.onChange(value);
  }
}

export class Observable<T> {
  private currentValue: T;
  private observers: {
    [key: string]: Observer<T>;
  } = {};

  constructor(initialValue: T) {
    this.currentValue = initialValue;
  }

  getValue(): T {
    return this.currentValue;
  }

  setValue(newValue: T) {
    this.currentValue = newValue;
    this.notifyObservers(newValue);
  }

  observeChanges(onChange: (_: T) => void): string {
    const observer = new Observer(onChange);
    this.observers[observer.id] = observer;
    return observer.id;
  }

  removeObserver(id: string) {
    delete this.observers[id];
  }

  private notifyObservers(value: T) {
    for (const observer of Object.values(this.observers)) {
      observer.valueDidChange(value);
    }
  }
}
