import { DefineMutations } from 'vuex-type-helper';
import defaultState, { IState, AttributeElement } from './state';
import { swap } from '@/utils/variable';

export interface IMutations {
  resetState: undefined;
  setAttribute: {
    key: keyof IState['attributes'];
    val: AttributeElement[];
  };
}

export const mutations: DefineMutations<IMutations, IState> = {
  resetState(state) {
    const resetState = defaultState();
    for (const key of Object.keys(state) as Array<keyof IState>) {
      swap(state, resetState, key);
    }
  },
  setAttribute(state, args) {
    state.attributes[args.key] = args.val;
  },
};

export default mutations;
