// Angular
import { Component, Input } from '@angular/core';

// WijMo
import { ObservableArray } from 'wijmo/wijmo';

// Services
import { FooterService } from './footer.service';

@Component({
    selector: "app-footer",
    templateUrl: './footer.index.html',
    styleUrls: ['./footer.style.css']
})
export class FooterIndex {
    private usersSub : any;
    private usersData : ObservableArray;

    public company: string = "Priland";
    public version: string = "Filbroker v1.0.20180312.HGM";
    public support: string = "Innosoft Solutions +63 917 812 3982 (support@innosoft.ph)";

    @Input()
    public data: any;

    ngOnInit() {
        this.getUsers(); 
    }
    ngOnDestroy() {
        if( this.usersSub != null) this.usersSub.unsubscribe();
    }

    constructor(
        private footerService: FooterService
    ) {}

    public getUsers() : void {
        this.footerService.getUsers();

        this.usersSub = this.footerService.usersObservable.subscribe(
            data => {
                this.usersData = data;
            }
        );
    }

    public getCreatedBy() : string {
        let createdBy : string = "";
        if(this.data != null && this.usersData != null) {
            if (this.usersData.length > 0) {
                for (var i = 0; i <= this.usersData.length - 1; i++) {
                    if(this.data.currentItem != null) {
                        if (this.usersData[i].id ==  this.data.currentItem.createdBy) {
                            createdBy = this.usersData[i].fullName;
                        }
                    } else {
                        if (this.usersData[i].id ==  this.data.createdBy) {
                            createdBy = this.usersData[i].fullName;
                        }
                    }
                }
            }
        }
        return createdBy;
    }

    public getUpdatedBy() : string {
        let updatedBy : string = "";
        if(this.data != null && this.usersData != null) {
            if (this.usersData.length > 0) {
                for (var i = 0; i <= this.usersData.length - 1; i++) {
                    if(this.data.currentItem != null) {
                        if (this.usersData[i].id ==  this.data.currentItem.updatedBy) {
                            updatedBy = this.usersData[i].fullName;
                        }
                    } else {
                        if (this.usersData[i].id ==  this.data.updatedBy) {
                            updatedBy = this.usersData[i].fullName;
                        }
                    }
                }
            }
        }
        return updatedBy;
    }

    public getCreatedDateTime() : string {
        let createdDateTime : string = "";
        if(this.data != null) {
            if(this.data.currentItem != null) {
                createdDateTime = this.data.currentItem.createdDateTime;
            } else {
                createdDateTime = this.data.createdDateTime;
            }
        }
        return createdDateTime;
    }

    public getUpdatedDateTime() : string {
        let updatedDateTime : string = "";
        if(this.data != null) {
            if(this.data.currentItem != null) {
                updatedDateTime = this.data.currentItem.updatedDateTime;
            } else {
                updatedDateTime = this.data.updatedDateTime;
            }
        }
        return updatedDateTime;
    }
}