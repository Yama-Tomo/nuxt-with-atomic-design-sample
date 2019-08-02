import { DefineMutations } from 'vuex-type-helper';
import defaultState, { IState } from './state';
import { swap } from '@/utils/variable';

export interface IMutations {
  resetState: undefined;
  setAttribute: Partial<IState['attributes']>;
}

export const mutations: DefineMutations<IMutations, IState> = {
  resetState(state) {
    const resetState = defaultState();
    for (const key of Object.keys(state) as Array<keyof IState>) {
      swap(state, resetState, key);
    }
  },
  setAttribute(state, args) {
    const target = state.attributes;
    for (const key of Object.keys(args) as (keyof typeof args)[]) {
      swap(target, args, key);
    }
  },
};

export default mutations;
