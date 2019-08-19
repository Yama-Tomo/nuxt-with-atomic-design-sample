import { MutationTree } from 'vuex';
import defaultState, { IState } from './state';
import { keys } from '@/utils/object';
import { swap } from '@/utils/variable';

export const mutations = {
  resetState(state: IState) {
    const resetState = defaultState();
    for (const key of keys(state)) {
      swap(state, resetState, key);
    }
  },
  setConditions(state: IState, args: Partial<IState>) {
    for (const key of keys(args)) {
      swap(state, args, key);
    }
  },
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _checkTypes: MutationTree<IState> = mutations; // don't remove this line;

export default mutations;
