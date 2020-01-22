import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserAction } from './user.actions';
import { User } from './user.service';
import { Pagination, UserState, UserStateModel } from './user.state';

@Injectable()
export class UserFacade {
  @Select(UserState.getUsers) users$: Observable<User[]>;
  @Select(UserState.getPagination) pagination$: Observable<Pagination>;

  constructor(private store: Store) {
    combineLatest(this.pagination$)
      .pipe(
        switchMap(([pagination]) => {
          return this.store.dispatch(new UserAction.GetAll(pagination));
        })
      )
      .subscribe();
  }

  vm$: Observable<UserStateModel> = combineLatest(
    this.users$,
    this.pagination$
  ).pipe(
    map(([users, pagination]) => {
      return {
        users,
        pagination
      };
    })
  );

  changePageSize(pageSize: number) {
    this.store.dispatch(new UserAction.ChangePageSize(pageSize));
  }
}
