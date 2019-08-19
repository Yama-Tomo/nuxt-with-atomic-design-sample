<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Vue } from 'nuxt-property-decorator';
import { getActions, getState } from '@/store/helper';
import { DataSets, QueryString } from '@/pages/index.vue';
import Template from '@/components/templates/index.vue';
import { Nuxt } from '@/types/nuxt';
import * as BffApiRequest from '@/api/bff/employees/get';
import * as EmployeeApiRequest from '@/api/employees/get';

/* eslint camelcase: ["error", {allow: ["sort_by", "per_page"]}] */

export interface QueryString {
  group?: string;
  branch?: string;
  name?: string;
  sex?: string;
  country?: string;
  desc?: string;
  page?: string;
  sort_by?: string;
  per_page?: string;
}

export type DataSets = {
  items: EmployeeApiRequest.SuccessResponse['dataSets'];
  count: EmployeeApiRequest.SuccessResponse['totalCount'];
};

const convertRequestParams = (query: QueryString) => ({
  group: query.group ? Number(query.group) : undefined,
  branch: query.branch ? Number(query.branch) : undefined,
  name: query.name,
  sex: query.sex ? Number(query.sex) : undefined,
  country: query.country ? Number(query.country) : undefined,
  descending: query.desc === 'true',
  page: query.page ? Number(query.page) : 1,
  sortBy: query.sort_by,
  rowsPerPage: query.per_page ? Number(query.per_page) : 10,
});

const convertEmployeeAttrs = (response: BffApiRequest.SuccessResponse) => ({
  groups: response.groups.map(v => ({ label: v.name, value: v.id })),
  branches: response.branches.map(v => ({ label: v.name, value: v.id })),
  sex: response.sex.map(v => ({ label: v.name, value: v.id })),
  countries: response.countries.map(v => ({ label: v.name, value: v.id })),
});

@Component({
  components: {
    Template,
  },
  watchQuery: true,
})
class Index extends Vue {
  data!: DataSets;

  render() {
    return (
      <Template
        employeeActions={getActions('employee', this.$store)}
        employee={getState('employee', this.$store)}
        searchActions={getActions('search/employee', this.$store)}
        conditions={getState('search/employee', this.$store)}
        dataSets={this.data}
      />
    );
  }

  async asyncData(ctx: Nuxt.Context): Promise<{ data: DataSets }> {
    const employeeActions = getActions('employee', ctx.store);
    const searchActions = getActions('search/employee', ctx.store);
    const conditions = convertRequestParams(ctx.query as QueryString);

    searchActions.setConditions(conditions);

    const requiredCallBff =
      getState('employee', ctx.store).attributes.groups.length === 0;

    if (requiredCallBff) {
      const response = await BffApiRequest.send(ctx.app.$axios, conditions);
      employeeActions.setAttribute(convertEmployeeAttrs(response));

      return {
        data: { items: response.dataSets, count: response.totalCount },
      };
    }

    const response = await EmployeeApiRequest.send(ctx.app.$axios, conditions);
    return {
      data: { items: response.dataSets, count: response.totalCount },
    };
  }
}

export default vts.ofType<{}, {}, {}>().convert(Index);
</script>
