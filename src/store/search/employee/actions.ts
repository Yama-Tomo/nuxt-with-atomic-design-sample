import { ActionTree } from 'vuex';
import { IState } from './state';
import mutations from './mutations';
import { ActionContext, MutationArgs } from '@/types/store';
import { RootState } from '@/store/module_mapper';

type Context = ActionContext<IState, typeof mutations, RootState>;

export const actions = {
  resetState: (ctx: Context) => ctx.commit('resetState', undefined),
  setConditions: (
    ctx: Context,
    args: MutationArgs<typeof mutations>['setConditions']
  ) => ctx.commit('setConditions', args),
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _checkTypes: ActionTree<IState, RootState> = actions; // don't remove this line;

export default actions;
