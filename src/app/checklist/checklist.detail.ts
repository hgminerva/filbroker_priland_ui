// Angular
import { Component, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ChecklistService } from './checklist.service';

// WijMo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// Message Box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstChecklist } from '../model/model.mst.checklist';

@Component({
  templateUrl: './checklist.detail.html'
})
export class ChecklistDetail {

  // private properties
  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  private checklistSub: any;
  private checklistSavedSub: any;
  private checklistLockedSub: any;
  private checklistUnlockedSub: any;

  private checklistStatusSub: any;

  // public properties
  public title = 'Checklist Detail';

  public checklist: MstChecklist = {
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

  public cmbChecklistStatusData: ObservableArray;

  // constructor
  constructor(
    private checklistService: ChecklistService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  public ngOnInit() {
    this.getChecklist();
  }

  public ngOnDestroy() {
    if (this.checklistSub != null) this.checklistSub.unsubscribe();
    if (this.checklistSavedSub != null) this.checklistSavedSub.unsubscribe();
    if (this.checklistLockedSub != null) this.checklistLockedSub.unsubscribe();
    if (this.checklistUnlockedSub != null) this.checklistUnlockedSub.unsubscribe();

    if (this.checklistStatusSub != null) this.checklistStatusSub.unsubscribe();
  }

  // private methods
  private getIdParameter(): number {
    let id = 0;
    this.activatedRoute.params.subscribe(params => {
      id = params["id"];
    });
    return id;
  }

  // public methods
  public getChecklist() {
    this.checklistService.getChecklist(this.getIdParameter());

    this.checklistSub = this.checklistService.checklistObservable
      .subscribe(
      data => {
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
      }
      );
  }

  public getCmbChecklistStatusData(): void {
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
      }
    );
  }

  // events
  public btnSaveChecklistClick(): void {
    let btnSaveChecklist: Element = document.getElementById("btnSaveChecklist");

    btnSaveChecklist.setAttribute("disabled", "disabled");
    btnSaveChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";

    this.checklistService.saveChecklist(this.checklist);
    this.checklistSavedSub = this.checklistService.checklistSavedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Saving successful.");
          btnSaveChecklist.removeAttribute("disabled");
          btnSaveChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
        } else if (data == 0) {
          this.toastr.error("Saving failed.");
          btnSaveChecklist.removeAttribute("disabled");
          btnSaveChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
        }
      }
    );
  }

  public btnLockChecklistClick(): void {
    let btnLockChecklist: Element = document.getElementById("btnLockChecklist");

    btnLockChecklist.setAttribute("disabled", "disabled");
    btnLockChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Locking...";

    this.checklistService.lockChecklist(this.checklist);
    this.checklistLockedSub = this.checklistService.checklistLockedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Locking successful.");
          this.checklist.isLocked = true;
          btnLockChecklist.removeAttribute("disabled");
          btnLockChecklist.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
        } else if (data == 0) {
          this.toastr.error("Locking failed.");
          btnLockChecklist.removeAttribute("disabled");
          btnLockChecklist.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
        }
      }
    );
  }

  public btnUnlockChecklistClick(): void {
    let btnUnlockChecklist: Element = document.getElementById("btnUnlockChecklist");

    btnUnlockChecklist.setAttribute("disabled", "disabled");
    btnUnlockChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Unlocking...";

    this.checklistService.unlockChecklist(this.checklist);
    this.checklistUnlockedSub = this.checklistService.checklistUnlockedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Unlocking successful.");
          this.checklist.isLocked = false;
          btnUnlockChecklist.removeAttribute("disabled");
          btnUnlockChecklist.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
        } else if (data == 0) {
          this.toastr.error("Unlocking failed.");
          btnUnlockChecklist.removeAttribute("disabled");
          btnUnlockChecklist.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
        }
      }
    );
  }
}