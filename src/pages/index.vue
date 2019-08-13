<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Vue } from 'nuxt-property-decorator';
import { getActions, getState } from '@/store_modules/store_helper';
import { DataSets, QueryString } from '@/pages/index.vue';
import Template from '@/components/templates/index.vue';
import { Nuxt } from '@/types/nuxt';
import { modules } from '@/store_modules/module_mapper';
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
        employeeActions={getActions(this.$store, modules.employee)}
        employee={getState(this.$store, modules.employee)}
        searchActions={getActions(
          this.$store,
          modules.search.employee.conditions
        )}
        conditions={getState(this.$store, modules.search.employee.conditions)}
        dataSets={this.data}
      />
    );
  }

  async asyncData(ctx: Nuxt.Context): Promise<{ data: DataSets }> {
    const employeeActions = getActions(ctx.store, modules.employee);
    const searchActions = getActions(
      ctx.store,
      modules.search.employee.conditions
    );
    const conditions = convertRequestParams(ctx.query as QueryString);

    searchActions.setConditions(conditions);

    const requiredCallBff =
      getState(ctx.store, modules.employee).attributes.groups.length === 0;
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
