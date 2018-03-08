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

    // sold unit checklist requirement
    public soldUnitChecklistRequirementSource = new Subject<ObservableArray>();
    public soldUnitChecklistRequirementObservable = this.soldUnitChecklistRequirementSource.asObservable();

    // sending email
    public sendEmailSource =  new Subject<number>();
    public sendEmailObservable = this.sendEmailSource.asObservable();

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
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/RepSummary/ListSoldUnitPerDates/" + dateStart + "/" + dateEnd;
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
                            agent: results[i].Agent,
                            brokerCoordinator: results[i].BrokerCoordinator,
                            checklistId: results[i].ChecklistId,
                            checklist: results[i].Checklist,
                            price: results[i].Price,
                            equityValue: results[i].EquityValue,
                            equityPercent: results[i].EquityPercent,
                            discount: results[i].Discount,
                            reservation: results[i].Reservation,
                            netEquity: results[i].NetEquity,
                            netEquityInterest: results[i].NetEquityInterest,
                            netEquityNoOfPayments: results[i].NetEquityNoOfPayments,
                            netEquityAmortization: results[i].NetEquityAmortization,
                            balance: results[i].Balance,
                            balanceInterest: results[i].BalanceInterest,
                            balanceNoOfPayments: results[i].BalanceNoOfPayments,
                            balanceAmortization: results[i].BalanceAmortization,
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
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/RepSummary/ListCommissionRequestPerDates/" + dateStart + "/" + dateEnd;
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
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/RepSummary/ListSoldUnitRequirementActivityPerDates/" + dateStart + "/" + dateEnd;
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

    public getSoldUnitChecklistSummary(dateStart: string, dateEnd: string) : void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/RepSummary/ListSoldUnitChecklistPerDates/" + dateStart + "/" + dateEnd;
        let soldUnitChecklist = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        soldUnitChecklist.push({
                            id : results[i].Id,
                            soldUnitId : results[i].SoldUnitId,
                            checklistRequirementId : results[i].ChecklistRequirementId,
                            checklistRequirement : results[i].ChecklistRequirement,
                            checklistRequirementNo : results[i].ChecklistRequirementNo,
                            checklistCategory : results[i].ChecklistCategory,
                            checklistType : results[i].ChecklistType,
                            checklistWithAttachments : results[i].ChecklistWithAttachments,
                            attachment1 : results[i].Attachment1,
                            attachment2 : results[i].Attachment2,
                            attachment3 : results[i].Attachment3,
                            attachment4 : results[i].Attachment4,
                            attachment5 : results[i].Attachment5,
                            remarks : results[i].Remarks,
                            status : results[i].Status,
                            statusDate : results[i].StatusDate,
                            soldUnitNumber : results[i].SoldUnitNumber,
                            soldUnitDate : results[i].SoldUnitDate,
                            project : results[i].Project,
                            unit : results[i].Unit,
                            customer : results[i].Customer
                        });
                    }
                    this.soldUnitChecklistRequirementSource.next(soldUnitChecklist);
                } else {
                    this.soldUnitChecklistRequirementSource.next(soldUnitChecklist);
                    this.toastr.error("No sold unit checklist requirements.");   
                }
            }
        );
    }

    public sendEmail(attachment : Blob, filename : string) : void {
        let mailgunUrl: string = "sandbox56506e2182a34cddae6690198eb6627f.mailgun.org";
        let apiKey: string = "YXBpOmtleS1iYmIxNmY2ZTZmZGU0MGQ2YWJkZTNmOWJiYjAyMTlhZA==";
        let url : string  = "https://api.mailgun.net/v3/" + mailgunUrl + "/messages";

        var formData = new FormData();
        formData.append('to', 'hgminerva@gmail.com');
        formData.append('from', "hgminerva@innosoft.ph");
        formData.append('subject', "PRILAND REPORTS");
        formData.append('text', "See attachments.");
        formData.append('attachment', attachment, filename);

        let emailHeaders = new Headers({
                "Authorization": "Basic " + apiKey
            }
        );
        let emailOptions = new RequestOptions({ headers: emailHeaders });

        this.http.post(url, formData, emailOptions)
            .subscribe(result => {
                this.sendEmailSource.next(1);
            }, error => {
                this.sendEmailSource.next(0);
        });
    }

}