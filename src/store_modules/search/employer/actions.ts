import { DefineActions } from 'vuex-type-helper';
import { IState } from './state';
import { IMutations } from './mutations';

export interface IActions {
  resetState: IMutations['resetState'];
  setChooseData: IMutations['setChooseData'];
  setConditions: IMutations['setConditions'];
}

export const actions: DefineActions<IActions, IState, IMutations> = {
  resetState: ({ commit }) => commit('resetState', undefined),
  setChooseData: ({ commit }, args) => commit('setChooseData', args),
  setConditions: ({ commit }, args) => commit('setConditions', args),
};

export default actions;
