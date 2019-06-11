import { Component as VueComponent } from 'vue';
import { ofType } from 'vue-tsx-support';
import { VAutocomplete } from 'vuetify/lib';
import { Colorable, Inputable } from 'vuetify-tsx/lib/shared/types';

type Props = Colorable &
  Inputable & {
    'v-model'?: any;
    items: any[];
    'item-text': string | ((value: any) => string);
    multiple?: boolean;
    chips?: boolean;
  };

interface Events {
  onChange: (event: any) => void;
}

interface ScopedSlot {
  selection: Selection;
  item: any;
}

interface Selection {
  parent: VueComponent;
  item: any;
  index: number;
  selected: boolean;
  disabled: boolean;
}

export default ofType<Props, Events, ScopedSlot>().convert(
  VAutocomplete as any
);
