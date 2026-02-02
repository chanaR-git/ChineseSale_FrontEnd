import { Routes } from '@angular/router';
import { Register } from './auth/components/register/register';
import { Login } from './auth/components/login/login';
import { NotFoundError } from 'rxjs';
import { NotFound } from './generalComponents/not-found/not-found';
import { ManagementWrapper } from './management-wrapper/management-wrapper';
import { ManageDonors } from './donors/components/manage-donors/manage-donors';
import { ManageGifts } from './gifts/components/manage-gifts/manage-gifts';
import { SingleGift } from './gifts/components/single-gift/single-gift';
import { AllGifts } from './gifts/components/all-gifts/all-gifts';

export const routes: Routes = [
    {path:'' , redirectTo: 'login', pathMatch: 'full'},
    {path :'register', component: Register},
    {path :'login', component: Login},
    {path:'gifts',component:AllGifts},
    {path:'gifts/:name',component:SingleGift},
    {path:'management',component:ManagementWrapper,
        children:[
            {path:'gifts', component:ManageGifts},
            {path:'donors',component:ManageDonors},
        ]
    },
    {path: '**', component:NotFound } 
];
