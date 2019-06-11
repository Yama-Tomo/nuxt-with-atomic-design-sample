import * as SearchEmployer from './search/employer';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export namespace modules.search.employer {
  export const conditions = 'search#employer#conditions';
}

export interface StateMapper {
  [modules.search.employer.conditions]: SearchEmployer.IState;
}

export interface ActionMapper {
  [modules.search.employer.conditions]: SearchEmployer.IActions;
}
