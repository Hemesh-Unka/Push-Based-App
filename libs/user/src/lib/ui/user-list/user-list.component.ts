import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { User } from '../../data-access/user.service';

@Component({
  selector: 'push-based-app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  @Input()
  users: User[];

  constructor() {}

  ngOnInit() {}
}
