<template>
  <v-app>
    <Header :route="$route.name" />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Header from '@/components/organisms/shared/Header.vue';
import Footer from '@/components/organisms/shared/Footer.vue';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped>
.application.theme--light {
  background-color: white;
}
</style>
