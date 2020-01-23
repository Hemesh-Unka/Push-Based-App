import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { UserAction } from './user.actions';
import { User } from './user.service';
import { Pagination, UserState, UserStateModel } from './user.state';

@Injectable()
export class UserFacade {
  @Select(UserState.getUsers) users$: Observable<User[]>;
  @Select(UserState.getPagination) pagination$: Observable<Pagination>;
  @Select(UserState.searchTerm) searchTerm$: Observable<string>;

  constructor(private store: Store) {
    combineLatest(this.pagination$, this.searchTerm$)
      .pipe(
        switchMap(([pagination, searchTerm]) => {
          return this.store.dispatch(
            new UserAction.GetAll(pagination, searchTerm)
          );
        })
      )
      .subscribe();
  }

  vm$: Observable<UserStateModel> = combineLatest(
    this.users$,
    this.pagination$,
    this.searchTerm$
  ).pipe(
    map(([users, pagination, searchTerm]) => {
      return {
        users,
        pagination,
        searchTerm
      };
    })
  );

  changePageSize(pageSize: number) {
    this.store.dispatch(new UserAction.ChangePageSize(pageSize));
  }

  updateSearchTerm(searchTerm: string) {
    this.store.dispatch(new UserAction.UpdateSearchTerm(searchTerm));
  }

  buildSearchTermControl(): FormControl {
    const form = new FormControl();
    form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe(value => this.updateSearchTerm(value));

    return form;
  }
}
