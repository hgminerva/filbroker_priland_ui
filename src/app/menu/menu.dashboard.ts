// angular
import { Component } from '@angular/core';

// wijmo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

import { ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// services
import { SecurityService } from '../security/security.service';

@Component({
  templateUrl: './menu.dashboard.html'
})
export class MenuDashboard {
    private title = 'Dashboard';

    private menuData : ObservableArray;
    private menuCollection : CollectionView;

    constructor(private securityService: SecurityService,
                private toastr: ToastsManager,
                private viewContainer: ViewContainerRef,
                private router: Router
      ) {
        this.toastr.setRootViewContainerRef(viewContainer);
    }

    ngOnInit() {
        let data = new ObservableArray();
        data.push({
            menu1: "project",
            menu2: "customer",
            menu3: "soldUnit"
        });
        data.push({
            menu1: "unit",
            menu2: "broker",
            menu3: "commission"
        });
        data.push({
            menu1: "checklist",
            menu2: "reports",
            menu3: "user"
        });
        this.menuData = data;
        this.menuCollection = new CollectionView(this.menuData);
    }

}