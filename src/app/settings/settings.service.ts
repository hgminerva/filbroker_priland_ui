// angular
import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// wijmo
import { ObservableArray } from 'wijmo/wijmo';

// async
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// model(s)
import { SysSettings } from '../model/model.sys.settings';
import { SysDropDown } from '../model/model.sys.dropDown';

@Injectable()
export class SettingsService {

    // ==================
    // private properties
    // ==================

    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // =================
    // public properties
    // =================

    // detail
    public settingsSource = new Subject<SysSettings>();
    public settingsObservable = this.settingsSource.asObservable();

    public settingsSavedSource = new Subject<number>();
    public settingsSavedObservable = this.settingsSavedSource.asObservable();

    // detail combo boxes
    public usersSource = new Subject<ObservableArray>();
    public usersObservable = this.usersSource.asObservable();

    // detail line1 (drop downs)
    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable();

    public dropDownsDeletedSource = new Subject<number>();
    public dropDownsDeletedObservable = this.dropDownsDeletedSource.asObservable();

    public dropDownsSavedSource = new Subject<number>();
    public dropDownsSavedObservable = this.dropDownsSavedSource.asObservable();

    // =======
    // angular
    // =======

    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // ==============
    // public methods
    // ==============

    // detail
    public getSettings(): void {
        let settings: SysSettings;
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysSettings/Detail";

        this.http.get(url, this.options).subscribe(
            response => {
                var result = response.json();
                if (result != null) {
                    settings = {
                        id: result.Id,
                        company: result.Company,
                        softwareVersion: result.SoftwareVersion,
                        softwareDeveloper: result.SoftwareDeveloper,
                        soldUnitCheckedBy: result.SoldUnitCheckedBy,
                        soldUnitCheckedByUser: "",
                        soldUnitApprovedBy: result.SoldUnitApprovedBy,
                        soldUnitApprovedByUser: "",
                        commissionRequestCheckedBy: result.CommissionRequestCheckedBy,
                        commissionRequestCheckedByUser: "",
                        commissionRequestApprovedBy: result.CommissionRequestApprovedBy,
                        commissionRequestApprovedByUser: "",
                        proposalFootNote: result.ProposalFootNote,
                        brokerFootNote: result.BrokerFootNote
                    };
                    this.settingsSource.next(settings);
                } else {
                    this.toastr.error("No data.");
                    setTimeout(() => {
                        this.router.navigate(["/menu"]);
                    }, 1000);
                }
            }
        );
    }

    // detail operations
    public saveSettings(settings: SysSettings): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysSettings/Save";
        this.http.put(url, JSON.stringify(settings), this.options).subscribe(
            response => {
                this.settingsSavedSource.next(1);
            },
            error => {
                this.settingsSavedSource.next(0);
            }
        )
    }

    // detail combo boxes
    public getUsers(): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUser/List";
        let users = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        users.push({
                            id: results[i].Id,
                            username: results[i].Username,
                            fullName: results[i].FullName,
                            password: results[i].Password,
                            status: results[i].Status,
                            aspNet: results[i].AspNetId
                        });
                    }
                    this.usersSource.next(users);
                } else {
                    this.toastr.error("No users."); 
                }
            }
        );
    }

    // detail line1 (drop downs) list
    public getDropDowns(): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/List";
        let dropDowns = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        dropDowns.push({
                            id: results[i].Id,
                            category: results[i].Category,
                            description: results[i].Description,
                            value: results[i].Value
                        });
                    }
                    this.dropDownsSource.next(dropDowns);
                } else {
                    this.toastr.error("No drop downs."); 
                }
            }
        );
    }

    // detail line1 (drop downs) list operations
    public deleteDropDowns(id: number): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.dropDownsDeletedSource.next(1);
            },
            error => {
                this.dropDownsDeletedSource.next(0);
            }
        )
    }
    public saveDropDowns(dropDown: SysDropDown): void {
        if(dropDown.id == 0) {
            let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/Add";
            this.http.post(url, JSON.stringify(dropDown), this.options).subscribe(
                response => {
                    this.dropDownsSavedSource.next(1);
                },
                error => {
                    this.dropDownsSavedSource.next(0);
                }
            )
        } else {
            let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/Save";
            this.http.put(url, JSON.stringify(dropDown), this.options).subscribe(
                response => {
                    this.dropDownsSavedSource.next(1);
                },
                error => {
                    this.dropDownsSavedSource.next(0);
                }
            )
        }
    }

}    