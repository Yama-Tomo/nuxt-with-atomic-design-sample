import { AttributeElement } from '@/store/employee';

export interface IState {
  group?: AttributeElement['value'];
  branch?: AttributeElement['value'];
  name?: string;
  sex?: AttributeElement['value'];
  country?: AttributeElement['value'];
  descending: boolean;
  page: number;
  sortBy: string;
  rowsPerPage: number;
}

const state = (): IState => ({
  descending: false,
  page: 1,
  sortBy: 'id',
  rowsPerPage: 10,
});

export default state;
