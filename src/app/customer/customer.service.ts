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
import { MstCustomer } from '../model/model.mst.customer';
import { SysDropDown } from '../model/model.sys.dropDown';


@Injectable()
export class CustomerService {

    public CustomerSource = new Subject<MstCustomer>();
    public CustomerObservable = this.CustomerSource.asObservable();

    public CustomerDeletedSource = new Subject<number>();
    public CustomerDeletedObservable = this.CustomerDeletedSource.asObservable();

    public CustomerSavedSource = new Subject<number>();
    public CustomerSavedObservable = this.CustomerSavedSource.asObservable();   

    public CustomerLockedSource = new Subject<number>();
    public CustomerLockedObservable = this.CustomerLockedSource.asObservable();  

    public CustomerUnlockedSource = new Subject<number>();
    public CustomerUnlockedObservable = this.CustomerUnlockedSource.asObservable();  

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

    public getCustomers(): ObservableArray {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCustomer/List";
        let customerObservableArray = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        customerObservableArray.push({
                            id: results[i].Id,
                            customerCode: results[i].CustomerCode,
                            lastName:  results[i].LastName,
                            firstName:  results[i].FirstName,
                            middleName:  results[i].MiddleName,
                            isLocked:  results[i].IsLocked,
                            createdBy:  results[i].CreatedBy,
                            createdDateTime:  results[i].CreatedDateTime,
                            updatedBy:  results[i].UpdatedBy,
                            updatedDateTime:  results[i].UpdatedDateTime
                         
                        });
                    }
                }
            }
        );
        return customerObservableArray;
    }

    public addCustomer(project: MstCustomer, toastr: ToastsManager): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCustomer/Add";
        this.http.post(url, JSON.stringify(project), this.options).subscribe(
            response => {
                var id = response.json();
                if (id > 0) {
                    this.toastr.success("Add successful.");
                    setTimeout(() => {
                        this.router.navigate(['/customer', id]);
                    }, 1000);
                } else {
                    this.toastr.error("Add failed.");
                    (<HTMLButtonElement>document.getElementById("btnAddCustomer")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnAddCustomer")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error => {
                this.toastr.error("Server error.");
            }
        )
    }

    public saveCustomer(project: MstCustomer): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCustomer/Save";
        this.http.put(url, JSON.stringify(project), this.options).subscribe(
            response => {
                this.CustomerSavedSource.next(1);
            },
            error => {
                this.CustomerSavedSource.next(0);
            }
        )
    }

    public lockCustomer(project: MstCustomer): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCustomer/Lock";
        this.http.put(url, JSON.stringify(project), this.options).subscribe(
            response => {
                this.CustomerLockedSource.next(1);
            },
            error => {
                this.CustomerLockedSource.next(0);
            }
        )
    }

    public unlockCustomert(project: MstCustomer): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCustomer/Unlock";
        this.http.put(url, JSON.stringify(project), this.options).subscribe(
            response => {
                this.CustomerUnlockedSource.next(1);
            },
            error => {
                this.CustomerUnlockedSource.next(0);
            }
        )
    }

    public getCustomer(id : number, toastr: ToastsManager) {
        let customers: MstCustomer;
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCustomer/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results != null) {
                    customers = {
                        id: results.id,
                        customerCode: results.customerCode,
                        lastName: results.lastName,
                        firstName: results.firstName,
                        middleName: results.middleName,
                        fullName: results.fullName,
                        civilStatus: results.civilStatus,
                        gender: results.gender,
                        birthDate: results.birthDate,
                        tin: results.tin,
                        idType: results.idtype,
                        idNumber: results.idNumber,
                        address: results.address,
                        city: results.city,
                        province: results.province,
                        country: results.country,
                        zipCode: results.zipCode,
                        emailAddress: results.emailAddress,
                        telephoneNumber: results.telephoneNumber,
                        mobileNumber: results.mobileNumber,
                        employer: results.employer,
                        employerIndustry: results.employerIndustry,
                        noOfYearsEmployed: results.noOfYearsEmployed,
                        position: results.position,
                        employmentStatus: results.employmentStatus,
                        employerAddress: results.employerAddress,
                        employerCity: results.employerCity,
                        employerProvince: results.employerProvince,
                        employerCountry: results.employerCountry,
                        employerZipCode: results.employerTelephoneNumber,
                        employerTelephoneNumber: results.employerTelephoneNumber,
                        employerMobileNumber: results.employerMobileNumber,
                        remarks: results.remarks,
                        status: results.status,
                        picture: results.picture,
                        isLocked: results.isLocked,
                        createdBy: results.createdBy,
                        createdDateTime: results.createdDateTime,
                        updatedBy: results.updatedBy,
                        updatedDateTime: results.updatedDateTime                        
                    };
                    this.CustomerSource.next(customers);
                } else {
                    this.toastr.error("No data.");
                    setTimeout(() => {
                        this.router.navigate(["/Customer"]);
                    }, 1000);
                }
            }
        );
    }

    public getDropDowns(toastr: ToastsManager)  {
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
                    this.toastr.error("No data.");   
                }
            }
        );

    }

    public deleteCustomer(id : number) {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCustomer/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.CustomerDeletedSource.next(1);
            },
            error => {
                this.CustomerDeletedSource.next(0);
            }
        )
    }
    
    public getUnits(): ObservableArray {
        let unitObservableArray = new ObservableArray();
        return unitObservableArray;
    }

    public getHouseModels(): ObservableArray {
        let houseModelObservableArray = new ObservableArray();
        return houseModelObservableArray;
    }

}