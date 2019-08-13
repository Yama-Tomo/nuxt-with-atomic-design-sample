<script lang="tsx">
import * as vts from 'vue-tsx-support';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { VToolbar, VToolbarItems, VIcon, VBtn } from 'vuetify-tsx';

@Component
class Header extends Vue {
  @Prop({ required: true, type: String }) route!: string;

  render() {
    return (
      <VToolbar dark color="#24292e">
        <VToolbarItems>
          <VIcon large>people</VIcon>
          <VBtn
            flat
            class={this.route === 'index' ? 'v-btn--active' : ''}
            nuxt
            to="/"
          >
            Employees
          </VBtn>
          <VBtn flat>Groups</VBtn>
          <VBtn flat>Branches</VBtn>
        </VToolbarItems>
      </VToolbar>
    );
  }
}

export default vts.ofType<{}, {}, {}>().convert(Header);
</script>

<style lang="scss" scoped>
.v-toolbar__items {
  .v-btn {
    text-transform: inherit;

    &:first-child {
      min-width: 0;
      padding-right: 0;
      padding-left: 0;
    }

    &.v-btn--flat:nth-child(2) {
      margin-left: 16px;
    }
  }
}
</style>
