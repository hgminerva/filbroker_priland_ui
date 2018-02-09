// angular
import { Component, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// wijmo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// service(s)
import { ChecklistService } from './checklist.service';
import { SecurityService } from '../security/security.service';

// model(s)
import { MstChecklist } from '../model/model.mst.checklist';
import { MstChecklistRequirement } from '../model/model.mst.checklist.requirement';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  templateUrl: './checklist.detail.html'
})
export class ChecklistDetail {
  
  // ==================
  // private properties
  // ==================

  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  // detail
  private checklistSub: any;

  // detail operations
  private checklistSavedSub: any;
  private checklistLockedSub: any;
  private checklistUnlockedSub: any;

  // combo boxes
  private checklistStatusSub: any;

  // detail line1 (requirement) operations
  private checklistRequirementsSub: any;
  private checklistRequirementSavedSub: any;
  private checklistRequirementDeletedSub: any;

  // =================
  // public properties
  // =================

  public title: string = 'Checklist Detail';

  // model(s)
  public checklist : MstChecklist = {
    id: 0,
    checklistCode: "",
    checklist: "",
    checklistDate: this.currentDateString,
    projectId: 0,
    project: "",
    remarks: "",
    status: "ACTIVE",
    isLocked: false,
    createdBy: 1,
    createdDateTime: this.currentDateString,
    updatedBy: 1,
    updatedDateTime: this.currentDateString
  };
  public checklistRequirement : MstChecklistRequirement = {
    id: 0,
    checkListId: 0,
    checkList: "",
    requirementNo: 0,
    requirement: "",
    category: "",
    type: "OPTIONAL",
    withAttachments: false,
  };

  // combo boxes
  public cmbChecklistStatusData : ObservableArray;
  public cmbChecklistRequirementTypeData : ObservableArray;

  // detail line1 (requirement) data sources
  public fgdChecklistRequirementsData : ObservableArray;
  public fgdChecklistRequirementsCollection : CollectionView;

  // modal(s)
  public mdlChecklistRequirementDeleteShow : boolean = false;
  public mdlChecklistRequirementEditShow : boolean = false;

  // =======
  // angular
  // =======

  // constructor
  constructor(
    private checklistService:ChecklistService,
    private router:Router,
    private toastr:ToastsManager,
    private viewContainer:ViewContainerRef,
    private activatedRoute:ActivatedRoute,
    private securityService: SecurityService,
    private location: Location
  ){
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.fgdChecklistRequirementsData = new ObservableArray();
    this.fgdChecklistRequirementsCollection = new CollectionView(this.fgdChecklistRequirementsData);

    if(this.securityService.openPage("CHECKLIST DETAIL") == true) {
      this.getChecklist();
    } else {
      this.toastr.error("No rights to open page.")
      setTimeout(() => { this.location.back(); }, 1000);  
    }
  }
  ngOnDestroy(){
    if(this.checklistSub!=null)this.checklistSub.unsubscribe();
    if(this.checklistSavedSub!=null)this.checklistSavedSub.unsubscribe();
    if(this.checklistLockedSub!=null)this.checklistLockedSub.unsubscribe();
    if(this.checklistUnlockedSub!=null)this.checklistUnlockedSub.unsubscribe();

    if(this.checklistStatusSub!=null)this.checklistStatusSub.unsubscribe();

    if(this.checklistRequirementsSub!=null)this.checklistRequirementsSub.unsubscribe();
    if(this.checklistRequirementSavedSub!=null)this.checklistRequirementSavedSub.unsubscribe();
    if(this.checklistRequirementDeletedSub!=null)this.checklistRequirementDeletedSub.unsubscribe();
  }

  // ===============
  // private methods
  // ===============

  private getIdParameter() : number {
    let id = 0;
    this.activatedRoute.params.subscribe(params=>{
      id=params["id"];
    });
    return id;
  }

  // ==============
  // public methods
  // ==============

  // detail
  public getChecklist(){
    this.checklistService.getChecklist(this.getIdParameter());

    this.checklistSub=this.checklistService.checklistObservable
    .subscribe(
      data=>{
        this.checklist.id = data.id;
        this.checklist.checklistCode = data.checklistCode;
        this.checklist.checklist = data.checklist;
        this.checklist.checklistDate = data.checklistDate;
        this.checklist.projectId = data.projectId;
        this.checklist.project = data.project;
        this.checklist.remarks = data.remarks;
        this.checklist.status = data.status;
        this.checklist.isLocked = data.isLocked;
        this.checklist.createdBy = data.createdBy;
        this.checklist.createdDateTime = data.createdDateTime;
        this.checklist.updatedBy = data.updatedBy;
        this.checklist.updatedDateTime = data.updatedDateTime;

        this.getChecklistStatus(data);
        this.getChecklistRequirements();
      }
    );
  }

  // detail combo boxes
  public getChecklistStatus(detail : any) : void {
    this.checklistService.getDropDowns();

    this.checklistStatusSub = this.checklistService.dropDownsObservable.subscribe(
      data => {
        let checklistStatuses = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "CHECKLIST STATUS") {
              checklistStatuses.push({
                id: data[i].id,
                category: data[i].category,
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }
        this.cmbChecklistStatusData = checklistStatuses;
        setTimeout(() => {
          this.checklist.status = detail.status;
        }, 100);
      }
    );     
  }

  // detail line1 (requirements) 
  public getChecklistRequirements() {
    this.checklistService.getChecklistRequirementsPerChecklist(this.checklist.id);

    this.checklistRequirementsSub = this.checklistService.checklistRequirementsObservable.subscribe(
      data => {
        this.fgdChecklistRequirementsData = data;
        this.fgdChecklistRequirementsCollection = new CollectionView(this.fgdChecklistRequirementsData);
        this.fgdChecklistRequirementsCollection.pageSize = 15;
        this.fgdChecklistRequirementsCollection.trackChanges = true;  
      }
    );
  } 

  // detail line1 (requirements) combo boxes
  public getRequirementType(defaultValue : string) : void {
    this.checklistService.getDropDowns();

    this.checklistStatusSub = this.checklistService.dropDownsObservable.subscribe(
      data => {
        let requirementTypes = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "REQUIREMENT TYPE") {
              requirementTypes.push({
                id: data[i].id,
                category: data[i].category,
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }
        this.cmbChecklistRequirementTypeData = requirementTypes;
        setTimeout(() => {
          this.checklistRequirement.type = defaultValue;
        }, 100);
      }
    );  
  }

  // ======
  // events
  // ======

  // detail operations
  public btnSaveChecklistClick() : void {
    let btnSaveChecklist:Element = document.getElementById("btnSaveChecklist");

    btnSaveChecklist.setAttribute("disabled","disabled");
    btnSaveChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    
    this.checklistService.saveChecklist(this.checklist);
    this.checklistSavedSub =  this.checklistService.checklistSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveChecklist.removeAttribute("disabled");
              btnSaveChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveChecklist.removeAttribute("disabled");
              btnSaveChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          }
      }
    );
  }
  public btnLockChecklistClick() : void {
    let btnLockChecklist:Element = document.getElementById("btnLockChecklist");

    btnLockChecklist.setAttribute("disabled","disabled");
    btnLockChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Locking...";

    this.checklistService.lockChecklist(this.checklist);
    this.checklistLockedSub =  this.checklistService.checklistLockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Locking successful.");
              this.checklist.isLocked = true;
              btnLockChecklist.removeAttribute("disabled");
              btnLockChecklist.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          } else if(data == 0) {
              this.toastr.error("Locking failed.");   
              btnLockChecklist.removeAttribute("disabled");
              btnLockChecklist.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          }
      }
    );
  }
  public btnUnlockChecklistClick() : void {
    let btnUnlockChecklist:Element = document.getElementById("btnUnlockChecklist");

    btnUnlockChecklist.setAttribute("disabled","disabled");
    btnUnlockChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Unlocking...";

    this.checklistService.unlockChecklist(this.checklist);
    this.checklistUnlockedSub = this.checklistService.checklistUnlockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Unlocking successful.");
              this.checklist.isLocked = false;
              btnUnlockChecklist.removeAttribute("disabled");
              btnUnlockChecklist.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          } else if(data == 0) {
              this.toastr.error("Unlocking failed.");   
              btnUnlockChecklist.removeAttribute("disabled");
              btnUnlockChecklist.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          }
      }
    );
  }
  public btnPrintChecklistClick() : void {
    this.router.navigate(['/pdf', 'checklist',this.checklist.id]); 
  }

  // detail line1 (requirements) list operations
  public btnAddChecklistRequirementsClick() : void {
    let requirementNo : number = 0;

    for (let item of this.fgdChecklistRequirementsData) {
      if(item.requirementNo > requirementNo) requirementNo = item.requirementNo;  
    }

    this.checklistRequirement.id = 0;
    this.checklistRequirement.checkListId = this.checklist.id;
    this.checklistRequirement.requirementNo = requirementNo + 1;
    this.checklistRequirement.requirement = "";
    this.checklistRequirement.category = "";    
    this.checklistRequirement.type = "OPTIONAL";
    this.checklistRequirement.withAttachments = false;

    this.mdlChecklistRequirementEditShow = true; 

    this.getRequirementType("OPTIONAL");
  } 
  public btnEditChecklistRequirementsClick() : void {
    let selectedChecklistRequirement = this.fgdChecklistRequirementsCollection.currentItem;

    this.checklistRequirement.id = selectedChecklistRequirement.id;
    this.checklistRequirement.checkListId = selectedChecklistRequirement.checkListId;
    this.checklistRequirement.requirementNo = selectedChecklistRequirement.requirementNo;
    this.checklistRequirement.requirement = selectedChecklistRequirement.requirement;
    this.checklistRequirement.category = selectedChecklistRequirement.category;    
    this.checklistRequirement.type = selectedChecklistRequirement.type;
    this.checklistRequirement.withAttachments = selectedChecklistRequirement.withAttachments;

    this.mdlChecklistRequirementEditShow = true; 

    this.getRequirementType(selectedChecklistRequirement.type);
  }
  public btnDeleteChecklistRequirementsClick() : void {
    this.mdlChecklistRequirementDeleteShow = true;
  }

  // detail line1 (requirements) delete modal operations
  public btnOkChecklistRequirementDeleteModalClick() : void {
    let btnOkChecklistRequirementDeleteModal: Element = document.getElementById("btnOkChecklistRequirementDeleteModal");
    let btnCloseChecklistRequirementDeleteModal: Element = document.getElementById("btnCloseChecklistRequirementDeleteModal");

    btnOkChecklistRequirementDeleteModal.setAttribute("disabled","disabled");
    btnCloseChecklistRequirementDeleteModal.setAttribute("disabled","disabled");

    let selectedChecklistRequirement = this.fgdChecklistRequirementsCollection.currentItem;

    this.checklistService.deleteChecklistRequirement(selectedChecklistRequirement.id);

    this.checklistRequirementDeletedSub = this.checklistService.checklistRequirementsDeletedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Delete successful.");
          this.fgdChecklistRequirementsCollection.remove​(selectedChecklistRequirement);

          btnOkChecklistRequirementDeleteModal.removeAttribute("disabled");
          btnCloseChecklistRequirementDeleteModal.removeAttribute("disabled");

          this.mdlChecklistRequirementDeleteShow = false; 
        } else if (data == 0) {
          this.toastr.error("Delete failed.");

          btnOkChecklistRequirementDeleteModal.removeAttribute("disabled");
          btnCloseChecklistRequirementDeleteModal.removeAttribute("disabled");
        }
      }
    );
  }
  public btnCloseChecklistRequirementDeleteModalClick() : void {
    this.mdlChecklistRequirementDeleteShow = false;
  }

  // detail line1 (requirements) edit modal operations
  public btnSaveChecklistRequirementEditClick() : void {
    let btnSaveChecklistRequirementEdit:Element = document.getElementById("btnSaveChecklistRequirementEdit");
    let btnCloseChecklistRequirementEdit:Element = document.getElementById("btnCloseChecklistRequirementEdit");

    btnSaveChecklistRequirementEdit.setAttribute("disabled","disabled");
    btnSaveChecklistRequirementEdit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    btnCloseChecklistRequirementEdit.setAttribute("disabled","disabled");

    this.checklistService.saveChecklistRequirement(this.checklistRequirement);
    this.checklistRequirementSavedSub =  this.checklistService.checklistRequirementsSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveChecklistRequirementEdit.removeAttribute("disabled");
              btnSaveChecklistRequirementEdit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
              btnCloseChecklistRequirementEdit.removeAttribute("disabled");

              this.mdlChecklistRequirementEditShow = false;
              this.getChecklistRequirements();
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveChecklistRequirementEdit.removeAttribute("disabled");
              btnSaveChecklistRequirementEdit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
              btnCloseChecklistRequirementEdit.removeAttribute("disabled");
          }
      }
    );
  }
  public btnCloseChecklistRequirementEditClick() : void {
    this.mdlChecklistRequirementEditShow = false;  
  }
}