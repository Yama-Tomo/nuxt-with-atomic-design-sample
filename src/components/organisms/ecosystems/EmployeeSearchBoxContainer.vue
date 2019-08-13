<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import * as Employee from '@/store_modules/employee';
import * as SearchEmployee from '@/store_modules/search/employee';
import { ActionTree } from '@/store_modules/store_helper';
import { keys } from '@/utils/object';

type Conditions = {
  [P in keyof SearchEmployee.IActions['setConditions']]: () => void
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

  applyConditions() {
    keys(this.applyConditionFunctions).forEach(name => {
      const func = this.applyConditionFunctions[name];
      func && func();
    });

    this.applyConditionFunctions = {};
    this.searchActions.setConditions({ page: 1 });
  }

  registerConditions(conditions: SearchEmployee.IActions['setConditions']) {
    keys(conditions).forEach(name => {
      this.applyConditionFunctions[name] = () =>
        this.searchActions.setConditions({ [name]: conditions[name] });
    });
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
      registerConditions: this.registerConditions,
      applyConditions: this.applyConditions,
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
    registerConditions: EmployeeSearchBoxContainer['registerConditions'];
    applyConditions: EmployeeSearchBoxContainer['applyConditions'];
    updateBranchOptions: EmployeeSearchBoxContainer['updateBranchOptions'];
  };
}

export default vts
  .ofType<Props, Events, Slots>()
  .convert(EmployeeSearchBoxContainer);
</script>
