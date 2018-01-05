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
import { TrnSoldUnit } from '../model/model.trn.soldUnit';
import { TrnSoldUnitRequirement } from '../model/model.trn.soldUnit.requirement';
import { TrnSoldUnitRequirementActivity } from '../model/model.trn.soldUnit.requirement.activity';

import { MstProject } from '../model/model.mst.project';
import { MstUnit } from '../model/model.mst.unit';
import { MstCustomer } from '../model/model.mst.customer';
import { MstBroker } from '../model/model.mst.broker';
import { MstChecklist } from '../model/model.mst.checklist';
import { SysDropDown } from '../model/model.sys.dropDown';

@Injectable()
export class SoldUnitService {

    // ==================
    // private properties
    // ==================

    // api url
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // =================
    // public properties
    // =================

    // async observables for list and detail model
    public soldUnitsSource = new Subject<ObservableArray>();
    public soldUnitsObservable = this.soldUnitsSource.asObservable();

    public soldUnitSource = new Subject<TrnSoldUnit>();
    public soldUnitObservable = this.soldUnitSource.asObservable();

    // async observables for comboboxes, list and other controls
    public projectsSource = new Subject<ObservableArray>();
    public projectsObservable = this.projectsSource.asObservable();

    public unitsSource = new Subject<ObservableArray>();
    public unitsObservable = this.unitsSource.asObservable();

    public checklistsSource = new Subject<ObservableArray>();
    public checklistsObservable = this.checklistsSource.asObservable();

    public customersSource = new Subject<ObservableArray>();
    public customersObservable = this.customersSource.asObservable(); 

    public brokersSource = new Subject<ObservableArray>();
    public brokersObservable = this.brokersSource.asObservable(); 

    public usersSource = new Subject<ObservableArray>();
    public usersObservable = this.usersSource.asObservable(); 

    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable(); 
    
    // async observables for detail items
    public soldUnitRequirementsSource = new Subject<ObservableArray>();
    public soldUnitRequirementsObservable = this.soldUnitRequirementsSource.asObservable();

    public soldUnitRequirementActivitiesSource = new Subject<ObservableArray>();
    public soldUnitRequirementActivitiesObservable = this.soldUnitRequirementActivitiesSource.asObservable();

    // async observables for events, e.g., saving, locking, unlocking
    // sold units
    public soldUnitSavedSource = new Subject<number>();
    public soldUnitSavedObservable = this.soldUnitSavedSource.asObservable();   

    public soldUnitLockedSource = new Subject<number>();
    public soldUnitLockedObservable = this.soldUnitLockedSource.asObservable();  

    public soldUnitUnlockedSource = new Subject<number>();
    public soldUnitUnlockedObservable = this.soldUnitUnlockedSource.asObservable();  

    // sold unit requirements
    public soldUnitRequirementSavedSource = new Subject<number>();
    public soldUnitRequirementSavedObservable = this.soldUnitRequirementSavedSource.asObservable();  

    // sold unit requirement activities
    public soldUnitRequirementAcvititySavedSource = new Subject<number>();
    public soldUnitRequirementActivitySavedObservable = this.soldUnitRequirementAcvititySavedSource.asObservable();  

    public soldUnitRequirementAcvitityAddSource = new Subject<number>();
    public soldUnitRequirementActivityAddObservable = this.soldUnitRequirementAcvitityAddSource.asObservable();  
    
    public soldUnitRequirementAcvitityDeleteSource = new Subject<number>();
    public soldUnitRequirementActivityDeleteObservable = this.soldUnitRequirementAcvitityDeleteSource.asObservable();  

    // ===========
    // constructor
    // ===========

    // there is only one constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // ==============
    // public methods
    // ==============

    // get sold units per date range
    public getSoldUnitsPerDates(dateStart: string, dateEnd: string): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnit/ListPerDates/" + dateStart + "/" + dateEnd;
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
                    this.toastr.error("No sold units for this date range.");   
                }
            }
        );
    }

    // get sold unit detail
    public getSoldUnit(id : number) : void {
        let soldUnit: TrnSoldUnit;
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnit/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var result = response.json();
                if (result != null) {
                    soldUnit = {
                        id: result.Id,
                        soldUnitNumber: result.SoldUnitNumber,
                        soldUnitDate: result.SoldUnitDate,
                        projectId: result.ProjectId,
                        project: result.Project,
                        unitId: result.UnitId,
                        unit: result.Unit,
                        customerId: result.CustomerId,
                        customer: result.Customer,
                        brokerId: result.BrokerId,
                        broker: result.Broker,
                        checklistId: result.ChecklistId,
                        checklist: result.Checklist,
                        price: result.Price,
                        totalInvestment: result.TotalInvestment,
                        paymentOptions: result.PaymentOptions,
                        financing: result.Financing,
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
                    this.soldUnitSource.next(soldUnit);
                } else {
                    this.toastr.error("No sold unit.");
                    setTimeout(() => {
                        this.router.navigate(["/soldUnit"]);
                    }, 1000);
                }
            }
        );    
    }

    // get new sold unit requirements (delete existing and create new requirements)
    public getNewSoldUnitRequirements(soldUnitId : number, checklistId : number) : void { 
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnitRequirement/ListNewTrnSoldUnitRequirements/" + soldUnitId + "/" + checklistId;
        let soldUnitRequirements = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        soldUnitRequirements.push({
                            id: results[i].Id,
                            soldUnitId: results[i].SoldUnitId,
                            checklistRequirementId: results[i].ChecklistRequirementId,
                            checklistRequirement: results[i].ChecklistRequirement,
                            checklistRequirementNo: results[i].ChecklistRequirementNo,
                            checklistCategory: results[i].ChecklistCategory,
                            checklistType: results[i].ChecklistType,
                            checklistWithAttachments: results[i].ChecklistWithAttachments,
                            attachment1: results[i].Attachment1 == null ? "" : results[i].Attachment1,
                            attachment2: results[i].Attachment2 == null ? "" : results[i].Attachment2,
                            attachment3: results[i].Attachment3 == null ? "" : results[i].Attachment3,
                            attachment4: results[i].Attachment4 == null ? "" : results[i].Attachment4,
                            attachment5: results[i].Attachment5 == null ? "" : results[i].Attachment5,
                            remarks: results[i].Remarks,
                            status: results[i].Status,
                            statusDate: results[i].StatusDate,
                        });
                    }
                    this.soldUnitRequirementsSource.next(soldUnitRequirements);
                } else {
                    this.soldUnitRequirementsSource.next(soldUnitRequirements);
                    this.toastr.error("No requirements for this sold unit.");   
                }
            }
        );
    }

    // get existing sold unit requirements
    public getSoldUnitRequirements(soldUnitId : number) : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnitRequirement/ListPerUnitSold/" + soldUnitId;
        let soldUnitRequirements = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        soldUnitRequirements.push({
                            id: results[i].Id,
                            soldUnitId: results[i].SoldUnitId,
                            checklistRequirementId: results[i].ChecklistRequirementId,
                            checklistRequirement: results[i].ChecklistRequirement,
                            checklistRequirementNo: results[i].ChecklistRequirementNo,
                            checklistCategory: results[i].ChecklistCategory,
                            checklistType: results[i].ChecklistType,
                            checklistWithAttachments: results[i].ChecklistWithAttachments,
                            attachment1: results[i].Attachment1 == null ? "" : results[i].Attachment1,
                            attachment2: results[i].Attachment2 == null ? "" : results[i].Attachment2,
                            attachment3: results[i].Attachment3 == null ? "" : results[i].Attachment3,
                            attachment4: results[i].Attachment4 == null ? "" : results[i].Attachment4,
                            attachment5: results[i].Attachment5 == null ? "" : results[i].Attachment5,
                            remarks: results[i].Remarks,
                            status: results[i].Status,
                            statusDate: results[i].StatusDate,
                        });
                    }
                    this.soldUnitRequirementsSource.next(soldUnitRequirements);
                } else {
                    this.soldUnitRequirementsSource.next(soldUnitRequirements);
                    this.toastr.error("No requirements for this sold unit.");   
                }
            }
        );
    }

    // get sold unit requirement activities
    public getSoldUnitRequirementActivities(soldUnitRequirementId : number) : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnitRequirementActivity/ListPerSoldUnitRequirement/" + soldUnitRequirementId;
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
                            user : results[i].User
                        });
                    }
                    this.soldUnitRequirementActivitiesSource.next(soldUnitRequirementActivities);
                } else {
                    this.soldUnitRequirementActivitiesSource.next(soldUnitRequirementActivities);
                    this.toastr.error("No activities for this sold unit requirement.");   
                }
            }
        );
    }

    // get all projects
    public getProjects(): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstProject/List";
        let projects = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        projects.push({
                            id: results[i].Id,
                            projectCode: results[i].ProjectCode,
                            project: results[i].Project,
                            address: results[i].Address,
                            status: results[i].Status,
                            isLocked: results[i].IsLocked,
                            createdBy: results[i].CreatedBy,
                            createdDateTime: results[i].CreatedDateTime,
                            updatedBy: results[i].UpdatedBy,
                            updatedDateTime: results[i].UpdatedDateTime
                        });
                    }
                    this.projectsSource.next(projects);
                } else {
                    this.toastr.error("No projects.");   
                }
            }
        );
    }

    // get sys drop down data to be use for status
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

    // get units per project
    public getUnitsPerProject(projectId: number): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUnit/ListPerProjectId/" + projectId;
        let units = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        units.push({
                            id: results[i].Id,
                            unitCode: results[i].UnitCode,
                            block: results[i].Block,
                            lot: results[i].Lot,
                            projectId: results[i].ProjectId,
                            project: results[i].Project,
                            houseModelId: results[i].HouseModelId,
                            houseModel: results[i].HouseModel,
                            tla: results[i].TLA,
                            tfa: results[i].TFA,
                            price: results[i].Price,
                            status: results[i].Status,
                            isLocked: results[i].IsLocked,
                            createdBy: results[i].CreatedBy,
                            createdDateTime: results[i].CreatedDateTime,
                            updatedBy: results[i].UpdatedBy,
                            updatedDateTime: results[i].UpdatedDateTime,
                        });
                    }
                    this.unitsSource.next(units);
                } else {
                    this.unitsSource.next(units);
                    this.toastr.error("No units for this project.");   
                }
            }
        );
    }
    
    // get checklist per project
    public getChecklistsPerProject(projectId: number): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstChecklist/ListPerProjectId/" + projectId;
        let checklists = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        checklists.push({
                            id:results[i].Id,
                            checklistCode:results[i].ChecklistCode,
                            checklist:results[i].Checklist,
                            checklistDate:results[i].ChecklistDate,
                            projectId:results[i].ProjectId,
                            remarks:results[i].Remarks,
                            status:results[i].Status,
                            isLocked:results[i].IsLocked,
                            createdBy:results[i].CreatedBy,
                            createdDateTime:results[i].CreatedDateTime,
                            updatedBy:results[i].UpdatedBy,
                            updatedDateTime:results[i].UpdatedDateTime
                        });
                    }
                    this.checklistsSource.next(checklists);
                } else {
                    this.checklistsSource.next(checklists);
                    this.toastr.error("No checklist for this project.");   
                }
            }
        );
    }

    // get all customers
    public getCustomers() : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCustomer/List";
        let customers = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        customers.push({
                            id: results[i].Id,
                            fullName: results[i].FullName
                        });
                    }
                    this.customersSource.next(customers);
                } else {
                    this.toastr.error("No customers.");   
                }
            }
        );
    }

    // get all brokers
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

    // get all users
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
                    this.toastr.error("No brokers.");   
                }
            }
        );
    }

    // sold unit operations
    public saveSoldUnit(soldUnit: TrnSoldUnit): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnit/Save";
        this.http.put(url, JSON.stringify(soldUnit), this.options).subscribe(
            response => {
                this.soldUnitSavedSource.next(1);
            },
            error => {
                this.soldUnitSavedSource.next(0);
            }
        )
    }
    public lockSoldUnit(soldUnit: TrnSoldUnit): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnit/Lock";
        this.http.put(url, JSON.stringify(soldUnit), this.options).subscribe(
            response => {
                this.soldUnitLockedSource.next(1);
            },
            error => {
                this.soldUnitLockedSource.next(0);
            }
        )
    }
    public unlockSoldUnit(soldUnit: TrnSoldUnit): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnit/Unlock";
        this.http.put(url, JSON.stringify(soldUnit), this.options).subscribe(
            response => {
                this.soldUnitUnlockedSource.next(1);
            },
            error => {
                this.soldUnitUnlockedSource.next(0);
            }
        )
    }

    // sold unit requirement operations
    public saveSoldUnitRequirement(soldUnitRequirement: TrnSoldUnitRequirement): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnitRequirement/Save";
        this.http.put(url, JSON.stringify(soldUnitRequirement), this.options).subscribe(
            response => {
                this.soldUnitRequirementSavedSource.next(1);
            },
            error => {
                this.soldUnitRequirementSavedSource.next(0);
            }
        )
    }

    // sold unit requirement activity operations
    public saveSoldUnitRequirementActivity(soldUnitRequirementActivity: TrnSoldUnitRequirementActivity): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnitRequirementActivity/Save";
        this.http.put(url, JSON.stringify(soldUnitRequirementActivity), this.options).subscribe(
            response => {
                this.soldUnitRequirementAcvititySavedSource.next(1);
            },
            error => {
                this.soldUnitRequirementAcvititySavedSource.next(0);
            }
        )
    }
    public addSoldUnitRequirementActivity(soldUnitRequirementActivity: TrnSoldUnitRequirementActivity): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnitRequirementActivity/Add";
        this.http.post(url, JSON.stringify(soldUnitRequirementActivity), this.options).subscribe(
            response => {
                this.soldUnitRequirementAcvitityAddSource.next(1);
            },
            error => {
                this.soldUnitRequirementAcvitityAddSource.next(0);
            }
        )
    }
    public deleteSoldUnitRequirementActivity(id : number) : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/TrnSoldUnitRequirementActivity/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.soldUnitRequirementAcvitityDeleteSource.next(1);
            },
            error => {
                this.soldUnitRequirementAcvitityDeleteSource.next(0);
            }
        )
    }

}