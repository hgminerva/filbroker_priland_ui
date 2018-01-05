// Angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { SettingsService } from './settings.service';

// WijMo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { SysSettings } from '../model/model.sys.settings';
import { SysDropDown } from '../model/model.sys.dropDown';
@Component({
    templateUrl: './settings.index.html'
})

export class SettingsIndex {
    public title = 'Settings';

    public projectStatusData: ObservableArray;

    private projectSub: any;
    private projectSavedSub: any;
    private projectLockedSub: any;
    private projectUnlockedSub: any;
    private projectStatusSub: any;

    public settings: SysSettings = {
        id: 1,
        company: "",
        softwareVersion: "",
        softwareDeveloper: "",
        soldUnitCheckedBy: 1,
        soldUnitCheckedByUser: "",
        soldUnitApprovedBy: 1,
        soldUnitApprovedByUser: "",
        commissionRequestCheckedBy: 1,
        commissionRequestCheckedByUser: "",
        commissionRequestApprovedBy: 1,
        commissionRequestApprovedByUser: "",
        proposalFootNote: "",
        brokerFootNote: "",
    };


    public values: SysDropDown = {
        id: 1,
        category: "",
        description: "",
        value: "",


    };

    constructor(
        private setService: SettingsService,
        private dropdown: SettingsService,
        private router: Router,
        private toastr: ToastsManager,
        private viewContainer: ViewContainerRef,
        private activatedRoute: ActivatedRoute,
    ) {
        this.toastr.setRootViewContainerRef(viewContainer);
    }


    public ngOnInit() {
        //this.getDropDowns();
        this.getProject();
    }

    public ngOnDestroy() {
        if (this.projectSub != null) this.projectSub.unsubscribe();
        if (this.projectSavedSub != null) this.projectSavedSub.unsubscribe();
        if (this.projectStatusSub != null) this.projectStatusSub.unsubscribe();
        if (this.projectLockedSub != null) this.projectLockedSub.unsubscribe();
        if (this.projectUnlockedSub != null) this.projectUnlockedSub.unsubscribe();
    }

    public getIdParameter() {
        let id = 0;
        this.activatedRoute.params.subscribe(params => {
            id = params['id'];
        });
        return id;
    }



    public getProject() {
        this.setService.getProject(this.getIdParameter(), this.toastr);

        this.projectSub = this.setService.projectObservable
            .subscribe(
            data => {
                this.settings.id = data.id;
                this.settings.company = data.company;
                this.settings.softwareVersion = data.softwareVersion;
                this.settings.softwareDeveloper = data.softwareDeveloper;
                this.settings.soldUnitCheckedBy = data.soldUnitCheckedBy;
                this.settings.soldUnitCheckedByUser = data.soldUnitCheckedByUser;
                this.settings.commissionRequestCheckedBy = data.commissionRequestCheckedBy;
                this.settings.commissionRequestCheckedByUser = data.commissionRequestCheckedByUser;
                this.settings.commissionRequestApprovedBy = data.commissionRequestApprovedBy;
                this.settings.commissionRequestApprovedByUser = data.commissionRequestApprovedByUser;
                this.settings.proposalFootNote = data.proposalFootNote;
                this.settings.brokerFootNote = data.brokerFootNote;
            }
            );
    }

    // public btnSaveProjectClick() : void {
    //     (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = true;
    //     (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";

    //     this.setService.saveProject(this.settings);

    //     this.projectSavedSub =  this.setService.projectSavedObservable.subscribe(
    //       data => {
    //           if(data == 1) {
    //               this.toastr.success("Saving successful.");
    //               (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = false;
    //               (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
    //           } else if(data == 0) {
    //               this.toastr.error("Saving failed.");   
    //               (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = true;
    //               (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
    //           }
    //       }
    //     );
    //   }

    public btnSaveClick(): void {
        (<HTMLButtonElement>document.getElementById("btnSave")).disabled = true;
        (<HTMLButtonElement>document.getElementById("btnSave")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";

        this.setService.saveProject(this.settings);

        this.projectSavedSub = this.setService.projectSavedObservable.subscribe(
            data => {
                if (data == 1) {
                    this.toastr.success("Saving successful.");
                    (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
                } else if (data == 0) {
                    this.toastr.error("Saving failed.");
                    (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = true;
                    (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
                }
            }
        );
    }

    public btnSaveProjectClick(): void {
        (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = true;
        (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";

        // this.setService.saveProject(this.values);

        this.projectSavedSub = this.setService.projectSavedObservable.subscribe(
            data => {
                if (data == 1) {
                    this.toastr.success("Saving successful.");
                    (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
                } else if (data == 0) {
                    this.toastr.error("Saving failed.");
                    (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = true;
                    (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
                }
            }
        );
    }


    // public getDropDowns() : void {
    //     this.setService.getDropDowns(this.toastr);

    //     this.projectStatusSub = this.setService.dropDownsObservable.subscribe(
    //       data => {
    //         let projectStatuses = new ObservableArray();

    //         if (data.length > 0) {
    //           for (var i = 0; i <= data.length - 1; i++) {
    //             if (data[i].category == "CATEGORY") {
    //               projectStatuses.push({
    //                 id: data[i].id,
    //                 category: data[i].category,
    //                 description: data[i].description,
    //                 value: data[i].value
    //               });
    //             }
    //           }
    //         }

    //         this.projectStatusData = projectStatuses;
    //       }
    //     );
    //   }


}