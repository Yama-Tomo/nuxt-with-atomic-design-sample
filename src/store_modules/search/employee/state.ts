import { AttributeElement } from '@/store_modules/employee';

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

const defaultState = (): IState => ({
  descending: false,
  page: 1,
  sortBy: 'id',
  rowsPerPage: 10,
});

export default defaultState;
