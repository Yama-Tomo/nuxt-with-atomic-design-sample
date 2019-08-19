import * as Store from '@/types/store';
import state, { IState } from './state';
import actions from './actions';
import mutations from './mutations';

export * from './state';
export * from './libs/attributes';
export * from './libs/name';

export { state, actions, mutations };

export type StateTree = {
  employee: IState;
};

export type RootState = Pick<StateTree, 'employee'>;

export type ActionTree = {
  employee: Store.DispatchArgs<typeof actions>;
};
