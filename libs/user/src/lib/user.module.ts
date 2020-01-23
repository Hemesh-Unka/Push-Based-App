import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { UserFacade } from './data-access/user.facade';
import { UserState } from './data-access/user.state';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { SearchComponent } from './ui/search/search.component';
import { UserListComponent } from './ui/user-list/user-list.component';
import { UserComponent } from './ui/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([UserState])
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    PaginationComponent,
    SearchComponent
  ],
  exports: [UserComponent],
  providers: [UserFacade]
})
export class UserModule {}
