import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CutiDetailsComponent } from './pages/cuti-details/cuti-details.component';
import { ApprovalComponent } from './pages/approval/approval.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'request-cuti',
        component: CutiDetailsComponent,
    },
    {
        path: 'approval',
        component: ApprovalComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];
