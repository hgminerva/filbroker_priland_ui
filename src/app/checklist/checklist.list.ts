// Angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MstChecklist } from '../model/model.mst.checklist';
import { DateTime } from '../../../wijmo/NpmImages/wijmo-system-min/wijmo';

// Services
import { ChecklistService } from './checklist.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Route } from '@angular/router/src/config';

@Component({
  templateUrl: './checklist.list.html'
})


export class ChecklistList {
    public title = 'Checklist List';
    public filterCheckList:string;

    private currentDate=new Date();
    private currentDateString=[this.currentDate.getFullYear(),this.currentDate.getMonth()+1,this.currentDate.getDate()].join('-');

    private checkListDeleteSub:any;

    public checklist:MstChecklist={
      id:0,
      checkListCode:"NA",
      checkList:"NA",
      checkListDate:this.currentDateString,
      projectId:0,
      remarks:"NA",
      status:"OPEN",
      isLocked:false,
      createdBy:1,
      createdDateTime:this.currentDateString,
      updatedBy:1,
      updatedDateTime:this.currentDateString
    };

    public checklistData:ObservableArray;
    public checklistCollection:CollectionView;

    constructor(
      private checklistService:ChecklistService,
      private toastr:ToastsManager,
      private viewContainer:ViewContainerRef,
      private router:Router
    ){
      this.toastr.setRootViewContainerRef(viewContainer);
    }
    
    public ngOnInit() {
      this.getCheckLists();
    }
    
    public getCheckLists():void{
      this.checklistData=this.checklistService.getCheckLists();
      this.checklistCollection=new CollectionView(this.checklistData);
      this.checklistCollection.pageSize=15;
      this.checklistCollection.trackChanges=true;
    }

    public btnAddCheckListClick():void{
      (<HTMLButtonElement>document.getElementById("btnAddCheckList")).disabled=true;
      (<HTMLButtonElement>document.getElementById("btnAddCheckList")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";

      this.checklistService.addCheckList(this.checklist, this.toastr);
    }

    public btnEditCheckListClick():void{
      let selectedCheckList=this.checklistCollection.currentItem;
      this.router.navigate(['/checklist',selectedCheckList.id]);
    }

    public btnDeleteCheckListClick(): void{
      (<HTMLButtonElement>document.getElementById("btnDeleteCheckList")).disabled = true;
      (<HTMLButtonElement>document.getElementById("btnDeleteCloseCheckList")).disabled = true;

      let selectedCheckList=this.checklistCollection.currentItem;
      this.checklistService.deleteCheckList(selectedCheckList.id);

      this.checkListDeleteSub=this.checklistService.checklistDeletedObservable.subscribe(
        data=>{
          if(data==1){
            this.toastr.success("Delete successful.");
            this.checklistCollection.remove(selectedCheckList);

            (<HTMLButtonElement>document.getElementById("btnDeleteCheckList")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnDeleteCloseCheckList")).disabled = false;
            document.getElementById("btnDeleteCloseCheckList").click();
          }else if(data==0){
            this.toastr.error("Delete failed.");

            (<HTMLButtonElement>document.getElementById("btnDeleteCheckList")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnDeleteCloseCheckList")).disabled = false;
          }
        }
      );
    }

    ngOnDestroy(){
      if(this.checkListDeleteSub!=null) this.checkListDeleteSub.unsubscribe();
    }
}