<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { VDataTable } from 'vuetify-tsx';
import * as Employee from '@/store_modules/employee';
import * as SearchEmployee from '@/store_modules/search/employee';
import { ActionTree } from '@/store_modules/store_helper';
import * as DataProvider from '@/components/organisms/EmployeeSearchResultSet/data_provider';

type TsxAttrs = InstanceType<typeof VDataTable>['_tsxattrs']
type Pagination = Parameters<NonNullable<NonNullable<TsxAttrs['on']>['update:pagination']>>[0];

@Component
class EmployeeSearchResultSet extends Vue {
  @Prop({ required: true, type: Object }) employee!: Employee.IState;
  @Prop({ required: true, type: Object }) searchEmployee!: SearchEmployee.IState;
  @Prop({ required: true, type: Object }) actions!: ActionTree<SearchEmployee.IActions>;
  @Prop({ required: true, type: Object }) dataSets!: { items: DataProvider.IEmployee[]; totalCount: number };

  onChangePagination(pagination: Pagination) {
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

  render() {
    return (
      <VDataTable
        items={this.dataSets.items}
        totalItems={this.dataSets.totalCount}
        pagination={DataProvider.pagination(this.searchEmployee)}
        headers={DataProvider.headers()}
        scopedSlots={{
          items: (props: { item: DataProvider.IEmployee }) => {
            const employee = DataProvider.decorate(props.item, this.employee.attributes);
            return (
              <tr>
                <td class="text-xs-right">{employee.id}</td>
                <td>{employee.fullName}</td>
                <td>
                  {props.item.belongs.map(belongs => (
                    <ul>
                      <li>{belongs.group}</li>
                      <ul class="branch">
                        {belongs.branches.map(branch => (
                          <li>{branch}</li>
                        ))}
                      </ul>
                    </ul>
                  ))}
                </td>
                <td class="text-xs-right">{employee.sex}</td>
                <td class="text-xs-right">{employee.country}</td>
              </tr>
            );
          }
        }}
        on={
          { 'update:pagination': this.onChangePagination }
        }
      />
    );
  }
}

type Props = Pick<EmployeeSearchResultSet, 'employee' | 'searchEmployee' | 'actions' | 'dataSets'>;
export default vts.ofType<Props>().convert(EmployeeSearchResultSet);
</script>
