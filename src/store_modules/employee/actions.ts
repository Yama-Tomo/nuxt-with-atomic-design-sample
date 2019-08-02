import { DefineActions } from 'vuex-type-helper';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IState } from './state';
import { IMutations } from './mutations';
import { Request } from '@/repositories/network/api/branches/get';

export interface IActions {
  resetState: IMutations['resetState'];
  setAttribute: IMutations['setAttribute'];
  updateBranches: { axios: NuxtAxiosInstance; groupId: number };
}

export const actions: DefineActions<IActions, IState, IMutations> = {
  resetState: ({ commit }) => commit('resetState', undefined),
  setAttribute: ({ commit }, args) => commit('setAttribute', args),
  updateBranches: async ({ commit }, args) => {
    const request = new Request(args.axios);
    const data = await request.send({ groupId: args.groupId });
    const branches = data.map(d => ({ label: d.name, value: d.id }));

    commit('setAttribute', { branches });
  },
};

export default actions;
