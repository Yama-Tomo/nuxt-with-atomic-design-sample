import { DefineMutations } from 'vuex-type-helper';
import defaultState, { IState, ChooseDataElement } from './state';
import { replace, swap } from '@/utils/variable';

type ConditionKeyValuePair = {
  [P in keyof IState['conditions']]: { key: P; val: IState['conditions'][P] }
};
export type setConditionArg = Exclude<
  ConditionKeyValuePair[keyof ConditionKeyValuePair],
  undefined
>;

export interface IMutations {
  resetState: undefined;
  setChooseData: { key: 'groups' | 'branches'; val: ChooseDataElement[] };
  setConditions: setConditionArg;
}

export const mutations: DefineMutations<IMutations, IState> = {
  resetState(state) {
    const resetState = defaultState();
    for (const key of Object.keys(state) as Array<keyof IState>) {
      swap(state, resetState, key);
    }
  },
  setChooseData(state, args) {
    state[args.key] = args.val;
  },
  setConditions(state, args) {
    replace(state.conditions, args.key, args.val);
  },
};

export default mutations;
