// angular
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// wijmo
import { ObservableArray } from 'wijmo/wijmo';

// async
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// model (s)
import { TrnSoldUnit } from '../model/model.trn.soldUnit';
import { TrnCommissionRequest } from '../model/model.trn.commissionRequest';
import { MstBroker } from '../model/model.mst.broker';
import { SysDropDown } from '../model/model.sys.dropDown';

@Injectable()
export class CommissionService {

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

    // list and detail
    public commissionsSource = new Subject<ObservableArray>();
    public commissionsObservable = this.commissionsSource.asObservable();

    public commissionSource = new Subject<TrnCommissionRequest>();
    public commissionObservable = this.commissionSource.asObservable();

    // detail operations
    public commissionSavedSource = new Subject<number>();
    public commissionSavedObservable = this.commissionSavedSource.asObservable();   

    public commissionLockedSource = new Subject<number>();
    public commissionLockedObservable = this.commissionLockedSource.asObservable();  

    public commissionUnlockedSource = new Subject<number>();
    public commissionUnlockedObservable = this.commissionUnlockedSource.asObservable();  

    // list opertations
    public commissionDeletedSource = new Subject<number>();
    public commissionDeletedObservable = this.commissionDeletedSource.asObservable();   

    // combo boxes
    public soldUnitsSource = new Subject<ObservableArray>();
    public soldUnitsObservable = this.soldUnitsSource.asObservable();

    public brokersSource = new Subject<ObservableArray>();
    public brokersObservable = this.brokersSource.asObservable();

    public usersSource = new Subject<ObservableArray>();
    public usersObservable = this.usersSource.asObservable();

    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable();

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

    // list and detail
    public getCommissionsPerDates(dateStart: string, dateEnd: string): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnCommissionRequest/ListPerDates/" + dateStart + "/" + dateEnd;
        let commissionRequest = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        commissionRequest.push({
                            id: results[i].Id,
                            commissionRequestNumber: results[i].CommissionRequestNumber,
                            commissionRequestDate: results[i].CommissionRequestDate,
                            brokerId: results[i].BrokerId,
                            broker: results[i].Broker,
                            soldUnitId: results[i].SoldUnitId,
                            soldUnit: results[i].SoldUnit,
                            commissionNumber: results[i].CommissionNumber,
                            amount: results[i].Amount,
                            remarks: results[i].Remarks,
                            preparedBy: results[i].PreparedBy,
                            preparedByUser: results[i].PreparedByUser,
                            checkedBy: results[i].CheckedBy,
                            checkedByUser: results[i].CheckedByUser,
                            approvedBy: results[i].ApprovedBy,
                            approvedByUser: results[i].ApprovedByUser,
                            status: results[i].Status,
                            isLocked: results[i].IsLocked,
                            createdBy: results[i].CreatedBy,
                            createdDateTime: results[i].CreatedDateTime,
                            updatedBy: results[i].UpdatedBy,
                            updatedDateTime: results[i].UpdatedDateTime
                        });
                    }
                    this.commissionsSource.next(commissionRequest);
                } else {
                    this.commissionsSource.next(commissionRequest);
                    this.toastr.error("No commissions for this date range.");   
                }
            }
        );
    }
    public getCommission(id : number) : void {
        let commission: TrnCommissionRequest;
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnCommissionRequest/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var result = response.json();
                if (result != null) {
                    commission = {
                        id: result.Id,
                        commissionRequestNumber: result.CommissionRequestNumber,
                        commissionRequestDate: result.CommissionRequestDate,
                        brokerId: result.BrokerId,
                        broker: result.Broker,
                        soldUnitId: result.SoldUnitId,
                        soldUnit: result.SoldUnit,
                        commissionNumber: result.CommissionNumber,
                        amount: result.Amount,
                        remarks: result.Remarks,
                        preparedBy: result.PreparedBy,
                        preparedByUser: result.PreparedByUser,
                        checkedBy: result.CheckedBy,
                        checkedByUser: result.CheckedByUser,
                        approvedBy: result.ApprovedBy,
                        approvedByUser: result.ApprovedByUser,
                        status: result.Status,
                        isLocked: result.IsLocked,
                        createdBy: result.CreatedBy,
                        createdDateTime: result.CreatedDateTime,
                        updatedBy: result.UpdatedBy,
                        updatedDateTime: result.UpdatedDateTime
                    };
                    this.commissionSource.next(commission);
                } else {
                    this.toastr.error("No commission request.");
                    setTimeout(() => {
                        this.router.navigate(["/commission"]);
                    }, 1000);
                }
            }
        );    
    }

    // combo boxes
    public getSoldUnits(): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnit/List";
        let soldUnits = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        soldUnits.push({
                            id: results[i].Id,
                            soldUnitNumber: results[i].SoldUnitNumber,
                            soldUnitDate: results[i].SoldUnitDate,
                            projectId: results[i].ProjectId,
                            project: results[i].Project,
                            unitId: results[i].UnitId,
                            unit: results[i].Unit,
                            customerId: results[i].CustomerId,
                            customer: results[i].Customer,
                            brokerId: results[i].BrokerId,
                            broker: results[i].Broker,
                            checklistId: results[i].ChecklistId,
                            checklist: results[i].Checklist,
                            price: results[i].Price,
                            totalInvestment: results[i].TotalInvestment,
                            paymentOptions: results[i].PaymentOptions,
                            financing: results[i].Financing,
                            remarks: results[i].Remarks,
                            preparedBy: results[i].PreparedBy,
                            preparedByUser: results[i].PreparedByUser,
                            checkedBy: results[i].CheckedBy,
                            checkedByUser: results[i].CheckedByUser,
                            approvedBy: results[i].ApprovedBy,
                            approvedByUser: results[i].ApprovedByUser,
                            status: results[i].Status,
                            isLocked: results[i].IsLocked,
                            createdBy: results[i].CreatedBy,
                            createdDateTime: results[i].CreatedDateTime,
                            updatedBy: results[i].UpdatedBy,
                            updatedDateTime: results[i].UpdatedDateTime
                        });
                    }
                    this.soldUnitsSource.next(soldUnits);
                } else {
                    this.soldUnitsSource.next(soldUnits);
                    this.toastr.error("No sold units.");   
                }
            }
        );
    }
    public getBrokers() : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstBroker/List";
        let brokers = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        brokers.push({
                            id: results[i].Id,
                            fullName: results[i].FullName
                        });
                    }
                    this.brokersSource.next(brokers);
                } else {
                    this.toastr.error("No brokers.");   
                }
            }
        );
    }
    public getUsers() : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUser/List";
        let users = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        users.push({
                            id: results[i].Id,
                            fullName: results[i].FullName
                        });
                    }
                    this.usersSource.next(users);
                } else {
                    this.toastr.error("No users.");   
                }
            }
        );
    }
    public getDropDowns() : void {
        let dropDowns  = new ObservableArray();
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/List";

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
                    this.dropDownsSource.next(dropDowns);
                    this.toastr.error("No dropdowns.");   
                }
            }
        );
    }

    // list operations
    public addCommission(commission: TrnCommissionRequest, btnAddCommission: Element) : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnCommissionRequest/Add";
        this.http.post(url, JSON.stringify(commission), this.options).subscribe(
            response => {
                var id = response.json();
                if (id > 0) {
                    this.toastr.success("Add successful.");
                    setTimeout(() => {
                        this.router.navigate(['/commission', id]);
                    }, 1000);
                } else {
                    this.toastr.error("Add failed.");
                    btnAddCommission.removeAttribute("disabled");
                    btnAddCommission.innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error => {
                this.toastr.error("Server error.");
                btnAddCommission.removeAttribute("disabled");
                btnAddCommission.innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
            }
        )
    }
    public deleteCommission(id: number) : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnCommissionRequest/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.commissionDeletedSource.next(1);
            },
            error => {
                this.commissionDeletedSource.next(0);
            }
        )
    }

    // detail operations
    public saveCommission(commission: TrnCommissionRequest): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnCommissionRequest/Save";
        this.http.put(url, JSON.stringify(commission), this.options).subscribe(
            response => {
                this.commissionSavedSource.next(1);
            },
            error => {
                this.commissionSavedSource.next(0);
            }
        )
    }
    public lockCommission(commission: TrnCommissionRequest): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnCommissionRequest/Lock";
        this.http.put(url, JSON.stringify(commission), this.options).subscribe(
            response => {
                this.commissionLockedSource.next(1);
            },
            error => {
                this.commissionLockedSource.next(0);
            }
        )
    }
    public unlockCommission(commission: TrnCommissionRequest): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnCommissionRequest/Unlock";
        this.http.put(url, JSON.stringify(commission), this.options).subscribe(
            response => {
                this.commissionUnlockedSource.next(1);
            },
            error => {
                this.commissionUnlockedSource.next(0);
            }
        )
    }

}