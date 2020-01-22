import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UserFacade } from './data-access/user.facade';
import { UserState } from './data-access/user.state';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { UserListComponent } from './ui/user-list/user-list.component';
import { UserComponent } from './ui/user/user.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, NgxsModule.forFeature([UserState])],
  declarations: [UserComponent, UserListComponent, PaginationComponent],
  exports: [UserComponent, UserListComponent, PaginationComponent],
  providers: [UserFacade]
})
export class UserModule {}
