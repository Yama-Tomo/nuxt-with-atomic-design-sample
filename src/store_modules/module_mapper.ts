import * as SearchEmployee from './search/employee';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export namespace modules.search.employee {
  export const conditions = 'search#employee#conditions';
}

export interface StateMapper {
  [modules.search.employee.conditions]: SearchEmployee.IState;
}

export interface ActionMapper {
  [modules.search.employee.conditions]: SearchEmployee.IActions;
}
