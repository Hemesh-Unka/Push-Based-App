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
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: [],
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
  public static getState(state: UserStateModel) {
    return state;
  }

  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Selector()
  static getPagination(state: UserStateModel) {
    return state.pagination;
  }

  @Action(UserAction.GetAll)
  public getUsersAction(
    { getState, setState }: StateContext<UserStateModel>,
    { pagination }
  ) {
    return this.userService.fetchUsers(pagination).pipe(
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
}
