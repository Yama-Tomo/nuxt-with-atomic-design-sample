export type AttributeElement = {
  label: string | number | null;
  value: string | number | null;
};

export interface IState {
  attributes: {
    groups: AttributeElement[];
    branches: AttributeElement[];
    sex: AttributeElement[];
    countries: AttributeElement[];
  };
}

const defaultState = (): IState => ({
  attributes: {
    groups: [],
    branches: [],
    sex: [],
    countries: [],
  },
});

export default defaultState;
