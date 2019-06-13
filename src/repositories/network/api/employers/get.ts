import { camelizeKeysDeep } from '@/repositories/camelize';

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
  call(): SuccessResponse[] {
    // TODO: ここでAPIへアクセスする
    const response = {};

    return camelizeKeysDeep(response) as SuccessResponse[];
  }
}
