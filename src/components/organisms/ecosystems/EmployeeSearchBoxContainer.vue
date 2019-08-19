<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { keys } from '@/utils/object';
import { AttributeElement } from '@/store/employee';
import { StateTree, ActionTree } from '@/store/module_mapper';

type ConditionArgs = Parameters<
  ActionTree['search/employee']['setConditions']
>[0];
type Conditions = { [P in keyof ConditionArgs]: () => void };

@Component
class EmployeeSearchBoxContainer extends Vue {
  @Prop({ required: true, type: Object })
  employeeAttrs!: StateTree['employee']['attributes'];

  @Prop({ required: true, type: Object })
  conditions!: StateTree['search/employee'];

  @Prop({ required: true, type: Object })
  employeeActions!: ActionTree['employee'];

  @Prop({ required: true, type: Object })
  searchActions!: ActionTree['search/employee'];

  applyConditionFunctions: Conditions = {};

  applyConditions() {
    keys(this.applyConditionFunctions).forEach(name => {
      const func = this.applyConditionFunctions[name];
      func && func();
    });

    this.applyConditionFunctions = {};
    this.searchActions.setConditions({ page: 1 });
  }

  registerConditions(conditions: ConditionArgs) {
    keys(conditions).forEach(name => {
      this.applyConditionFunctions[name] = () =>
        this.searchActions.setConditions({ [name]: conditions[name] });
    });
  }

  updateBranchOptions(attrs?: AttributeElement) {
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
