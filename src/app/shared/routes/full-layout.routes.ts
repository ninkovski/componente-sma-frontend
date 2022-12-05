import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    // {
    //     path: 'dashboard',
    //     loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    // },
    {
        path: 'user-profile',
        loadChildren: () => import('../../shared/components/user-profile/user-profile.module').then(m => m.UserProfileModule)

    },
];