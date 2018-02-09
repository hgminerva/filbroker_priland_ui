import { Injectable } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ObservableArray } from 'wijmo/wijmo';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { MstUserRight } from '../model/model.mst.user.right';

@Injectable()
export class SecurityService {
    public openPage(page : string) : boolean {
        let openFlag = false;
        if(localStorage.getItem("userRights") != null) {
            try {
                let userRights = JSON.parse(localStorage.getItem("userRights"));
                for (var i = 0; i <= userRights.length - 1; i++) {
                    if(userRights[i].page == page) {
                        openFlag = true;
                    }
                }
            } catch(e) {
                console.log(e); 
            }
        } 
        return openFlag;
    }

    public secureActivity(page, activity) : boolean {
        return true;
    }
}