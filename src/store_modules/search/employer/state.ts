export type ChooseDataElement = {
  label: string | number | null;
  value: string | number | null;
};

export interface IState {
  groups: ChooseDataElement[];
  branches: ChooseDataElement[];
  conditions: {
    group?: ChooseDataElement;
    branch?: ChooseDataElement;
    name?: string;
    sex?: string;
  };
}

const defaultState = (): IState => ({
  groups: [],
  branches: [],
  conditions: {
    group: undefined,
    branch: undefined,
    name: undefined,
    sex: undefined,
  },
});

export default defaultState;
