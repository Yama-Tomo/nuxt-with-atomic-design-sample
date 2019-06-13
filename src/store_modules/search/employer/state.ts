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
  };
}

const defaultState = (): IState => ({
  groups: [],
  branches: [],
  sex: [],
  countries: [],
  conditions: {},
});

export default defaultState;
