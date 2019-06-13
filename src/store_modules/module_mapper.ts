import * as SearchEmployee from './search/employee';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export namespace modules.search.employer {
  export const conditions = 'search#employer#conditions';
}

export interface StateMapper {
  [modules.search.employer.conditions]: SearchEmployee.IState;
}

export interface ActionMapper {
  [modules.search.employer.conditions]: SearchEmployee.IActions;
}
