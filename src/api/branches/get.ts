import { camelizeKeysDeep, underscoreKeysDeep } from '@/utils/camelize';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

interface DataElement {
  id: number;
  name: string;
}

export type SuccessResponse = DataElement[];

interface RequestParams {
  id?: number;
  groupId?: number;
}

export const send = async (axios: NuxtAxiosInstance, params: RequestParams) => {
  const endpoint = `${process.env.baseUrl}/api/branches`;
  const response = await axios.$get(endpoint, {
    params: underscoreKeysDeep(params),
  });

  return camelizeKeysDeep(response) as SuccessResponse;
};
