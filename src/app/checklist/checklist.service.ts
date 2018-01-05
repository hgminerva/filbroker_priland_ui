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
import { MstChecklist } from '../model/model.mst.checklist';
import { SysDropDown } from '../model/model.sys.dropDown';

@Injectable()
export class ChecklistService {
    // private properties
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });

    private options = new RequestOptions({ headers: this.headers });

    // public properties
    public projectsSource = new Subject<ObservableArray>();
    public projectsObservable = this.projectsSource.asObservable();

    public checklistsSource = new Subject<ObservableArray>();
    public checklistsObservable = this.checklistsSource.asObservable();

    public checklistSource = new Subject<MstChecklist>();
    public checklistObservable = this.checklistSource.asObservable();

    public checklistDeletedSource = new Subject<number>();
    public checklistDeletedObservable = this.checklistDeletedSource.asObservable();

    public checklistSavedSource = new Subject<number>();
    public checklistSavedObservable = this.checklistSavedSource.asObservable();

    public checklistLockedSource = new Subject<number>();
    public checklistLockedObservable = this.checklistLockedSource.asObservable();

    public checklistUnlockedSource = new Subject<number>();
    public checklistUnlockedObservable = this.checklistUnlockedSource.asObservable();

    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable();

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // public methods
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

    public getChecklistPerProjectId(projectId: number): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstChecklist/ListPerProjectId/" + projectId;
        let units = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        units.push({
                            id: results[i].Id,
                            checklistCode: results[i].ChecklistCode,
                            checklist: results[i].Checklist,
                            checklistDate: results[i].ChecklistDate,
                            projectId: results[i].ProjectId,
                            remarks: results[i].Remarks,
                            status: results[i].Status,
                            isLocked: results[i].IsLocked,
                            createdBy: results[i].CreatedBy,
                            createdDateTime: results[i].CreatedDateTime,
                            updatedBy: results[i].UpdatedBy,
                            updatedDateTime: results[i].UpdatedDateTime
                        });
                    }
                    this.checklistsSource.next(units);
                } else {
                    this.checklistsSource.next(units);
                    this.toastr.error("No checklist for this project.");
                }
            }
        );
    }

    public addChecklist(checklist: MstChecklist, btnAddChecklist: Element): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Add";
        this.http.post(url, JSON.stringify(checklist), this.options).subscribe(
            response => {
                var id = response.json();
                if (id > 0) {
                    this.toastr.success("Add Successful.");
                    setTimeout(() => {
                        this.router.navigate(['/checklist', id]);
                    }, 1000);
                } else {
                    this.toastr.error("Add Failed.");
                    btnAddChecklist.removeAttribute("disabled");
                    btnAddChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error => {
                this.toastr.error("Server error.");
                btnAddChecklist.removeAttribute("disabled");
                btnAddChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
            }
        )
    }

    public getChecklist(id: number): void {
        let checklist: MstChecklist;
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var result = response.json();
                if (result != null) {
                    checklist = {
                        id: result.Id,
                        checklistCode: result.ChecklistCode,
                        checklist: result.Checklist,
                        checklistDate: result.ChecklistDate,
                        projectId: result.ProjectId,
                        project: result.Project,
                        remarks: result.Remarks,
                        status: result.Status,
                        isLocked: result.IsLocked,
                        createdBy: result.CreatedBy,
                        createdDateTime: result.CreatedDateTime,
                        updatedBy: result.UpdatedBy,
                        updatedDateTime: result.UpdatedDateTime
                    };
                    this.checklistSource.next(checklist);
                } else {
                    this.toastr.error("No checklist.");
                    setTimeout(() => {
                        this.router.navigate(["/checklist"]);
                    }, 1000);
                }
            }
        );
    }

    public deleteChecklist(id: number): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Delete/" + id;

        this.http.delete(url, this.options).subscribe(
            response => {
                this.checklistDeletedSource.next(1);
            },
            error => {
                this.checklistDeletedSource.next(0);
            }
        )
    }

    public saveChecklist(checklist: MstChecklist): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Save";
        this.http.put(url, JSON.stringify(checklist), this.options).subscribe(
            response => {
                this.checklistSavedSource.next(1);
            },
            error => {
                this.checklistSavedSource.next(0);
            }
        )
    }

    public lockChecklist(checklist: MstChecklist): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Lock";
        this.http.put(url, JSON.stringify(checklist), this.options).subscribe(
            response => {
                this.checklistLockedSource.next(1);
            },
            error => {
                this.checklistLockedSource.next(0);
            }
        )
    }

    public unlockChecklist(checklist: MstChecklist): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/UnLock";
        this.http.put(url, JSON.stringify(checklist), this.options).subscribe(
            reponse => {
                this.checklistUnlockedSource.next(1);
            },
            error => {
                this.checklistUnlockedSource.next(0);
            }
        )
    }

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

}