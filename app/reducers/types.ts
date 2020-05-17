import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type allDataType = {
  donhang: object;
};

export type GetState = () => allDataType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<allDataType, Action<string>>;
