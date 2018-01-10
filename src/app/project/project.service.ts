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
import { MstProject } from '../model/model.mst.project';
import { SysDropDown } from '../model/model.sys.dropDown';
import { MstHouseModel } from '../model/model.mst.houseModel';

@Injectable()
export class ProjectService {

    // private properties
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // public properties

    // list
    public projectsSource = new Subject<ObservableArray>();
    public projectsObservable = this.projectsSource.asObservable();

    // detail
    public projectSource = new Subject<MstProject>();
    public projectObservable = this.projectSource.asObservable();

    // detail operations
    public projectDeletedSource = new Subject<number>();
    public projectDeletedObservable = this.projectDeletedSource.asObservable();

    public projectSavedSource = new Subject<number>();
    public projectSavedObservable = this.projectSavedSource.asObservable();   

    public projectLockedSource = new Subject<number>();
    public projectLockedObservable = this.projectLockedSource.asObservable();  

    public projectUnlockedSource = new Subject<number>();
    public projectUnlockedObservable = this.projectUnlockedSource.asObservable();  

    // dropdown list
    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable();

    // detail lines1 (house models) list
    public houseModelsSource = new Subject<ObservableArray>();
    public houseModelsObservable = this.houseModelsSource.asObservable();

    // detail lines1 (house models) operations
    public houseModelDeletedSource = new Subject<number>();
    public houseModelDeletedObservable = this.houseModelDeletedSource.asObservable();

    public houseModelSavedSource = new Subject<number>();
    public houseModelSavedObservable = this.houseModelSavedSource.asObservable();   

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // public methods

    // project listing
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
                    this.toastr.error("No data.");   
                }
            }
        );
    }

    // project listing operations
    public addProject(project: MstProject, btnAddProject: Element): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstProject/Add";
        this.http.post(url, JSON.stringify(project), this.options).subscribe(
            response => {
                var id = response.json();
                if (id > 0) {
                    this.toastr.success("Add successful.");
                    setTimeout(() => {
                        this.router.navigate(['/project', id]);
                    }, 1000);
                } else {
                    this.toastr.error("Add failed.");
                    btnAddProject.removeAttribute("disabled");
                    btnAddProject.innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error => {
                this.toastr.error("Server error.");
                btnAddProject.removeAttribute("disabled");
                btnAddProject.innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
            }
        )
    }
    public deleteProject(id : number) {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstProject/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.projectDeletedSource.next(1);
            },
            error => {
                this.projectDeletedSource.next(0);
            }
        )
    }

    // project detail
    public getProject(id : number) {
        let project: MstProject;
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstProject/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var result = response.json();
                if (result != null) {
                    project = {
                        id: result.Id,
                        projectCode: result.ProjectCode,
                        project: result.Project,
                        address: result.Address,
                        status: result.Status,
                        isLocked: result.IsLocked,
                        createdBy: result.CreatedBy,
                        createdDateTime: result.CreatedDateTime,
                        updatedBy: result.UpdatedBy,
                        updatedDateTime: result.UpdatedDateTime
                    };
                    this.projectSource.next(project);
                } else {
                    this.toastr.error("No data.");
                    setTimeout(() => {
                        this.router.navigate(["/project"]);
                    }, 1000);
                }
            }
        );
    }

    // project detail operations
    public saveProject(project: MstProject): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstProject/Save";
        this.http.put(url, JSON.stringify(project), this.options).subscribe(
            response => {
                this.projectSavedSource.next(1);
            },
            error => {
                this.projectSavedSource.next(0);
            }
        )
    }
    public lockProject(project: MstProject): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstProject/Lock";
        this.http.put(url, JSON.stringify(project), this.options).subscribe(
            response => {
                this.projectLockedSource.next(1);
            },
            error => {
                this.projectLockedSource.next(0);
            }
        )
    }
    public unlockProject(project: MstProject): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstProject/Unlock";
        this.http.put(url, JSON.stringify(project), this.options).subscribe(
            response => {
                this.projectUnlockedSource.next(1);
            },
            error => {
                this.projectUnlockedSource.next(0);
            }
        )
    }

    // combo boxes
    public getDropDowns()  {
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

    // get house models per project
    public getHouseModelsPerProject(id : number) {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstHouseModel/ListPerProjectId/" + id;
        let houseModels = new ObservableArray();
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
                    this.toastr.error("No house models for this project.");   
                }
            }
        );
    }

    // house models operation
    public saveHouseModel(houseModel: MstHouseModel): void {
        if(houseModel.id == 0) {
            let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstHouseModel/Add";
            this.http.post(url, JSON.stringify(houseModel), this.options).subscribe(
                response => {
                    this.houseModelSavedSource.next(1);
                },
                error => {
                    this.houseModelSavedSource.next(0);
                }
            )
        } else {
            let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstHouseModel/Save";
            this.http.put(url, JSON.stringify(houseModel), this.options).subscribe(
                response => {
                    this.houseModelSavedSource.next(1);
                },
                error => {
                    this.houseModelSavedSource.next(0);
                }
            )
        }
    }
    public deleteHouseModel(id: number) {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstHouseModel/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.houseModelDeletedSource.next(1);
            },
            error => {
                this.houseModelDeletedSource.next(0);
            }
        )
    }

}