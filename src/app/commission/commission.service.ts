// Angular
import { Injectable } from '@angular/core';
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
import { TrnSoldUnit } from '../model/model.trn.soldUnit';
import { TrnCommissionRequest } from '../model/model.trn.commissionRequest';
import { MstBroker } from '../model/model.mst.broker';
import { SysDropDown } from '../model/model.sys.dropDown';

@Injectable()
export class CommissionService {
    // private properties
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });

    private options = new RequestOptions({ headers: this.headers });

    // public properties
    public commissionsSource = new Subject<ObservableArray>();
    public commissionsObservable = this.commissionsSource.asObservable();

    public commissionSource = new Subject<TrnCommissionRequest>();
    public commissionObservable = this.commissionSource.asObservable();

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // public methods
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
                    this.toastr.error("No sold units for this date range.");   
                }
            }
        );
    }

}