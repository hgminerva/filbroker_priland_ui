// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Toastr
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { AppToastOptions } from './app.toast.options';

// Wijmo
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// My Components
import { AppComponent } from './app.component';
import { HomeLanding } from './home/home.landing';
import { AccountLogin } from './account/account.login';
import { MenuIndex } from './menu/menu.index';
import { MenuDashboard } from './menu/menu.dashboard';
import { FooterIndex } from './footer/footer.index';
import { BrokerList } from './broker/broker.list';
import { BrokerDetail } from './broker/broker.detail';
import { ChecklistList } from './checklist/checklist.list';
import { ChecklistDetail } from './checklist/checklist.detail';
import { CommissionList } from './commission/commission.list';
import { CommissionDetail } from './commission/commission.detail';
import { CustomerList } from './customer/customer.list';
import { CustomerDetail } from './customer/customer.detail';
import { ProjectList } from './project/project.list';
import { ProjectDetail } from './project/project.detail';
import { SoldUnitList } from './soldUnit/soldUnit.list';
import { SoldUnitDetail } from './soldUnit/soldUnit.detail';
import { UnitList } from './unit/unit.list';
import { UnitDetail } from './unit/unit.detail';
import { UserList } from './user/user.list';
import { UserDetail } from './user/user.detail';
import { SettingsIndex } from './settings/settings.index';
import { ReportsIndex } from './reports/reports.index';

// My Services
import { AccountService } from './account/account.service';
import { ProjectService } from './project/project.service';
import { BrokerService } from './broker/broker.service';
import { ChecklistService } from './checklist/checklist.service';
import { CommissionService } from './commission/commission.service';
import { CustomerService } from './customer/customer.service';
import { SettingsService } from './settings/settings.service';
import { SoldUnitService } from './soldUnit/soldUnit.service';
import { UnitService } from './unit/unit.service';
import { UserService } from './user/user.service';

const routes: Routes = [
  { path: '', component: HomeLanding },
  { path: 'account/login', component: AccountLogin },
  { path: 'menu', component: MenuDashboard },
  { path: 'broker', component: BrokerList },
  { path: 'broker/:id', component: BrokerDetail },
  { path: 'checklist', component: ChecklistList },
  { path: 'checklist/:id', component: ChecklistDetail },
  { path: 'commission', component: CommissionList },
  { path: 'commission/:id', component: CommissionDetail },
  { path: 'customer', component: CustomerList },
  { path: 'customer/:id', component: CustomerDetail },
  { path: 'project', component: ProjectList },
  { path: 'project/:id', component: ProjectDetail },
  { path: 'soldUnit', component: SoldUnitList },
  { path: 'soldUnit/:id', component: SoldUnitDetail },
  { path: 'unit', component: UnitList },
  { path: 'unit/:id', component: UnitDetail },
  { path: 'user', component: UserList },
  { path: 'user/:id', component: UserDetail },
  { path: 'settings', component: SettingsIndex },
  { path: 'reports', component: ReportsIndex }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeLanding,
    AccountLogin,
    MenuIndex,MenuDashboard,
    FooterIndex,
    BrokerList, BrokerDetail,
    ChecklistList, ChecklistDetail,
    CommissionList, CommissionDetail,
    CustomerList, CustomerDetail,
    ProjectList, ProjectDetail,
    SoldUnitList, SoldUnitDetail,
    UnitList, UnitDetail,
    UserList, UserDetail,
    SettingsIndex,
    ReportsIndex
  ],
  imports: [
    RouterModule.forRoot(routes),
    ToastModule.forRoot(),
    FormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    WjGridModule,
    WjInputModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AccountService,
    ProjectService,
    {provide:ToastOptions, useClass:AppToastOptions},
    BrokerService,
    ChecklistService,
    CommissionService,
    CustomerService,
    SettingsService,
    SoldUnitService,
    UnitService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
