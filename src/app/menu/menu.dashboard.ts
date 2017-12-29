// Angular
import { Component } from '@angular/core';

import { ObservableArray, CollectionView } from 'wijmo/wijmo';

@Component({
  templateUrl: './menu.dashboard.html'
})

export class MenuDashboard {
    public title = 'Dashboard';

    public menuData : ObservableArray;
    public menuCollection : CollectionView;

    public ngOnInit() {
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