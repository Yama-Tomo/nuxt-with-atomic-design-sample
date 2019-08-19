import { Store } from 'vuex';
import set from 'lodash/set';
import get from 'lodash/get';
import { ActionTree, StateTree } from './module_mapper';

export const getActions = <K extends keyof ActionTree>(
  namespace: K,
  store: Store<any>
): ActionTree[K] => {
  const nestLevel = namespace.split('/').length;

  return Object.keys((store as any)._actions).reduce(
    (actions: any, name: string) => {
      if (!name.includes(namespace)) {
        return actions;
      }

      const assignKey = name
        .split('/')
        .slice(nestLevel)
        .join('.');
      const dispatch = (payload: unknown) => store.dispatch(name, payload);
      return set(actions, assignKey, dispatch);
    },
    {}
  );
};

export const getState = <K extends keyof StateTree>(
  namespace: K,
  store: Store<any>
): StateTree[K] => get(store.state, namespace.replace(/\//, '.'));
