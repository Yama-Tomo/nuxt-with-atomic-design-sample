import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IState } from './state';
import mutations from './mutations';
import { ActionContext, MutationArgs } from '@/types/store';
import { RootState } from '@/store/module_mapper';
import * as Request from '@/api/branches/get';

type Context = ActionContext<IState, typeof mutations, RootState>;
type SetAttributePayload = MutationArgs<typeof mutations>['setAttribute'];

export const actions = {
  resetState: (ctx: Context) => ctx.commit('resetState', undefined),
  setAttribute: (ctx: Context, args: SetAttributePayload) =>
    ctx.commit('setAttribute', args),
  async updateBranches(
    this: { $axios: NuxtAxiosInstance },
    ctx: Context,
    groupId: number
  ) {
    const data = await Request.send(this.$axios, { groupId });
    const branches = data.map(d => ({ label: d.name, value: d.id }));

    ctx.commit('setAttribute', { branches });
  },
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _checkTypes: ActionTree<IState, RootState> = actions; // don't remove this line;

export default actions;
