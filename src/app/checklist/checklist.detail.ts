// Angular
import { Component,ViewContainerRef } from '@angular/core';
import {Router,ActivatedRoute}from '@angular/router';

// Services
import{ChecklistService}from'./checklist.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstChecklist } from '../model/model.mst.checklist';
@Component({
  templateUrl: './checklist.detail.html'
})

export class ChecklistDetail {
    public title = 'Checklist Detail';

    public checklistStatusData:ObservableArray;

    private checklistSub:any;
    private checklistSavedSub:any;
    private checklistLockedSub:any;
    private checklistUnlockedSub:any;
    private checklistStatusSub:any;

    public checklist : MstChecklist={
      id:0,
      checkListCode:"",
      checkList:"",
      checkListDate:"",
      projectId:0,
      remarks:"",
      status:"",
      isLocked:false,
      createdBy:1,
      createdDateTime:"",
      updatedBy:1,
      updatedDateTime:""
    };

    constructor(
      private checklistService:ChecklistService,
      private router:Router,
      private toastr:ToastsManager,
      private viewContainer:ViewContainerRef,
      private activatedRoute:ActivatedRoute,
    ){
      this.toastr.setRootViewContainerRef(viewContainer);
    }

    public ngOnInit() {
      this.getCheckList();
    }

    public ngOnDestroy(){
      if(this.checklistSub!=null)this.checklistSub.unsubscribe();
      if(this.checklistSavedSub!=null)this.checklistSavedSub.unsubscribe();
      if(this.checklistStatusSub!=null)this.checklistStatusSub.unsubscribe();
      if(this.checklistLockedSub!=null)this.checklistLockedSub.unsubscribe();
      if(this.checklistUnlockedSub!=null)this.checklistUnlockedSub.unsubscribe();
    }

    public getIdParameter(){
      let id=0;
      this.activatedRoute.params.subscribe(params=>{
        id=params["id"];
      });
      return id;
    }
    
    public getCheckList(){
      this.checklistService.getCheckList(this.getIdParameter(),this.toastr);

      this.checklistSub=this.checklistService.checklistObservable
      .subscribe(
        data=>{
          this.checklist.id=data.id;
          this.checklist.checkListCode=data.checkListCode;
          this.checklist.checkList=data.checkList;
          this.checklist.checkListDate=data.checkListDate;
          this.checklist.projectId=data.projectId;
          this.checklist.remarks=data.remarks;
          this.checklist.status=data.status;
          this.checklist.isLocked=data.isLocked;
          this.checklist.createdBy=data.createdBy;
          this.checklist.createdDateTime=data.createdDateTime;
          this.checklist.updatedBy=data.updatedBy;
          this.checklist.updatedDateTime=data.updatedDateTime;
        }
      );
    }

    public getDropDowns(): void{
      this.checklistService.getDropDowns(this.toastr);

      this.checklistStatusSub=this.checklistService.dropDownsObservable.subscribe(
        data=>{
          let checklistStatusses=new ObservableArray();

          if(data.length>0){
            for(var i=0;i<=data.length-1;i++){
              if(data[i].category=="PROJECT STATUS"){
                checklistStatusses.push({
                  id:data[i].id,
                  category:data[i].category,
                  description:data[i].description,
                  value:data[i].value
                });
              }
            }
          }
          this.checklistStatusData=checklistStatusses;
        }
      );
    }

    public btnSaveCheckListClick():void{
      (<HTMLButtonElement>document.getElementById("btnSaveCheckList")).disabled = true;
      (<HTMLButtonElement>document.getElementById("btnSaveCheckList")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";

      this.checklistService.saveCheckList(this.checklist);

      this.checklistSavedSub=this.checklistService.checklistSavedObservable.subscribe(
        data=>{
          if(data==1){
            this.toastr.success("Saving successful.");
            (<HTMLButtonElement>document.getElementById("btnSaveCheckList")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnSaveCheckList")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
          }else if(data==0){
            this.toastr.error("Saving failed.");
            (<HTMLButtonElement>document.getElementById("btnSaveCheckList")).disabled = true;
            (<HTMLButtonElement>document.getElementById("btnSaveCheckList")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
          }
        }
      );
    }

    public btnLockCheckListClick():void{
      (<HTMLButtonElement>document.getElementById("btnLockCheckList")).disabled = true;
      (<HTMLButtonElement>document.getElementById("btnLockCheckList")).innerHTML = "<i class='fa fa-lock fa-fw'></i> Locking...";

      this.checklistService.lockCheckList(this.checklist);

      this.checklistLockedSub=this.checklistService.checklistLockedObservable.subscribe(
        data=>{
          if(data==1){
            this.toastr.success("Locking successful.");
            this.checklist.isLocked=true;
            (<HTMLButtonElement>document.getElementById("btnLockCheckList")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnLockCheckList")).innerHTML = "<i class='fa fa-lock fa-fw'></i> Locking...";
          }else if(data==0){
            this.toastr.error("Locking failed.");
            (<HTMLButtonElement>document.getElementById("btnLockCheckList")).disabled = true;
            (<HTMLButtonElement>document.getElementById("btnLockCheckList")).innerHTML = "<i class='fa fa-lock fa-fw'></i> Locking...";
          }
        }
      );
    }

    public btnUnLockedCheckListClick():void{
      (<HTMLButtonElement>document.getElementById("btnUnlockCheckList")).disabled = true;
      (<HTMLButtonElement>document.getElementById("btnUnlockCheckList")).innerHTML = "<i class='fa fa-unlock fa-fw'></i> Unlocking...";

      this.checklistService.unlockCheckList(this.checklist);

      this.checklistUnlockedSub=this.checklistService.checklistUnLockedObservable.subscribe(
        data=>{
          if(data==1){
            this.toastr.success("Unlocking successful.");
            this.checklist.isLocked=false;

            (<HTMLButtonElement>document.getElementById("btnUnlockCheckList")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnUnlockCheckList")).innerHTML = "<i class='fa fa-unlock fa-fw'></i> Unlocking...";
          }else if(data==0){
            this.toastr.error("Unlocking failed.");

            (<HTMLButtonElement>document.getElementById("btnUnlockCheckList")).disabled = true;
            (<HTMLButtonElement>document.getElementById("btnUnlockCheckList")).innerHTML = "<i class='fa fa-unlock fa-fw'></i> Unlocking...";
          }
        }
      );
    }

}