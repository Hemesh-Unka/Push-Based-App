import { Pagination } from './user.state';

export namespace UserAction {
  export class GetAll {
    public static readonly type = '[User] Fetch all';
    constructor(public pagination: Pagination, public searchTerm: string) {}
  }

  export class ChangePageSize {
    public static readonly type = '[User] Update Page Size';
    constructor(public pageSize: number) {}
  }

  export class UpdateSearchTerm {
    public static readonly type = '[User] Update Search Term';
    constructor(public searchTerm: string) {}
  }
}
