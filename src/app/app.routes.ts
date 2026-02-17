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
import { Success } from './basket/components/success/success';
import { ManagePurchases } from './purchases/components/manage-purchases/manage-purchases';
import { Lottery } from './lottery/components/lottery/lottery';
import { Home } from './generalComponents/home/home';

export const routes: Routes = [
    {path:'' , redirectTo: 'home', pathMatch: 'full'},
    {path:'home', component: Home},
    {path :'register', component: Register},
    {path :'login', component: Login},
    {path:'gifts',component:AllGifts},
    {path:'gifts/:name',component:SingleGift},
    {path:'purchase/success',component:Success},
    {path:'management',component:ManagementWrapper,
        children:[
            {path:'gifts', component:ManageGifts},
            {path:'donors',component:ManageDonors},
            {path:'purchases',component:ManagePurchases},
            {path:'lottery', component:Lottery}
        ]
    },
    {path: '**', component:NotFound } 
];
