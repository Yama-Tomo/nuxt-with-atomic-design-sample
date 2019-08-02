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
  @Prop({ required: true, type: Object }) employeeAttrs!: Employee.IState['attributes'];
  @Prop({ required: true, type: Object }) searchActions!: ActionTree<SearchEmployee.IActions>;
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
    this.searchActions.setConditions({ page: 1 });
    this.$emit('click');
  }

  updateBranchOptions(attrs: Employee.AttributeElement | undefined) {
    this.applyConditionFunctions.group = () =>
      this.searchActions.setConditions({ group: attrs ? attrs.value : undefined });
    this.searchActions.setConditions({ branch: undefined });

    if (attrs === undefined) {
      this.employeeActions.setAttribute({ branches: [] });
    } else {
      this.employeeActions.updateBranches({ axios: this.axios, groupId: attrs.value });
    }
  }

  render() {
    const group = () => (
      <VAutocomplete
        label="グループ"
        items={this.employeeAttrs.groups}
        item-text="label"
        item-value="value"
        return-object
        clearable
        onChange={this.updateBranchOptions}
      />
    );

    const branch = () => (
      <VAutocomplete
        label="部署"
        items={this.employeeAttrs.branches}
        item-text="label"
        item-value="value"
        return-object
        clearable
        onChange={(e: Employee.AttributeElement | undefined) =>
          this.applyConditionFunctions.branch = () => this.searchActions.setConditions({ branch: e ? e.value : undefined })
        }
      />
    );

    const name = () => (
      <VTextField
        label="氏名"
        onChange={(e: string | undefined) =>
          this.applyConditionFunctions.name = () => this.searchActions.setConditions({ name: e })
        }
      />
    );

    const sex = () => (
      <VAutocomplete
        label="性別"
        value={this.conditions.sex}
        item-text="label"
        item-value="value"
        return-object
        clearable
        onChange={(e: Employee.AttributeElement | undefined) =>
          this.applyConditionFunctions.sex = () => this.searchActions.setConditions({ sex: e ? e.value : undefined })
        }
      />
    );

    const country = () => (
      <VAutocomplete
        label="国籍"
        value={this.conditions.country}
        item-text="label"
        item-value="value"
        return-object
        clearable
        onChange={(e: Employee.AttributeElement | undefined) =>
          this.applyConditionFunctions.country = () => this.searchActions.setConditions({ country: e ? e.value : undefined })
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

type Props = Pick<EmployeeSearchBox, 'employeeAttrs' | 'axios' | 'searchActions' | 'employeeActions'>;

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
