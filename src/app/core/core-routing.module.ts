import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth/auth.guard';

import { UserEntitlementsComponent } from '../users/user-entitlements/user-entitlements.component';

const routes: Routes = [
    { path: '', redirectTo:'login', pathMatch:'full' },
    { path: 'entitlements', component: UserEntitlementsComponent, outlet: 'userEntitlements'},
    { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule), canLoad:[AuthGuard] },
    { path: 'my-page', loadChildren: () => import('../my-page/my-page.module').then(m => m.MyPageModule), canLoad:[AuthGuard] },
    { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule), canLoad:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
