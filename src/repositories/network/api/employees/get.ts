import { camelizeKeysDeep } from '@/utils/camelize';

interface SuccessResponse {
  id: number;
  firstName: string;
  lastName: string;
  groupNames: string[];
  branchNames: string[];
  sex: number;
  country: number;
}

export class Request {
  public call(): SuccessResponse[] {
    // TODO: ここでAPIへアクセスする
    const response = {};

    return camelizeKeysDeep(response) as SuccessResponse[];
  }
}
