import { Store } from 'vuex';
import { ActionMapper, StateMapper } from './module_mapper';

export type ActionTree<A> = {
  [K in keyof A]: (payload: A[K]) => Promise<any> | void
};

export const getState = <K extends keyof StateMapper>(
  store: Store<any>,
  module: K
): StateMapper[K] => {
  return store.state[module];
};

export const getActions = <K extends keyof ActionMapper>(
  store: Store<any>,
  module: K
): ActionTree<ActionMapper[K]> => {
  return Object.keys((store as any)._actions).reduce(
    (actions: any, name: string) => {
      const namespacePaths = name.split('/');

      if (namespacePaths.length === 1) {
        actions[name] = (payload: any) => store.dispatch(name, payload);
      } else {
        if (module !== namespacePaths[0]) {
          return actions;
        }
        actions[namespacePaths[1]] = (payload: any) =>
          store.dispatch(name, payload);
      }

      return actions;
    },
    {}
  );
};
