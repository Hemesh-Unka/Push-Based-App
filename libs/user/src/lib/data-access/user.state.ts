import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { UserAction } from './user.actions';
import { User, UserService } from './user.service';

export interface Pagination {
  selectedSize: number;
  currentPage: number;
  pageSizes: number[];
}

export interface UserStateModel {
  users: User[];
  pagination: Pagination;
  searchTerm: string;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: [],
    searchTerm: '',
    pagination: {
      pageSizes: [5, 10],
      currentPage: 0,
      selectedSize: 5
    }
  }
})
export class UserState {
  constructor(private userService: UserService) {}
  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Selector()
  static getPagination(state: UserStateModel) {
    return state.pagination;
  }

  @Selector()
  static searchTerm(state: UserStateModel) {
    return state.searchTerm;
  }

  @Action(UserAction.GetAll)
  public getUsersAction(
    { getState, setState }: StateContext<UserStateModel>,
    { pagination, searchTerm }
  ) {
    return this.userService.fetchUsers(pagination, searchTerm).pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          users: result
        });
      })
    );
  }

  @Action(UserAction.ChangePageSize)
  public changePageSize(
    { getState, patchState }: StateContext<UserStateModel>,
    { pageSize }: UserAction.ChangePageSize
  ) {
    const state = getState();
    patchState({
      ...state,
      pagination: { ...state.pagination, selectedSize: pageSize }
    });
  }

  @Action(UserAction.UpdateSearchTerm)
  public updateSearchTerm(
    { getState, patchState }: StateContext<UserStateModel>,
    { searchTerm }: UserAction.UpdateSearchTerm
  ) {
    const state = getState();
    patchState({
      ...state,
      searchTerm
    });
  }
}
