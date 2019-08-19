import * as Store from '@/types/store';
import state, { IState } from './state';
import actions from './actions';
import mutations from './mutations';

export * from './state';

export { state, actions, mutations };

export type StateTree = {
  'search/employee': IState;
};

export type ActionTree = {
  'search/employee': Store.DispatchArgs<typeof actions>;
};
