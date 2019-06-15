import * as Employee from './employee';
import * as SearchEmployee from './search/employee';

export namespace modules {
  export const employee = 'employee';

  export namespace search {
    export namespace employee {
      export const conditions = 'search#employee#conditions';
    }
  }
}

export interface StateMapper {
  [modules.employee]: Employee.IState;
  [modules.search.employee.conditions]: SearchEmployee.IState;
}

export interface ActionMapper {
  [modules.employee]: Employee.IActions;
  [modules.search.employee.conditions]: SearchEmployee.IActions;
}
