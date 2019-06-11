import Vue from 'vue';
import { Store } from 'vuex';
import { Context as OrgContext } from '@nuxt/vue-app/types';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export namespace Nuxt {
  export interface Context extends OrgContext {
    req: OrgContext['req'] & { body: any };
    app: Vue & {
      store: Store<any>;
    };
  }

  export interface Error {
    statusCode: number;
    path: string;
    message: string;
  }
}
