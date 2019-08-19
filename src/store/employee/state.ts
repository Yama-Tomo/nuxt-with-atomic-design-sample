export interface AttributeElement {
  label: string | number | null;
  value: number;
}

export interface IState {
  attributes: {
    groups: AttributeElement[];
    branches: AttributeElement[];
    sex: AttributeElement[];
    countries: AttributeElement[];
  };
}

const state = (): IState => ({
  attributes: {
    groups: [],
    branches: [],
    sex: [],
    countries: [],
  },
});

export default state;
