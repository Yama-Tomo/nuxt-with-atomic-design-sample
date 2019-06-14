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

interface SuccessResponse {
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
  rowsPerPage?: string;
}

export class Request {
  public readonly endpoint = `${process.env.baseUrl}/api/employees`;
  private httpClient: NuxtAxiosInstance;

  public constructor(axios: NuxtAxiosInstance) {
    this.httpClient = axios;
  }

  public async send(params: RequestParams) {
    const response = await this.httpClient.$get(this.endpoint, { params });

    return camelizeKeysDeep(response) as SuccessResponse;
  }
}
