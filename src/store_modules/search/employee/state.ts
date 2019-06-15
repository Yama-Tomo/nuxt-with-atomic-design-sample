import { AttributeElement } from '@/store_modules/employee';

export interface IState {
  group?: AttributeElement;
  branch?: AttributeElement;
  name?: string;
  sex?: AttributeElement;
  country?: AttributeElement;
  descending: boolean;
  page: number;
  sortBy: string;
  rowsPerPage: number;
}

const defaultState = (): IState => ({
  descending: false,
  page: 1,
  sortBy: 'name',
  rowsPerPage: 10,
});

export default defaultState;
