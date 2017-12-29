// Angular
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
import { MstChecklist } from "../model/model.mst.checklist";
import { SysDropDown } from '../model/model.sys.dropDown';
import { setTimeout } from "timers";
// import { error } from "util";

@Injectable()
export class ChecklistService {
    public checklistSource=new Subject<MstChecklist>();
    public checklistObservable=this.checklistSource.asObservable();

    public checklistDeletedSource=new Subject<number>();
    public checklistDeletedObservable=this.checklistDeletedSource.asObservable();

    public checklistSavedSource=new Subject<number>();
    public checklistSavedObservable=this.checklistSavedSource.asObservable();

    public checklistLockedSource=new Subject<number>();
    public checklistLockedObservable=this.checklistLockedSource.asObservable();

    public checklistUnLockedSource=new Subject<number>();
    public checklistUnLockedObservable=this.checklistUnLockedSource.asObservable();

    constructor(
        private router:Router,
        private http:Http,
        private toastr:ToastsManager
    ){}

    private headers=new Headers({
        'Authorization':'Bearer'+localStorage.getItem('access_token'),
        'Content-Type':'application/json'
    });

    private options=new RequestOptions({headers:this.headers});

    public getCheckLists():ObservableArray{
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/List";
        let checklistObservableArray=new ObservableArray();
        this.http.get(url,this.options).subscribe(
            response=>{
                var results=new ObservableArray(response.json());
                if(results.length>0){
                    for(var i=0;i<=results.length-1;i++){
                        checklistObservableArray.push({
                            id:results[i].Id,
                            checkListCode:results[i].CheckListCode,
                            checkList:results[i].CheckList,
                            checkListDate:results[i].CheckListDate,
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
                }
            }
        );
        return checklistObservableArray;
    }

    public addCheckList(checklist:MstChecklist,toastr:ToastsManager):void{
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Add";
        this.http.post(url,JSON.stringify(checklist),this.options).subscribe(
            response=>{
                var id=response.json();
                if(id>0){
                    this.toastr.success("Add Successful.");
                    setTimeout(()=>{
                        this.router.navigate(['/checklist',id]);
                    },1000);
                }else{
                    this.toastr.error("Add Failed.");
                    (<HTMLButtonElement>document.getElementById("btnAddCheckList")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnAddCheckList")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error=>{
                this.toastr.error("Server error");
            }
        )
    }

    public saveCheckList(checklist:MstChecklist):void{
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

    public lockCheckList(checklist:MstChecklist):void{
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

    public unlockCheckList(checklist:MstChecklist):void{
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/UnLock";
        this.http.put(url,JSON.stringify(checklist),this.options).subscribe(
            reponse=>{
                this.checklistUnLockedSource.next(1);
            },
            error=>{
                this.checklistUnLockedSource.next(0);
            }
        )
    }

    public getCheckList(id : number, toastr : ToastsManager){
        let checklist: MstChecklist;
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/MstCheckList/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response=>{
                var results = response.json();
                if(results != null){
                    checklist = {
                        id: results.Id,
                        checkListCode: results.CheckListCode,
                        checkList: results.CheckList,
                        checkListDate: results.CheckListDate,
                        projectId: results.ProjectId,
                        remarks: results.Remarks,
                        status: results.Status,
                        isLocked: results.IsLocked,
                        createdBy: results.CreatedBy,
                        createdDateTime: results.CreatedDateTime,
                        updatedBy: results.UpdatedBy,
                        updatedDateTime: results.UpdatedDateTime
                    };
                    this.checklistSource.next(checklist);
                }else{
                    this.toastr.error("No Data");
                    setTimeout(()=>{
                        this.router.navigate(["/checklist"]);
                    },1000);
                }
            }
        );
    }

    public getDropDowns(toastr:ToastsManager){
        let dropDowns=new ObservableArray();
        let url="http://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/List";

        this.http.get(url, this.options).subscribe(
            response=>{
                var results=new ObservableArray(response.json());
                if(results.length>0){
                    for(var i=0;i<=results.length-1;i++){
                        dropDowns.push({
                            id:results[i].Id,
                            category:results[i].Category,
                            description:results[i].Description,
                            value:results[i].Value
                        });
                    }
                }
            }
        );
    }

    public getProjects():ObservableArray{
        let projectModelObservableArray=new ObservableArray();
        return projectModelObservableArray;
    }

    public deleteCheckList(id:number){
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
}