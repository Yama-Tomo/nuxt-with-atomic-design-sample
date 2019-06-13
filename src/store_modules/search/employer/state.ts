export type ChooseDataElement = {
  label: string | number | null;
  value: string | number | null;
};

export interface IState {
  groups: ChooseDataElement[];
  branches: ChooseDataElement[];
  sex: ChooseDataElement[];
  countries: ChooseDataElement[];
  conditions: {
    group?: ChooseDataElement;
    branch?: ChooseDataElement;
    name?: string;
    sex?: ChooseDataElement;
    country?: ChooseDataElement;
    descending: boolean;
    page: number;
    sortBy: string;
    rowsPerPage: number;
  };
}

const defaultState = (): IState => ({
  groups: [],
  branches: [],
  sex: [],
  countries: [],
  conditions: {
    descending: false,
    page: 1,
    sortBy: 'name',
    rowsPerPage: 10,
  },
});

export default defaultState;
