import { DefineActions } from 'vuex-type-helper';
import { ChooseDataElement, IState } from './state';
import { IMutations, setConditionArg } from './mutations';

export interface IActions {
  resetState: undefined;
  setChooseData: { key: 'groups' | 'branches'; val: ChooseDataElement[] };
  setConditions: setConditionArg;
}

export const actions: DefineActions<IActions, IState, IMutations> = {
  resetState: ({ commit }) => commit('resetState', undefined),
  setChooseData: ({ commit }, args) => commit('setChooseData', args),
  setConditions: ({ commit }, args) => commit('setConditions', args),
};

export default actions;
