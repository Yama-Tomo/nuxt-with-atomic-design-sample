import * as Employee from '@/store/search/employee';

export type StateTree = {
  search: {
    employee: Employee.StateTree;
  };
} & Employee.StateTree;

export type RootState = Pick<StateTree, 'search'>;

export type ActionTree = {
  search: {
    employee: Employee.ActionTree;
  };
} & Employee.ActionTree;
