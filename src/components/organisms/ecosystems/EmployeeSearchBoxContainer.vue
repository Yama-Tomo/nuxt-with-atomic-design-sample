<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import * as Employee from '@/store_modules/employee';
import * as SearchEmployee from '@/store_modules/search/employee';
import { ActionTree } from '@/store_modules/store_helper';

type Conditions = {
  group?: () => void;
  branch?: () => void;
  name?: () => void;
  sex?: () => void;
  country?: () => void;
};

@Component
class EmployeeSearchBoxContainer extends Vue {
  @Prop({ required: true, type: Object })
  employeeAttrs!: Employee.IState['attributes'];
  @Prop({ required: true, type: Object }) conditions!: SearchEmployee.IState;
  @Prop({ required: true, type: Object }) employeeActions!: ActionTree<
    Employee.IActions
  >;
  @Prop({ required: true, type: Object }) searchActions!: ActionTree<
    SearchEmployee.IActions
  >;
  applyConditionFunctions: Conditions = {};

  emitClick() {
    (Object.keys(this.applyConditionFunctions) as (keyof Conditions)[]).forEach(
      k => {
        const func = this.applyConditionFunctions[k];
        func && func();
      }
    );

    this.applyConditionFunctions = {};
    this.searchActions.setConditions({ page: 1 });
    this.$emit('click');
  }

  setCondition(
    type: Required<keyof Conditions>,
    e?: Employee.AttributeElement
  ) {
    const value = e ? e.value : undefined;
    this.applyConditionFunctions[type] = () =>
      this.searchActions.setConditions({ [type]: value });
  }

  updateBranchOptions(attrs?: Employee.AttributeElement) {
    this.applyConditionFunctions.group = () =>
      this.searchActions.setConditions({
        group: attrs ? attrs.value : undefined,
      });
    this.searchActions.setConditions({ branch: undefined });

    if (attrs === undefined) {
      this.employeeActions.setAttribute({ branches: [] });
    } else {
      this.employeeActions.updateBranches(attrs.value);
    }
  }

  render() {
    if (!this.$scopedSlots.render) {
      return;
    }

    const slotArgs: Slots['render'] = {
      conditions: this.conditions,
      optionAttrs: this.employeeAttrs,
      setCondition: this.setCondition,
      emitClick: this.emitClick,
      updateBranchOptions: this.updateBranchOptions,
    };

    return this.$scopedSlots.render(slotArgs);
  }
}

export type Props = Pick<
  EmployeeSearchBoxContainer,
  'employeeAttrs' | 'searchActions' | 'employeeActions' | 'conditions'
>;

export interface Events {
  onClick: () => void;
}

export interface Slots {
  render: {
    conditions: EmployeeSearchBoxContainer['conditions'];
    optionAttrs: EmployeeSearchBoxContainer['employeeAttrs'];
    setCondition: EmployeeSearchBoxContainer['setCondition'];
    emitClick: EmployeeSearchBoxContainer['emitClick'];
    updateBranchOptions: EmployeeSearchBoxContainer['updateBranchOptions'];
  };
}

export default vts
  .ofType<Props, Events, Slots>()
  .convert(EmployeeSearchBoxContainer);
</script>