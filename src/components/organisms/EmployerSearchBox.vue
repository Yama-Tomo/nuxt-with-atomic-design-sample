<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { VBtn, VTextField } from 'vuetify-tsx';
import VAutocomplete from '@/types/vuetify/VAutocomplete';
import { IActions, IState, ChooseDataElement } from '@/store_modules/search/employer';
import { ActionTree } from '@/store_modules/store_helper';

@Component
class Select extends Vue {
  @Prop({ required: true, type: Object }) state!: IState;
  @Prop({ required: true, type: Object }) actions!: ActionTree<IActions>;

  render() {
    return (
      <div>
        <VAutocomplete
          label="グループ"
          items={this.state.groups}
          item-text="label"
          item-value="value"
          return-object
          onChange={(e: ChooseDataElement) => { this.actions.setConditions({ key: 'group', val: e }) } }
        />
        <VAutocomplete
          label="部署"
          items={this.state.branches}
          item-text="label"
          item-value="value"
          return-object
          onChange={(e: ChooseDataElement) => { this.actions.setConditions({ key: 'branch', val: e }) } }
        />
        <VTextField
          label="氏名"
          onChange={(e: string) => { this.actions.setConditions({ key: 'name', val: e }) }}
          onInput={(e: string) => { this.actions.setConditions({ key: 'name', val: e }) }}
        />
        <VAutocomplete
          label="性別"
          items={this.state.sex}
          item-text="label"
          item-value="value"
          return-object
          onChange={(e: ChooseDataElement) => { this.actions.setConditions({ key: 'sex', val: e }) } }
        />
        <VAutocomplete
          label="国籍"
          items={this.state.countries}
          item-text="label"
          item-value="value"
          return-object
          onChange={(e: ChooseDataElement) => { this.actions.setConditions({ key: 'country', val: e }) } }
        />
        <VBtn color="primary">Search</VBtn>
      </div>
    );
  }
}

type Props = Pick<Select, 'state' | 'actions'>;
export default vts.ofType<Props>().convert(Select);
</script>
