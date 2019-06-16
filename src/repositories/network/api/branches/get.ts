import { camelizeKeysDeep, underscoreKeysDeep } from '@/utils/camelize';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

interface DataElement {
  id: number;
  name: string;
}

type SuccessResponse = DataElement[];

interface RequestParams {
  id?: number;
  groupId?: number;
}

export class Request {
  public readonly endpoint = `${process.env.baseUrl}/api/branches`;
  private httpClient: NuxtAxiosInstance;

  public constructor(axios: NuxtAxiosInstance) {
    this.httpClient = axios;
  }

  public async send(params: RequestParams) {
    const response = await this.httpClient.$get(this.endpoint, {
      params: underscoreKeysDeep(params),
    });

    return camelizeKeysDeep(response) as SuccessResponse;
  }
}
