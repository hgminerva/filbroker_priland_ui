// Angular
import { Component, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ChecklistService } from './checklist.service';

// WijMo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';

// Messagebox 
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstChecklist } from '../model/model.mst.checklist';

@Component({
  templateUrl: './checklist.list.html'
})
export class ChecklistList {
  // private properties
  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  private checklistsSub: any;
  private projectsSub: any;
  private checklistDeletedSub: any;

  //public properties
  public title = 'Checklist List';

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

  public fgdChecklistData: ObservableArray;
  public fgdChecklistCollection: CollectionView;
  public cmbProjectsData: ObservableArray;

  @ViewChild("cmbProjects")
  public cmbProjects: ElementRef;

  //constructor
  constructor(
    private checklistService: ChecklistService,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  //ng
  ngOnInit() {
    this.fgdChecklistData = new ObservableArray();
    this.fgdChecklistCollection = new CollectionView(this.fgdChecklistData);

    this.getProjects();
  }

  ngOnDestroy() {
    if (this.checklistsSub != null) this.checklistsSub.unsubscribe();
    if (this.projectsSub != null) this.projectsSub.unsubscribe();
    if (this.checklistDeletedSub != null) this.checklistDeletedSub.unsubscribe();
  }

  // public methods
  public getProjects(): void {
    this.checklistService.getProjects();

    this.projectsSub = this.checklistService.projectsObservable.subscribe(
      data => {
        if (data.length > 0) {
          this.cmbProjectsData = data;
        }
      }
    );
  }

  public getChecklistPerProjectId(projectId: number): void {
    let checklist = new ObservableArray();

    this.checklistService.getChecklistPerProjectId(projectId);

    this.checklistsSub = this.checklistService.checklistsObservable.subscribe(
      data => {
        this.fgdChecklistData = data;
        this.fgdChecklistCollection = new CollectionView(this.fgdChecklistData);
        this.fgdChecklistCollection.pageSize = 15;
        this.fgdChecklistCollection.trackChanges = true;
      }
    );
  }

  //events
  public cmbProjectsDataChange(): void {
    let index = this.cmbProjects["selectedIndex"];
    let projectId = this.cmbProjectsData[index]["id"];
    let project = this.cmbProjectsData[index]["project"];

    this.checklist.projectId = projectId;
    this.checklist.project = project;

    this.getChecklistPerProjectId(projectId);
  }

  public btnAddChecklistClick(): void {
    let btnAddChecklist: Element = document.getElementById("btnAddChecklist");

    btnAddChecklist.setAttribute("disabled", "disabled");
    btnAddChecklist.innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";

    this.checklistService.addChecklist(this.checklist, btnAddChecklist);
  }

  public btnDeleteChecklistClick(): void {
    let btnDeleteChecklist: Element = document.getElementById("btnDeleteChecklist");
    let btnDeleteCloseChecklist: Element = document.getElementById("btnDeleteCloseChecklist");

    let selectedChecklist = this.fgdChecklistCollection.currentItem;

    btnDeleteChecklist.setAttribute("disabled", "disabled");
    btnDeleteCloseChecklist.setAttribute("disabled", "disabled");

    this.checklistService.deleteChecklist(selectedChecklist.id, );
    this.checklistDeletedSub = this.checklistService.checklistDeletedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Delete successful.");
          this.fgdChecklistCollection.remove​(selectedChecklist);

          btnDeleteChecklist.removeAttribute("disabled");
          btnDeleteCloseChecklist.removeAttribute("disabled");

          document.getElementById("btnDeleteCloseUnit").click();
        } else if (data == 0) {
          this.toastr.error("Delete failed.");

          btnDeleteChecklist.removeAttribute("disabled");
          btnDeleteCloseChecklist.removeAttribute("disabled");
        }
      }
    );
  }

  public btnEditChecklistClick(): void {
    let selectedChecklist = this.fgdChecklistCollection.currentItem;
    this.router.navigate(['/checklist', selectedChecklist.id]);
  }

}