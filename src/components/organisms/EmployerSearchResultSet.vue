<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { VDataTable } from 'vuetify-tsx';
import { IActions, IState } from '@/store_modules/search/employer';
import { ActionTree } from '@/store_modules/store_helper';
import { headers, pagination } from './functions/employer_search_result_set';

@Component
class EmployerSearchResultSet extends Vue {
  @Prop({ required: true, type: Object }) state!: IState;
  @Prop({ required: true, type: Object }) actions!: ActionTree<IActions>;
  // TODO: ドメインオブジェクトを実装したらanyを変更する
  @Prop({ required: true, type: Object }) dataSets!: { items: any[]; totalCount: number };

  render() {
    return (
      <VDataTable
        items={this.dataSets.items}
        totalItems={this.dataSets.totalCount}
        pagination={pagination(this.state.conditions)}
        headers={headers()}
        scopedSlots={{
          items: props => {
            return (
              <tr>
                <td class="text-xs-right">{(props.item as any).name}</td>
                <td class="text-xs-right">{(props.item as any).country}</td>
              </tr>
            );
          }
        }}
        on={{
          'update:pagination': (pagination) => {
            if (pagination.page) {
              this.actions.setConditions({ key: 'page', val: pagination.page });
            }

            if (pagination.sortBy) {
              this.actions.setConditions({ key: 'sortBy', val: pagination.sortBy });
            }

            this.actions.setConditions({ key: 'descending', val: !!pagination.descending });

            if (pagination.rowsPerPage) {
              this.actions.setConditions({ key: 'rowsPerPage', val: pagination.rowsPerPage });
            }

          }
        }}
      />
    );
  }
}

type Props = Pick<EmployerSearchResultSet, 'state' | 'actions' | 'dataSets'>;
export default vts.ofType<Props>().convert(EmployerSearchResultSet);
</script>
