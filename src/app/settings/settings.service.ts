import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

// Message
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



// Wijmo
import { ObservableArray } from 'wijmo/wijmo';

// Async
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// Model
import { SysSettings } from '../model/model.sys.settings';
import { SysDropDown } from '../model/model.sys.dropDown';



@Injectable()
export class SettingsService {
    public projectsSource = new Subject<ObservableArray>();
    public projectsObservable = this.projectsSource.asObservable();

    public projectSource = new Subject<SysSettings>();
    public projectObservable = this.projectSource.asObservable();

    public projectDeletedSource = new Subject<number>();
    public projectDeletedObservable = this.projectDeletedSource.asObservable();

    public projectSavedSource = new Subject<number>();
    public projectSavedObservable = this.projectSavedSource.asObservable();

    public projectLockedSource = new Subject<number>();
    public projectLockedObservable = this.projectLockedSource.asObservable();

    public projectUnlockedSource = new Subject<number>();
    public projectUnlockedObservable = this.projectUnlockedSource.asObservable();

    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable();

    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });

    private options = new RequestOptions({ headers: this.headers });


    public addProject(settings: SysSettings, toastr: ToastsManager): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysSettings/Save";
        this.http.post(url, JSON.stringify(settings), this.options).subscribe(
            response => {
                var id = response.json();
                if (id > 0) {
                    this.toastr.success("Add successful.");
                    setTimeout(() => {
                        this.router.navigate(['/project', id]);
                    }, 1000);
                } else {
                    this.toastr.error("Add failed.");
                    (<HTMLButtonElement>document.getElementById("btnSave")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnSave")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error => {
                this.toastr.error("Server error.");
            }
        )
    }

    public addProjects(values: SysDropDown, toastr: ToastsManager): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/Add";
        this.http.post(url, JSON.stringify(values), this.options).subscribe(
            response => {
                var id = response.json();
                if (id > 0) {
                    this.toastr.success("Add successful.");
                    setTimeout(() => {
                        this.router.navigate(['/project', id]);
                    }, 1000);
                } else {
                    this.toastr.error("Add failed.");
                    (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error => {
                this.toastr.error("Server error.");
            }
        )
    }

    public saveProject(settings: SysSettings): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/Save";
        this.http.put(url, JSON.stringify(settings), this.options).subscribe(
            response => {
                this.projectSavedSource.next(1);
            },
            error => {
                this.projectSavedSource.next(0);
            }
        )
    }
    public getProjects(): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysSettings/Save";
        let projects = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        projects.push({
                            id: results[i].Id,
                            company: results[i].Company,
                            softwareVersion: results[i].SoftwareVersion,
                            softwareDeveloper: results[i].SoftwareDeveloper,
                            soldUnitCheckedBy: results[i].SoldUnitCheckedBy,
                            soldUnitApprovedBy: results[i].SoldUnitApprovedBy,
                            commissionRequestCheckedBy: results[i].CommissionRequestCheckedBy,
                            commissionRequestApprovedBy: results[i].CommissionRequestApprovedBy,
                            proposalFootNote: results[i].ProposalFootNote,
                            brokerFootNote: results[i].BrokerFootNote
                        });
                    }
                    this.projectsSource.next(projects);
                } else {
                    this.toastr.error("No data.");
                }
            }
        );
    }


    // public getProject(id : number) {
    //     let settings: SysSettings;
    //     let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysSettings/Detail/" + id;

    //     this.http.get(url, this.options).subscribe(
    //         response => {
    //             var results = response.json();
    //             if (results != null) {
    //                 settings = {
    //                     id: results.Id,
    //                     company: results.Company,
    //                     softwareVersion: results.SoftwareVersion,
    //                     softwareDeveloper: results.SoftwareDeveloper,
    //                     soldUnitCheckedBy: results.SoldUnitCheckedBy,
    //                     soldUnitCheckedByUser: results.SoldUnitCheckedByUser,
    //                     soldUnitApprovedBy: results.SoldUnitApprovedBy,
    //                     soldUnitApprovedByUser: results.SoldUnitApprovedByUser,
    //                     commissionRequestCheckedBy: results. CommissionRequestCheckedBy,
    //                     commissionRequestCheckedByUser: results. CommissionRequestCheckedByUser,
    //                     commissionRequestApprovedBy: results.CommissionRequestApprovedBy,
    //                     commissionRequestApprovedByUser: results.CommissionRequestApprovedByUser,
    //                     proposalFootNote: results.ProposalFootNote,
    //                     brokerFootNote: results.BrokerFootNote
    //                 };
    //                 this.projectSource.next(settings);
    //             } else {
    //                 this.toastr.error("No data.");
    //                 setTimeout(() => {
    //                     this.router.navigate(["/project"]);
    //                 }, 1000);
    //             }
    //         }
    //     );
    // }


    public getProject(id: number, toastr: ToastsManager) {
        let project: SysSettings;
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysSettings/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results != null) {
                    project = {
                        id: results.Id,
                        company: results.Company,
                        softwareVersion: results.SoftwareVersion,
                        softwareDeveloper: results.SoftwareDeveloper,
                        soldUnitCheckedBy: results.SoldUnitCheckedBy,
                        soldUnitCheckedByUser: results.SoldUnitCheckedByUser,
                        soldUnitApprovedBy: results.SoldUnitApprovedBy,
                        soldUnitApprovedByUser: results.SoldUnitApprovedByUser,
                        commissionRequestCheckedBy: results.CommissionRequestCheckedBy,
                        commissionRequestCheckedByUser: results.CommissionRequestCheckedByUser,
                        commissionRequestApprovedBy: results.CommissionRequestApprovedBy,
                        commissionRequestApprovedByUser: results.CommissionRequestApprovedByUser,
                        proposalFootNote: results.ProposalFootNote,
                        brokerFootNote: results.BrokerFootNote
                    };
                    this.projectSource.next(project);
                } else {
                    this.toastr.error("No data.");
                    setTimeout(() => {
                        this.router.navigate(["/settings"]);
                    }, 1000);
                }
            }
        );
    }
    // public getDropDowns(toastr: ToastsManager)  {
    //     let dropDowns  = new ObservableArray();
    //     let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/List";

    //     this.http.get(url, this.options).subscribe(
    //         response => {
    //             var results = new ObservableArray(response.json());
    //             if (results.length > 0) {
    //                 for (var i = 0; i <= results.length - 1; i++) {
    //                     dropDowns.push({
    //                         id: results[i].Id,
    //                         category: results[i].Category,
    //                         description: results[i].Description,
    //                         value: results[i].Value
    //                     });
    //                 }
    //                 this.dropDownsSource.next(dropDowns);
    //             } else {
    //                 this.toastr.error("No data.");   
    //             }
    //         }
    //     );

    // }
    public getUnits(): ObservableArray {
        let unitObservableArray = new ObservableArray();
        return unitObservableArray;
    }

    public getHouseModels(): ObservableArray {
        let houseModelObservableArray = new ObservableArray();
        return houseModelObservableArray;
    }


}    