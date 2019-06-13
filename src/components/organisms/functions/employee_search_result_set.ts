import { IState } from '@/store_modules/search/employee';

export const pagination = (conditions: IState['conditions']) => ({
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

// TODO: valueを返す関数を実装
