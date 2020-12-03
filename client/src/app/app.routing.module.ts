import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageListComponent} from './page-list/page.list.component';
import {PageDetailsComponent} from './page-details/page.details.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'page-list' },
  { path: 'page-list', component: PageListComponent },
  { path: ':id', component: PageDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }