import { DefineActions } from 'vuex-type-helper';
import { IState } from './state';
import { IMutations } from './mutations';
import * as Request from '@/api/branches/get';

export interface IActions {
  resetState: IMutations['resetState'];
  setAttribute: IMutations['setAttribute'];
  updateBranches: number;
}

export const actions: DefineActions<IActions, IState, IMutations> = {
  resetState: ({ commit }) => commit('resetState', undefined),
  setAttribute: ({ commit }, args) => commit('setAttribute', args),
  async updateBranches({ commit }, groupId) {
    const data = await Request.send(this.$axios, { groupId });
    const branches = data.map(d => ({ label: d.name, value: d.id }));

    commit('setAttribute', { branches });
  },
};

export default actions;
