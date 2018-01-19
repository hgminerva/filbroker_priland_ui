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

// model(s)
import { MstBroker } from '../model/model.mst.broker';
import { SysDropDown } from '../model/model.sys.dropDown';

@Injectable()
export class ReportsService {

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

    // sold unit summary list
    public soldUnitsSource = new Subject<ObservableArray>();
    public soldUnitsObservable = this.soldUnitsSource.asObservable();

    // commission request summary list
    public commissionRequestsSource = new Subject<ObservableArray>();
    public commissionRequestsObservable = this.commissionRequestsSource.asObservable();

    // sold unit requirement activity summary list
    public soldUnitRequirementActivitiesSource = new Subject<ObservableArray>();
    public soldUnitRequirementActivitiesObservable = this.soldUnitRequirementActivitiesSource.asObservable();

    // =======
    // angular
    // =======

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    public getSoldUnitSummary(dateStart: string, dateEnd: string): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/RepSummary/ListSoldUnitPerDates/" + dateStart + "/" + dateEnd;
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
                }else{
                    this.soldUnitsSource.next(soldUnits);
                    this.toastr.error("No sold units.");   
                }
            }
        );
    }

    public getCommissionRequestSummary(dateStart: string, dateEnd: string): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/RepSummary/ListCommissionRequestPerDates/" + dateStart + "/" + dateEnd;
        let commissionRequests = new ObservableArray();
        
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        commissionRequests.push({
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
                    this.commissionRequestsSource.next(commissionRequests);
                } else {
                    this.commissionRequestsSource.next(commissionRequests);
                    this.toastr.error("No commissions requests.");   
                }
            }
        );
    }

    public getSoldUnitRequirementActivitySummary(dateStart: string, dateEnd: string) : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/RepSummary/ListSoldUnitRequirementActivityPerDates/" + dateStart + "/" + dateEnd;
        let soldUnitRequirementActivities = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        soldUnitRequirementActivities.push({
                            id : results[i].Id,
                            soldUnitRequirementId : results[i].SoldUnitRequirementId,
                            activityDate : results[i].ActivityDate,
                            activity : results[i].Activity,
                            remarks : results[i].Remarks,
                            userId : results[i].UserId,
                            user : results[i].User,
                            checklistRequirement : results[i].ChecklistRequirement,
                            soldUnitNumber : results[i].SoldUnitNumber,
                            project : results[i].Project,
                            unitCode : results[i].UnitCode,
                            customer : results[i].Customer
                        });
                    }
                    this.soldUnitRequirementActivitiesSource.next(soldUnitRequirementActivities);
                } else {
                    this.soldUnitRequirementActivitiesSource.next(soldUnitRequirementActivities);
                    this.toastr.error("No sold unit requirement activities.");   
                }
            }
        );
    }

}