import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from './components/components.module';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ColorSwitcherComponent } from './components/color-switcher/color-switcher.component';
import { AppsComponent } from './components/apps/apps.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ColorSwitcherComponent,
        NgbModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        PerfectScrollbarModule,
        ComponentsModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ColorSwitcherComponent,
        AppsComponent,
        ContactoComponent,
        UserMenuComponent
    ],
    providers: [ ],
})
export class SharedModule { }
