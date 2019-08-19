<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { VBtn, VTextField, VContainer, VLayout, VFlex } from 'vuetify-tsx';
import VAutocomplete from '@/types/vuetify/VAutocomplete';
import SearchBoxContainer, {
  Slots,
} from '../ecosystems/EmployeeSearchBoxContainer.vue';
import { AttributeElement } from '@/store/employee';
import { StateTree, ActionTree } from '@/store/module_mapper';

@Component({
  components: {
    SearchBoxContainer,
  },
})
class EmployeeSearchBox extends Vue {
  @Prop({ required: true, type: Object })
  employeeAttrs!: StateTree['employee']['attributes'];

  @Prop({ required: true, type: Object })
  conditions!: StateTree['search/employee'];

  @Prop({ required: true, type: Object })
  employeeActions!: ActionTree['employee'];

  @Prop({ required: true, type: Object })
  searchActions!: ActionTree['search/employee'];

  render() {
    return (
      <SearchBoxContainer
        {...{ props: this.$props as Props }}
        scopedSlots={{
          render: (v: Slots['render']) => (
            <VContainer grid-list-md>
              <VLayout row wrap>
                <VFlex md6 sm6 xs12>
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
                </VFlex>
                <VFlex md6 sm6 xs12>
                  <VAutocomplete
                    label="部署"
                    items={v.optionAttrs.branches}
                    value={v.conditions.branch}
                    item-text="label"
                    item-value="value"
                    return-object
                    clearable
                    onChange={(e?: AttributeElement) =>
                      v.registerConditions({ branch: e ? e.value : undefined })
                    }
                  />
                </VFlex>
              </VLayout>
              <VLayout row wrap>
                <VFlex md12 xs12>
                  <VTextField
                    label="氏名"
                    value={v.conditions.name}
                    onChange={(e?: string) => v.registerConditions({ name: e })}
                  />
                </VFlex>
              </VLayout>
              <VLayout row wrap>
                <VFlex md6 sm6 xs12>
                  <VAutocomplete
                    label="性別"
                    items={v.optionAttrs.sex}
                    value={v.conditions.sex}
                    item-text="label"
                    item-value="value"
                    return-object
                    clearable
                    onChange={(e?: AttributeElement) =>
                      v.registerConditions({ sex: e ? e.value : undefined })
                    }
                  />
                </VFlex>
                <VFlex md6 sm6 xs12>
                  <VAutocomplete
                    label="国籍"
                    items={v.optionAttrs.countries}
                    value={v.conditions.country}
                    item-text="label"
                    item-value="value"
                    return-object
                    clearable
                    onChange={(e?: AttributeElement) =>
                      v.registerConditions({ country: e ? e.value : undefined })
                    }
                  />
                </VFlex>
              </VLayout>
              <div class="text-xs-right">
                <VBtn
                  color="primary"
                  onClick={() => {
                    v.applyConditions();
                    this.$emit('click');
                  }}
                >
                  Search
                </VBtn>
              </div>
            </VContainer>
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

<style lang="scss" scoped>
.container {
  max-width: none;
  padding: 0;

  button {
    margin: 0;
  }
}
</style>
