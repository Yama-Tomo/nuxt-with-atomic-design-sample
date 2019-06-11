<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Vue } from 'nuxt-property-decorator';
import { VAutocomplete, VBtn } from 'vuetify-tsx';

@Component
class Select extends Vue {
  public groups = [
    { label: '営業', value: '1' },
    { label: '開発', value: '2' },
    { label: '総務', value: '3' },
  ];

  public branches = [
    { label: '第一営業部', value: '1' },
    { label: '第二営業部', value: '2' },
    { label: 'ソフトウェア開発部', value: '3' },
    { label: '研究開発部', value: '4' },
    { label: 'インフラ', value: '5' },
    { label: '総務部', value: '6' },
  ];

  render() {
    // TODO: 氏名，性別の検索
    return (
      <div>
        <VAutocomplete
          label="グループ"
          items={this.groups}
          item-text="label"
          item-value="value"
        />
        <VAutocomplete
          label="部署"
          items={this.branches}
          item-text="label"
          item-value="value"
        />
        <VBtn color="primary">Search</VBtn>
      </div>
    );
  }
}

// TODO: ofTypeの型引数に与える予定
type Props = Pick<Select, 'groups'>;
export default vts.ofType().convert(Select);
</script>
