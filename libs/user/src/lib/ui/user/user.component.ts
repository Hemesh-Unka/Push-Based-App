import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFacade } from '../../data-access/user.facade';
import { UserStateModel } from '../../data-access/user.state';

@Component({
  selector: 'push-based-app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  vm$: Observable<UserStateModel> = this.userFacade.vm$;

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {}

  changePageSize(pageSize: number) {
    this.userFacade.changePageSize(pageSize);
  }
}
