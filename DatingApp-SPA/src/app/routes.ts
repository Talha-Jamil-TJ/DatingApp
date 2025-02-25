import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {MemberListComponent} from './members/member-list/member-list.component';
import {ListsComponent} from './lists/lists.component';
import {AuthGuard} from './_guards/auth.guard';
import {MessagesComponent} from './messages/messages.component';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {MemberDetailResolver} from './_resolvers/member-detail.resolver';
import {MemberListsResolver} from './_resolvers/member-lists.resolver';
import {MembersEditComponent} from './members/members-edit/members-edit.component';
import {MemberEditResolver} from './_resolvers/member-edit.resolver';
import {PreventUnsavedChanges} from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: {
          members: MemberListsResolver,
        },
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: {
          user: MemberDetailResolver,
        },
      },
      {
        path: 'member/edit',
        component: MembersEditComponent,
        resolve: {
          user: MemberEditResolver,
        },
        canDeactivate: [PreventUnsavedChanges]
      },
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent},
    ],
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
