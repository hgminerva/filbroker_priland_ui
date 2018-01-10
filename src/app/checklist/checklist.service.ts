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
import { MstChecklistRequirement } from '../model/model.mst.checklist.requirement';

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

    // list 
    public checklistsSource = new Subject<ObservableArray>();
    public checklistsObservable = this.checklistsSource.asObservable();

    // detail
    public checklistSource = new Subject<MstChecklist>();
    public checklistObservable = this.checklistSource.asObservable();

    // detail operations
    public checklistDeletedSource = new Subject<number>();
    public checklistDeletedObservable = this.checklistDeletedSource.asObservable();

    public checklistSavedSource = new Subject<number>();
    public checklistSavedObservable = this.checklistSavedSource.asObservable();

    public checklistLockedSource = new Subject<number>();
    public checklistLockedObservable = this.checklistLockedSource.asObservable();

    public checklistUnlockedSource = new Subject<number>();
    public checklistUnlockedObservable = this.checklistUnlockedSource.asObservable();

    // dropdown list
    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable();

    // requirements
    public checklistRequirementsSource = new Subject<ObservableArray>();
    public checklistRequirementsObservable = this.checklistRequirementsSource.asObservable();

    // requirements operation
    public checklistRequirementsDeletedSource = new Subject<number>();
    public checklistRequirementsDeletedObservable = this.checklistRequirementsDeletedSource.asObservable();

    public checklistRequirementsSavedSource = new Subject<number>();
    public checklistRequirementsSavedObservable = this.checklistRequirementsSavedSource.asObservable();

    // constructor
    constructor(
        private router:Router,
        private http:Http,
        private toastr:ToastsManager
    ){}

    // public methods

    // checklist listing
    public getProjects() : void {
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
    public getChecklistPerProjectId(projectId : number) : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstChecklist/ListPerProjectId/" + projectId;
        let checklist = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        checklist.push({
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
                    this.checklistsSource.next(checklist);
                } else {
                    this.checklistsSource.next(checklist);
                    this.toastr.error("No checklist for this project.");   
                }
            }
        );
    }
    public addChecklist(checklist : MstChecklist, btnAddChecklist: Element) : void {
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Add";
        this.http.post(url,JSON.stringify(checklist),this.options).subscribe(
            response=>{
                var id = response.json();
                if(id>0){
                    this.toastr.success("Add Successful.");
                    setTimeout(()=>{
                        this.router.navigate(['/checklist',id]);
                    },1000);
                }else{
                    this.toastr.error("Add Failed.");
                    btnAddChecklist.removeAttribute("disabled");
                    btnAddChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error=>{
                this.toastr.error("Server error.");
                btnAddChecklist.removeAttribute("disabled");
                btnAddChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
            }
        )
    }
    public getChecklist(id : number) : void {
        let checklist: MstChecklist;
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response=>{
                var result = response.json();
                if(result != null){
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
                }else{
                    this.toastr.error("No checklist.");
                    setTimeout(()=>{
                        this.router.navigate(["/checklist"]);
                    },1000);
                }
            }
        );
    }

    // checklist detail operation
    public deleteChecklist(id : number) : void {
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Delete/" + id;

        this.http.delete(url, this.options).subscribe(
            response=>{
                this.checklistDeletedSource.next(1);
            },
            error=>{
                this.checklistDeletedSource.next(0);
            }
        )
    }
    public saveChecklist(checklist : MstChecklist) : void {
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Save";
        this.http.put(url,JSON.stringify(checklist),this.options).subscribe(
            response=>{
                this.checklistSavedSource.next(1);
            },
            error=>{
                this.checklistSavedSource.next(0);
            }
        )
    }
    public lockChecklist(checklist : MstChecklist) : void{
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Lock";
        this.http.put(url,JSON.stringify(checklist),this.options).subscribe(
            response=>{
                this.checklistLockedSource.next(1);
            },
            error=>{
                this.checklistLockedSource.next(0);
            }
        )
    }
    public unlockChecklist(checklist : MstChecklist) : void{
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/UnLock";
        this.http.put(url,JSON.stringify(checklist),this.options).subscribe(
            reponse=>{
                this.checklistUnlockedSource.next(1);
            },
            error=>{
                this.checklistUnlockedSource.next(0);
            }
        )
    }

    // dropdowns
    public getDropDowns(){
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

    // get requirements
    public getChecklistRequirementsPerChecklist(id : number) {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckListRequirement/ListPerChecklist/" + id;
        let checklistRequirements = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        checklistRequirements.push({
                            id: results[i].Id,
                            checkListId: results[i].CheckListId,
                            checkList: results[i].CheckList,
                            requirementNo: results[i].RequirementNo,
                            requirement: results[i].Requirement,
                            category: results[i].Category,
                            type: results[i].Type,
                            withAttachments: results[i].WithAttachments,
                        });
                    }
                    this.checklistRequirementsSource.next(checklistRequirements);
                } else {
                    this.checklistRequirementsSource.next(checklistRequirements);
                    this.toastr.error("No requirement for this checklist.");   
                }
            }
        );
    }

    // requirements operation
    public saveChecklistRequirement(checklistRequirement: MstChecklistRequirement): void {
        if(checklistRequirement.id == 0) {
            let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckListRequirement/Add";
            this.http.post(url, JSON.stringify(checklistRequirement), this.options).subscribe(
                response => {
                    this.checklistRequirementsSavedSource.next(1);
                },
                error => {
                    this.checklistRequirementsSavedSource.next(0);
                }
            )
        } else {
            let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckListRequirement/Save";
            this.http.put(url, JSON.stringify(checklistRequirement), this.options).subscribe(
                response => {
                    this.checklistRequirementsSavedSource.next(1);
                },
                error => {
                    this.checklistRequirementsSavedSource.next(0);
                }
            )
        }
    }
    public deleteChecklistRequirement(id: number) {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckListRequirement/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.checklistRequirementsDeletedSource.next(1);
            },
            error => {
                this.checklistRequirementsDeletedSource.next(0);
            }
        )
    }

}