import { DefineMutations } from 'vuex-type-helper';
import defaultState, { IState } from './state';
import { swap } from '@/utils/variable';

export interface IMutations {
  resetState: undefined;
  setConditions: Partial<IState>;
}

export const mutations: DefineMutations<IMutations, IState> = {
  resetState(state) {
    const resetState = defaultState();
    for (const key of Object.keys(state) as (keyof typeof state)[]) {
      swap(state, resetState, key);
    }
  },
  setConditions(state, args) {
    for (const key of Object.keys(args) as (keyof typeof args)[]) {
      swap(state, args, key);
    }
  },
};

export default mutations;
