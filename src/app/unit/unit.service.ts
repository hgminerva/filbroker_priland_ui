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
import { MstProject } from '../model/model.mst.project';
import { MstUnit } from '../model/model.mst.unit';
import { MstHouseModel } from '../model/model.mst.houseModel';
import { SysDropDown } from '../model/model.sys.dropDown';

@Injectable()
export class UnitService {
    
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

    // unit list
    public unitsSource = new Subject<ObservableArray>();
    public unitsObservable = this.unitsSource.asObservable();

    // unit detail
    public unitSource = new Subject<MstUnit>();
    public unitObservable = this.unitSource.asObservable();

    // unit list operations
    public unitDeletedSource = new Subject<number>();
    public unitDeletedObservable = this.unitDeletedSource.asObservable();

    // unit detail operations
    public unitSavedSource = new Subject<number>();
    public unitSavedObservable = this.unitSavedSource.asObservable();   

    public unitLockedSource = new Subject<number>();
    public unitLockedObservable = this.unitLockedSource.asObservable();  

    public unitUnlockedSource = new Subject<number>();
    public unitUnlockedObservable = this.unitUnlockedSource.asObservable();  

    // combo boxes
    public projectsSource = new Subject<ObservableArray>();
    public projectsObservable = this.projectsSource.asObservable();

    public houseModelsSource = new Subject<ObservableArray>();
    public houseModelsObservable = this.houseModelsSource.asObservable();

    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable();

    // =======
    // angular
    // =======

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // ==============
    // public methods
    // ==============

    // list
    public getProjects(): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/MstProject/List";
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

    // list operations
    public addUnit(unit: MstUnit, btnAddUnit: Element): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/MstUnit/Add";
        this.http.post(url, JSON.stringify(unit), this.options).subscribe(
            response => {
                var id = response.json();
                if (id > 0) {
                    this.toastr.success("Add successful.");
                    setTimeout(() => {
                        this.router.navigate(['/unit', id]);
                    }, 1000);
                } else {
                    this.toastr.error("Add failed.");
                    btnAddUnit.removeAttribute("disabled");
                    btnAddUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error => {
                this.toastr.error("Server error.");
                btnAddUnit.removeAttribute("disabled");
                btnAddUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
            }
        )
    }
    public deleteUnit(id : number) : void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/MstUnit/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.unitDeletedSource.next(1);
            },
            error => {
                this.unitDeletedSource.next(0);
            }
        )
    }

    // detail
    public getUnit(id : number) : void {
        let unit: MstUnit;
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/MstUnit/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var result = response.json();
                if (result != null) {
                    unit = {
                        id: result.Id,
                        unitCode: result.UnitCode,
                        block: result.Block,
                        lot: result.Lot,
                        projectId: result.ProjectId,
                        project: result.Project,
                        houseModelId: result.HouseModelId,
                        houseModel: result.HouseModel,
                        tla: result.TLA,
                        tfa: result.TFA,
                        price: result.Price,
                        status: result.Status,
                        isLocked: result.IsLocked,
                        createdBy: result.CreatedBy,
                        createdDateTime: result.CreatedDateTime,
                        updatedBy: result.UpdatedBy,
                        updatedDateTime: result.UpdatedDateTime,
                    };
                    this.unitSource.next(unit);
                } else {
                    this.toastr.error("No unit.");
                    setTimeout(() => {
                        this.router.navigate(["/unit"]);
                    }, 1000);
                }
            }
        );    
    }

    // detail operations
    public saveUnit(unit: MstUnit): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/MstUnit/Save";
        this.http.put(url, JSON.stringify(unit), this.options).subscribe(
            response => {
                this.unitSavedSource.next(1);
            },
            error => {
                this.unitSavedSource.next(0);
            }
        )
    }
    public lockUnit(unit: MstUnit): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/MstUnit/Lock";
        this.http.put(url, JSON.stringify(unit), this.options).subscribe(
            response => {
                this.unitLockedSource.next(1);
            },
            error => {
                this.unitLockedSource.next(0);
            }
        )
    }
    public unlockUnit(unit: MstUnit): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/MstUnit/Unlock";
        this.http.put(url, JSON.stringify(unit), this.options).subscribe(
            response => {
                this.unitUnlockedSource.next(1);
            },
            error => {
                this.unitUnlockedSource.next(0);
            }
        )
    }

    // combo boxes
    public getUnitsPerProjectId(projectId: number): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/MstUnit/ListPerProjectId/" + projectId;
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
    public getHouseModelsPerProject(id : number) : void {
        let houseModels  = new ObservableArray();
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/MstHouseModel/ListPerProjectId/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        houseModels.push({
                            id: results[i].Id,
                            houseModelCode: results[i].HouseModelCode,
                            houseModel: results[i].HouseModel,
                            projectId: results[i].ProjectId,
                            project: results[i].Project,
                            tfa: results[i].TFA,
                            price: results[i].Price,
                            isLocked: results[i].IsLocked,
                            createdBy: results[i].CreatedBy,
                            createdDateTime: results[i].CreatedDateTime,
                            updatedBy: results[i].UpdatedBy,
                            updatedDateTime: results[i].UpdatedDateTime,
                        });
                    }
                    this.houseModelsSource.next(houseModels);
                } else {
                    this.houseModelsSource.next(houseModels);
                    this.toastr.error("No models for this project.");   
                }
            }
        );
    }
    public getDropDowns() : void {
        let dropDowns  = new ObservableArray();
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/List";

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

}
