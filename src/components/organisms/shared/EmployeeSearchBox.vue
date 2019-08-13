<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { VBtn, VTextField } from 'vuetify-tsx';
import VAutocomplete from '../../../types/vuetify/VAutocomplete';
import * as Employee from '../../../store_modules/employee';
import * as SearchEmployee from '../../../store_modules/search/employee';
import { ActionTree } from '../../../store_modules/store_helper';
import SearchBoxContainer, {
  Slots,
} from '../ecosystems/EmployeeSearchBoxContainer.vue';

@Component({
  components: {
    SearchBoxContainer,
  },
})
class EmployeeSearchBox extends Vue {
  @Prop({ required: true, type: Object })
  employeeAttrs!: Employee.IState['attributes'];
  @Prop({ required: true, type: Object }) conditions!: SearchEmployee.IState;
  @Prop({ required: true, type: Object }) employeeActions!: ActionTree<
    Employee.IActions
  >;
  @Prop({ required: true, type: Object }) searchActions!: ActionTree<
    SearchEmployee.IActions
  >;

  render() {
    return (
      <SearchBoxContainer
        {...{ props: this.$props as Props }}
        onClick={() => this.$emit('click')}
        scopedSlots={{
          render: (v: Slots['render']) => (
            <div>
              <VAutocomplete
                label="グループ"
                items={v.optionAttrs.groups}
                value={v.conditions.group}
                item-text="label"
                item-value="value"
                return-object
                clearable
                onChange={v.updateBranchOptions}
              />
              <VAutocomplete
                label="部署"
                items={v.optionAttrs.branches}
                value={v.conditions.branch}
                item-text="label"
                item-value="value"
                return-object
                clearable
                onChange={(e?: Employee.AttributeElement) =>
                  v.registerConditions({ branch: e ? e.value : undefined })
                }
              />
              <VTextField
                label="氏名"
                value={v.conditions.name}
                onChange={(e?: string) => v.registerConditions({ name: e })}
              />
              <VAutocomplete
                label="性別"
                items={v.optionAttrs.sex}
                value={v.conditions.sex}
                item-text="label"
                item-value="value"
                return-object
                clearable
                onChange={(e?: Employee.AttributeElement) =>
                  v.registerConditions({ sex: e ? e.value : undefined })
                }
              />
              <VAutocomplete
                label="国籍"
                items={v.optionAttrs.countries}
                value={v.conditions.country}
                item-text="label"
                item-value="value"
                return-object
                clearable
                onChange={(e?: Employee.AttributeElement) =>
                  v.registerConditions({ country: e ? e.value : undefined })
                }
              />
              <VBtn color="primary" onClick={v.emitClick}>
                Search
              </VBtn>
            </div>
          ),
        }}
      />
    );
  }
}

export type Props = Pick<
  EmployeeSearchBox,
  'employeeAttrs' | 'searchActions' | 'employeeActions' | 'conditions'
>;

export interface Events {
  onClick: () => void;
}

export default vts.ofType<Props, Events, {}>().convert(EmployeeSearchBox);
</script>
