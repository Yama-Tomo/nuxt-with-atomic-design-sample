<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { VAutocomplete, VBtn } from 'vuetify-tsx';
import { IActions, IState } from "@/store_modules/search/employer";
import { ActionTree } from '@/store_modules/store_helper';

@Component
class Select extends Vue {
  @Prop({ required: true, type: Object }) state!: IState;
  @Prop({ required: true, type: Object }) actions!: ActionTree<IActions>;

  render() {
    // TODO: 氏名，性別の検索
    return (
      <div>
        <VAutocomplete
          label="グループ"
          items={this.state.groups}
          item-text="label"
          item-value="value"
        />
        <VAutocomplete
          label="部署"
          items={this.state.branches}
          item-text="label"
          item-value="value"
        />
        <VBtn color="primary">Search</VBtn>
      </div>
    );
  }
}

type Props = Pick<Select, 'state' | 'actions'>;
export default vts.ofType<Props>().convert(Select);

</script>
