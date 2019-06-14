<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { VBtn, VTextField } from 'vuetify-tsx';
import VAutocomplete from '@/types/vuetify/VAutocomplete';
import { IActions, IState, ChooseDataElement } from '@/store_modules/search/employee';
import { ActionTree } from '@/store_modules/store_helper';

type Conditions = {
  group?: () => void;
  branch?: () => void;
  name?: () => void;
  sex?: () => void;
  country?: () => void;
}

@Component
class EmployeeSearchBox extends Vue {
  @Prop({ required: true, type: Object }) state!: IState;
  @Prop({ required: true, type: Object }) actions!: ActionTree<IActions>;
  applyConditionFunctions: Conditions = {};

  onClick() {
    (Object.keys(this.applyConditionFunctions) as (keyof Conditions)[]).forEach(k => {
      const func = this.applyConditionFunctions[k];
      if (func) {
        func();
      }
      this.applyConditionFunctions = {};
    })
  }

  render() {
    const group = () => (
      <VAutocomplete
        label="グループ"
        items={this.state.groups}
        item-text="label"
        item-value="value"
        return-object
        onChange={(e: ChooseDataElement) =>
          this.applyConditionFunctions.group = () => this.actions.setConditions({ key: 'group', val: e })
        }
      />
    );

    const branch = () => (
      <VAutocomplete
        label="部署"
        items={this.state.branches}
        item-text="label"
        item-value="value"
        return-object
        onChange={(e: ChooseDataElement) =>
          this.applyConditionFunctions.branch = () => this.actions.setConditions({ key: 'branch', val: e })
        }
      />
    );

    const name = () => (
      <VTextField
        label="氏名"
        onChange={(e: string) =>
          this.applyConditionFunctions.name = () => this.actions.setConditions({ key: 'name', val: e })
        }
      />
    );

    const sex = () => (
      <VAutocomplete
        label="性別"
        items={this.state.sex}
        item-text="label"
        item-value="value"
        return-object
        onChange={(e: ChooseDataElement) =>
          this.applyConditionFunctions.sex = () => this.actions.setConditions({ key: 'sex', val: e })
        }
      />
    );

    const country = () => (
      <VAutocomplete
        label="国籍"
        items={this.state.countries}
        item-text="label"
        item-value="value"
        return-object
        onChange={(e: ChooseDataElement) =>
          this.applyConditionFunctions.country = () => this.actions.setConditions({ key: 'country', val: e })
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

type Props = Pick<EmployeeSearchBox, 'state' | 'actions'>;
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

export default vts.ofType<Props, {}, Slots>().convert(EmployeeSearchBox);
</script>
