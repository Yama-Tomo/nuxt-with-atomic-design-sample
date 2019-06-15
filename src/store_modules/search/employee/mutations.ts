import { DefineMutations } from 'vuex-type-helper';
import defaultState, { IState } from './state';
import { replace, swap } from '@/utils/variable';

type ConditionKeyValuePair = {
  [P in keyof IState]: { key: P; val: IState[P] }
};

export type setConditionArg = Exclude<
  ConditionKeyValuePair[keyof ConditionKeyValuePair],
  undefined
>;

export interface IMutations {
  resetState: undefined;
  setConditions: setConditionArg;
}

export const mutations: DefineMutations<IMutations, IState> = {
  resetState(state) {
    const resetState = defaultState();
    for (const key of Object.keys(state) as Array<keyof IState>) {
      swap(state, resetState, key);
    }
  },
  setConditions(state, args) {
    replace(state, args.key, args.val);
  },
};

export default mutations;
