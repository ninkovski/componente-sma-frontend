import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecaListComponent } from './pages/reca-list/reca-list.component';
import { RecaRegisterComponent } from './pages/reca-register/reca-register.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: RecaListComponent, data: { title: 'RECA' } },
            { path: 'reca-list', component: RecaListComponent, data: { title: "RECA, registro de ficha." } },
            { path: 'reca-register', component: RecaRegisterComponent, data: { title: "RECA, registro de ficha." } }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecaRoutingModule { }
