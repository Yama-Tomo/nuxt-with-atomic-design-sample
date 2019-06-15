import { DefineActions } from 'vuex-type-helper';
import { IState } from './state';
import { IMutations } from './mutations';

export interface IActions {
  resetState: IMutations['resetState'];
  setAttribute: IMutations['setAttribute'];
}

export const actions: DefineActions<IActions, IState, IMutations> = {
  resetState: ({ commit }) => commit('resetState', undefined),
  setAttribute: ({ commit }, args) => commit('setAttribute', args),
};

export default actions;
