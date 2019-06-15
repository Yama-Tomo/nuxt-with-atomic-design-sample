import * as SearchEmployee from '@/store_modules/search/employee';
import * as Employee from '@/store_modules/employee';
import * as EmployeeDomain from '@/domains/employee';

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

export const headers = () => [
  { text: 'ID', value: 'id' },
  { text: '氏名', value: 'name' },
  { text: 'グループ', value: 'group_name' },
  { text: '部署', value: 'branch_name' },
  { text: '性別', value: 'sex' },
  { text: '国籍', value: 'country' },
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
