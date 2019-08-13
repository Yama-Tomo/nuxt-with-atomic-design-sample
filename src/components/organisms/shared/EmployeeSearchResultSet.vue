<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { VDataTable } from 'vuetify-tsx';
import * as Employee from '../../../store_modules/employee';
import * as SearchEmployee from '../../../store_modules/search/employee';
import { ActionTree } from '../../../store_modules/store_helper';
import { DataSets } from '../../../pages/index.vue';

type TsxAttrs = InstanceType<typeof VDataTable>['_tsxattrs'];
type Pagination = Parameters<
  NonNullable<NonNullable<TsxAttrs['on']>['update:pagination']>
>[0];

const pagination = (conditions: SearchEmployee.IState) => ({
  descending: conditions.descending,
  page: conditions.page,
  sortBy: conditions.sortBy,
  rowsPerPage: conditions.rowsPerPage,
});

const headers = (): TsxAttrs['headers'] => [
  { text: 'ID', value: 'id', align: 'center' },
  { text: '氏名', value: 'name', align: 'left' },
  { text: '所属', value: 'belongs', align: 'left' },
  { text: '性別', value: 'sex', align: 'center' },
  { text: '国籍', value: 'country', align: 'center' },
];

const decorate = (
  employee: DataSets['items'][number],
  employeeAttrs: Employee.IState['attributes']
) => {
  const sex = employeeAttrs.sex.find(v => v.value === employee.sex);
  const country = employeeAttrs.countries.find(
    v => v.value === employee.country
  );

  return {
    ...employee,
    ...{
      fullName: Employee.fullName(
        employee.firstName,
        employee.lastName,
        employee.country
      ),
      sex: (sex && sex.label) || '',
      country: (country && country.label) || '',
    },
  };
};

@Component
class EmployeeSearchResultSet extends Vue {
  @Prop({ required: true, type: Object }) employee!: Employee.IState;
  @Prop({ required: true, type: Object }) conditions!: SearchEmployee.IState;
  @Prop({ required: true, type: Object }) searchActions!: ActionTree<
    SearchEmployee.IActions
  >;
  @Prop({ required: true, type: Object }) dataSets!: DataSets;
  paginationChangedTime = 0;

  onPaginationChanged(pagination: Pagination) {
    this.searchActions.setConditions(pagination);

    this.paginationChangedTime++;
    if (this.paginationChangedTime !== 1) {
      // NOTE: propsで検索結果が渡されてくるので1回目のイベントは呼ばれても検索用のAPIを呼び出す必要がない.
      // 検索用のAPIのトリガとなるemit を飛ばすのは1回目以外かの判定をいれる
      this.$emit('paginationChanged');
    }
  }

  render() {
    return (
      <VDataTable
        items={this.dataSets.items}
        totalItems={this.dataSets.count}
        pagination={pagination(this.conditions)}
        headers={headers()}
        scopedSlots={{
          items: (props: { item: DataSets['items'][number] }) => {
            const employee = decorate(props.item, this.employee.attributes);
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
          },
        }}
        on={{ 'update:pagination': this.onPaginationChanged }}
      />
    );
  }
}

type Props = Pick<
  EmployeeSearchResultSet,
  'employee' | 'conditions' | 'searchActions' | 'dataSets'
>;

interface Events {
  onPaginationChanged: () => void;
}

export default vts.ofType<Props, Events>().convert(EmployeeSearchResultSet);
</script>
