import * as SearchEmployee from '@/store_modules/search/employee';
import * as Employee from '@/store_modules/employee';
import * as EmployeeDomain from '@/domains/employee';
import { VDataTable } from 'vuetify-tsx';

type TsxAttrs = InstanceType<typeof VDataTable>['_tsxattrs'];

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  belongs: Array<{ group: string; branches: string[] }>;
  sex: number;
  country: number;
}

export const pagination = (conditions: SearchEmployee.IState) => ({
  descending: conditions.descending,
  page: conditions.page,
  sortBy: conditions.sortBy,
  rowsPerPage: conditions.rowsPerPage,
});

export const headers = (): TsxAttrs['headers'] => [
  { text: 'ID', value: 'id', align: 'center' },
  { text: '氏名', value: 'name', align: 'left' },
  { text: '所属', value: 'group_name', align: 'left' },
  { text: '性別', value: 'sex', align: 'center' },
  { text: '国籍', value: 'country', align: 'center' },
];

export const decorate = (
  employee: IEmployee,
  employeeAttrs: Employee.IState['attributes']
) => {
  const sex = employeeAttrs.sex.find(v => v.value === employee.sex);
  const country = employeeAttrs.countries.find(
    v => v.value === employee.country
  );

  return {
    ...employee,
    ...{
      fullName: EmployeeDomain.fullName(
        employee.firstName,
        employee.lastName,
        employee.country
      ),
      sex: (sex && sex.label) || '',
      country: (country && country.label) || '',
    },
  };
};
