<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { DataSets, QueryString } from '@/pages/index.vue';
import { StateTree, ActionTree } from '@/store/module_mapper';
import SearchBox from '@/components/organisms/shared/EmployeeSearchBox.vue';
import List from '@/components/organisms/shared/EmployeeSearchResultSet.vue';

const convertQueryParams = (
  conditions: StateTree['search/employee']
): { [P in keyof Required<QueryString>]: string | undefined } => ({
  group: conditions.group ? String(conditions.group) : undefined,
  branch: conditions.branch ? String(conditions.branch) : undefined,
  name: conditions.name,
  sex: conditions.sex ? String(conditions.sex) : undefined,
  country: conditions.country ? String(conditions.country) : undefined,
  desc: String(conditions.descending),
  page: String(conditions.page),
  sort_by: conditions.sortBy,
  per_page: String(conditions.rowsPerPage),
});

@Component({
  components: {
    SearchBox,
    List,
  },
})
class IndexTemplate extends Vue {
  @Prop({ required: true, type: Object }) employee!: StateTree['employee'];
  @Prop({ required: true, type: Object })
  conditions!: StateTree['search/employee'];

  @Prop({ required: true, type: Object })
  employeeActions!: ActionTree['employee'];

  @Prop({ required: true, type: Object })
  searchActions!: ActionTree['search/employee'];

  @Prop({ required: true, type: Object }) dataSets!: DataSets;

  render() {
    return (
      <div>
        <SearchBox
          onClick={this.fetchDataSets}
          {...{
            props: {
              ...(this.$props as Props),
              ...{ employeeAttrs: this.employee.attributes },
            },
          }}
        />
        <List
          onPaginationChanged={this.fetchDataSets}
          {...{
            props: { ...(this.$props as Props) },
          }}
        />
      </div>
    );
  }

  fetchDataSets() {
    this.$router.push({
      path: this.$route.fullPath,
      query: convertQueryParams(this.conditions),
    });
  }
}

export type Props = Pick<
  IndexTemplate,
  'employee' | 'searchActions' | 'employeeActions' | 'conditions' | 'dataSets'
>;

export default vts.ofType<Props, {}, {}>().convert(IndexTemplate);
</script>

<style lang="scss" scoped>
div > div:first-child {
  margin-bottom: 40px;
}
</style>
