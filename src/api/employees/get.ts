import { camelizeKeysDeep } from '@/utils/camelize';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

interface DataElement {
  id: number;
  firstName: string;
  lastName: string;
  belongs: Array<{ group: string; branches: string[] }>;
  sex: number;
  country: number;
}

export interface SuccessResponse {
  dataSets: DataElement[];
  totalCount: number;
}

interface RequestParams {
  group?: number;
  branch?: number;
  name?: string;
  sex?: number;
  country?: number;
  descending?: boolean;
  page?: number;
  sortBy?: string;
  rowsPerPage?: number;
}

export const send = async (axios: NuxtAxiosInstance, params: RequestParams) => {
  const endpoint = `${process.env.baseUrl}/api/employees`;
  const response = await axios.$get(endpoint, { params });

  return camelizeKeysDeep(response) as SuccessResponse;
};
