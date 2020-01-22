import { Pagination } from './user.state';

export namespace UserAction {
  export class GetAll {
    public static readonly type = '[User] Fetch all';
    constructor(public pagination: Pagination) {}
  }

  export class ChangePageSize {
    public static readonly type = '[User] Update Page Size';
    constructor(public pageSize: number) {}
  }
}
