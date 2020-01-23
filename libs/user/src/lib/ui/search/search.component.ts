import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserFacade } from '../../data-access/user.facade';

@Component({
  selector: 'push-based-app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Input()
  searchTerm: string;

  searchInput: FormControl;

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.searchInput = this.userFacade.buildSearchTermControl();
    this.searchInput.patchValue(this.searchTerm, { emitEvent: false });
    console.log(this.searchInput);
  }
}
