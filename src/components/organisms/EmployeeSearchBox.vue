<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { VBtn, VTextField } from 'vuetify-tsx';
import VAutocomplete from '@/types/vuetify/VAutocomplete';
import * as Employee from '@/store_modules/employee';
import * as SearchEmployee from '@/store_modules/search/employee';
import { ActionTree } from '@/store_modules/store_helper';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

type Conditions = {
  group?: () => void;
  branch?: () => void;
  name?: () => void;
  sex?: () => void;
  country?: () => void;
}

@Component
class EmployeeSearchBox extends Vue {
  @Prop({ required: true, type: Object }) employee!: Employee.IState;
  @Prop({ required: true, type: Object }) searchEmployeeActions!: ActionTree<SearchEmployee.IActions>;
  @Prop({ required: true, type: Function }) axios!: NuxtAxiosInstance;
  @Prop({ required: true, type: Object }) employeeActions!: ActionTree<Employee.IActions>;
  applyConditionFunctions: Conditions = {};

  onClick() {
    (Object.keys(this.applyConditionFunctions) as (keyof Conditions)[]).forEach(k => {
      const func = this.applyConditionFunctions[k];
      if (func) {
        func();
      }
    });
    this.applyConditionFunctions = {};
    this.searchEmployeeActions.setConditions({ key: 'page', val: 1 });
    this.$emit('click');
  }

  render() {
    const group = () => (
      <VAutocomplete
        label="グループ"
        items={this.employee.attributes.groups}
        item-text="label"
        item-value="value"
        return-object
        clearable
        onChange={(e: Employee.AttributeElement | undefined) => {
          this.applyConditionFunctions.group = () => this.searchEmployeeActions.setConditions({ key: 'group', val: e });
          this.searchEmployeeActions.setConditions({ key: 'branch', val: undefined });

          if (e === undefined) {
            this.employeeActions.setAttribute({ key: 'branches', val: [] });
          } else {
            this.employeeActions.updateBranches({ axios: this.axios, groupId: e.value });
          }
        }}
      />
    );

    const branch = () => (
      <VAutocomplete
        label="部署"
        items={this.employee.attributes.branches}
        item-text="label"
        item-value="value"
        return-object
        clearable
        onChange={(e: Employee.AttributeElement | undefined) =>
          this.applyConditionFunctions.branch = () => this.searchEmployeeActions.setConditions({ key: 'branch', val: e })
        }
      />
    );

    const name = () => (
      <VTextField
        label="氏名"
        onChange={(e: string | undefined) =>
          this.applyConditionFunctions.name = () => this.searchEmployeeActions.setConditions({ key: 'name', val: e })
        }
      />
    );

    const sex = () => (
      <VAutocomplete
        label="性別"
        items={this.employee.attributes.sex}
        item-text="label"
        item-value="value"
        return-object
        clearable
        onChange={(e: Employee.AttributeElement | undefined) =>
          this.applyConditionFunctions.sex = () => this.searchEmployeeActions.setConditions({ key: 'sex', val: e })
        }
      />
    );

    const country = () => (
      <VAutocomplete
        label="国籍"
        items={this.employee.attributes.countries}
        item-text="label"
        item-value="value"
        return-object
        clearable
        onChange={(e: Employee.AttributeElement | undefined) =>
          this.applyConditionFunctions.country = () => this.searchEmployeeActions.setConditions({ key: 'country', val: e })
        }
      />
    );

    const button = () => <VBtn color="primary" onClick={this.onClick}>Search</VBtn>;

    if (this.$scopedSlots.customLayout) {
      return this.$scopedSlots.customLayout({ group, branch, name, sex, country, button });
    }

    return (
      <div>
        {group()}
        {branch()}
        {name()}
        {sex()}
        {country()}
        {button()}
      </div>
    );
  }
}

type Props = Pick<EmployeeSearchBox, 'employee' | 'axios' | 'searchEmployeeActions' | 'employeeActions'>;

interface Slots {
  customLayout: {
    group: () => void;
    branch: () => void;
    name: () => void;
    sex: () => void;
    country: () => void;
    button: () => void;
  }
}

interface Events {
  onClick: () => void;
}

export default vts.ofType<Props, Events, Slots>().convert(EmployeeSearchBox);
</script>
