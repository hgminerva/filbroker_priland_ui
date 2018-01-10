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

// Models
import { MstBroker } from '../model/model.mst.broker';
import { SysDropDown } from '../model/model.sys.dropDown';

@Injectable()
export class BrokerService {
    
    // private properties
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // public properties

    // broker list
    public brokersSource = new Subject<ObservableArray>();
    public brokersObservable = this.brokersSource.asObservable();

    // broker detail
    public brokerSource = new Subject<MstBroker>();
    public brokerObservable = this.brokerSource.asObservable();

    // broker operations
    public brokerDeletedSource = new Subject<number>();
    public brokerDeletedObservable = this.brokerDeletedSource.asObservable();

    public brokerSavedSource = new Subject<number>();
    public brokerSavedObservable = this.brokerSavedSource.asObservable();

    public brokerLockedSource = new Subject<number>();
    public brokerLockedObservable = this.brokerLockedSource.asObservable();

    public brokerUnlockedSource = new Subject<number>();
    public brokerUnlockedObservable = this.brokerUnlockedSource.asObservable();

    // drop downs comboboxes
    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable();
    
    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // get brokers
    public getBrokers(): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstBroker/List";
        let brokers = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        brokers.push({
                            id: results[i].Id,
                            brokerCode: results[i].BrokerCode,
                            lastName: results[i].LastName,
                            firstName: results[i].FirstName,
                            middleName: results[i].MiddleName,
                            fullName: results[i].FullName,
                            licenseNumber: results[i].LicenseNumber,
                            birthDate: results[i].BirthDate,
                            civilStatus: results[i].CivilStatus,
                            gender: results[i].Gender,
                            address: results[i].Address,
                            telephoneNumber: results[i].TelephoneNumber,
                            mobileNumber: results[i].MobileNumber,
                            religion: results[i].Religion,
                            emailAddress: results[i].EmailAddress,
                            facebook: results[i].Facebook,
                            tIN: results[i].TIN,
                            realtyFirm: results[i].RealtyFirm,
                            realtyFirmAddress: results[i].RealtyFirmAddress,
                            realtyFirmTelephoneNumber: results[i].RealtyFirmTelephoneNumber,
                            realtyFirmMobileNumber: results[i].RealtyFirmMobileNumber,
                            realtyFirmFaxNumber: results[i].RealtyFirmFaxNumber,
                            realtyFirmEmailAddress: results[i].RealtyFirmEmailAddress,
                            realtyFirmWebsite: results[i].RealtyFirmWebsite,
                            realtyFirmTIN: results[i].RealtyFirmTIN,
                            organization: results[i].Organization,
                            remarks: results[i].Remarks,
                            picture: results[i].Picture,
                            status: results[i].Status,
                            isLocked: results[i].IsLocked,
                            createdBy: results[i].CreatedBy,
                            createdDateTime: results[i].CreatedDateTime,
                            updatedBy: results[i].UpdatedBy,
                            updatedDateTime: results[i].UpdatedDateTime
                        });
                    }
                    this.brokersSource.next(brokers);
                }else{
                    this.brokersSource.next(brokers);
                    this.toastr.error("No brokers.");   
                }
            }
        );
    }

    // get broker detail
    public getBroker(id: number): void {
        let broker: MstBroker;
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstBroker/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results != null) {
                    broker = {
                        id: results.Id,
                        brokerCode: results.BrokerCode,
                        lastName: results.LastName,
                        firstName: results.FirstName,
                        middleName: results.MiddleName,
                        fullName: results.FullName,
                        licenseNumber: results.LicenseNumber,
                        birthDate: results.BirthDate,
                        civilStatus: results.CivilStatus,
                        gender: results.Gender,
                        address: results.Address,
                        telephoneNumber: results.TelephoneNumber,
                        mobileNumber: results.MobileNumber,
                        religion: results.Religion,
                        emailAddress: results.EmailAddress,
                        facebook: results.Facebook,
                        tin: results.TIN,
                        realtyFirm: results.RealtyFirm,
                        realtyFirmAddress: results.RealtyFirmAddress,
                        realtyFirmTelephoneNumber: results.RealtyFirmTelephoneNumber,
                        realtyFirmMobileNumber: results.RealtyFirmMobileNumber,
                        realtyFirmFaxNumber: results.RealtyFirmFaxNumber,
                        realtyFirmEmailAddress: results.RealtyFirmEmailAddress,
                        realtyFirmWebsite: results.RealtyFirmWebsite,
                        realtyFirmTIN: results.RealtyFirmTIN,
                        organization: results.Organization,
                        remarks: results.Remarks,
                        picture: results.Picture,
                        status: results.Status,
                        isLocked: results.IsLocked,
                        createdBy: results.CreatedBy,
                        createdDateTime: results.CreatedDateTime,
                        updatedBy: results.UpdatedBy,
                        updatedDateTime: results.UpdatedDateTime,
                    };
                    this.brokerSource.next(broker);
                } else {
                    this.toastr.error("No data.");
                    setTimeout(() => {
                        this.router.navigate(["/broker"]);
                    }, 1000);
                }
            }
        );
    }

    // get drop downs for combo boxes
    public getDropDowns() {
        let dropDowns = new ObservableArray();
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

    // broker operations 
    public addBroker(broker: MstBroker): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstBroker/Add";
        this.http.post(url, JSON.stringify(broker), this.options).subscribe(
            response => {
                var id = response.json();
                console.log(id);
                if (id > 0) {
                    this.toastr.success("Add successful.");
                    setTimeout(() => {
                        this.router.navigate(['/broker', id]);
                    }, 1000);
                } else {
                    this.toastr.error("Add failed.");
                }
            },
            error => {
                this.toastr.error("Server error.");
            }
        )
    }
    public saveBroker(broker: MstBroker): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstBroker/Save";
        this.http.put(url, JSON.stringify(broker), this.options).subscribe(
            response => {
                this.brokerSavedSource.next(1);
            },
            error => {
                this.brokerSavedSource.next(0);
            }
        )
    }
    public lockBroker(broker: MstBroker): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstBroker/Lock";
        this.http.put(url, JSON.stringify(broker), this.options).subscribe(
            response => {
                this.brokerLockedSource.next(1);
            },
            error => {
                this.brokerLockedSource.next(0);
            }
        )
    }
    public unlockBroker(broker: MstBroker): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstBroker/Unlock";
        this.http.put(url, JSON.stringify(broker), this.options).subscribe(
            response => {
                this.brokerUnlockedSource.next(1);
            },
            error => {
                this.brokerUnlockedSource.next(0);
            }
        )
    }
    public deleteBroker(id: number) {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstBroker/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.brokerDeletedSource.next(1);
            },
            error => {
                this.brokerDeletedSource.next(0);
            }
        )
    }

}