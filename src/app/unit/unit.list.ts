// angular
import { Component,ViewContainerRef,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// services
import { UnitService } from './unit.service';

// wijmo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';

// message box 
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// model(s)
import { MstUnit } from '../model/model.mst.unit';

@Component({
  templateUrl: './unit.list.html'
})
export class UnitList {

  // ==================
  // private properties
  // ==================

  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  // list and list operations
  private unitsSub : any;
  private unitDeletedSub : any;

  // filters
  private projectsSub : any;
  
  // =================
  // public properties
  // =================

  public title : string = 'Unit List';
  public filterUnit : string;

  public unit : MstUnit = {
    id: 0,
    unitCode: "NA",
    block: "NA",
    lot: "NA",
    projectId: 0,
    project: "NA",
    houseModelId: 0,
    houseModel: "NA",
    tla: 0,
    tfa: 0,
    price: 0,
    status: "OPEN",
    isLocked: false,
    createdBy: 1,
    createdDateTime: this.currentDateString,
    updatedBy: 1,
    updatedDateTime: this.currentDateString
  };

  // combo boxes data
  public cmbProjectsData : ObservableArray;

  // combo boxes element (if there are events)
  @ViewChild("cmbProjects")
  public cmbProjects:ElementRef;

  // unit list data source
  public fgdUnitsData : ObservableArray;
  public fgdUnitsCollection : CollectionView;

  // modals
  public mdlUnitDeleteShow : boolean = false;

  // =======
  // angular
  // =======

  // constructor
  constructor(
      private unitService : UnitService,
      private toastr : ToastsManager,
      private viewContainer : ViewContainerRef,
      private router : Router
  ) {
      this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.fgdUnitsData = new ObservableArray();
    this.fgdUnitsCollection = new CollectionView(this.fgdUnitsData);

    this.getProjects();
  }
  ngOnDestroy() {
    if( this.unitsSub != null) this.unitsSub.unsubscribe();
    if( this.projectsSub != null) this.projectsSub.unsubscribe();

    if( this.unitDeletedSub != null) this.unitDeletedSub.unsubscribe();
  }

  // ==============
  // public methods
  // ==============

  // unit list
  public getUnitsPerProjectId(projectId: number) : void {
    let units = new ObservableArray();

    this.unitService.getUnitsPerProjectId(projectId);

    this.unitsSub = this.unitService.unitsObservable.subscribe(
      data => {
        this.fgdUnitsData = data;
        this.fgdUnitsCollection = new CollectionView(this.fgdUnitsData);
        this.fgdUnitsCollection.pageSize = 15;
        this.fgdUnitsCollection.trackChanges = true;  
      }
    );
  }

  // filters
  public getProjects() : void {
    this.unitService.getProjects();

    this.projectsSub = this.unitService.projectsObservable.subscribe(
      data => {
        let projectStatuses = new ObservableArray();
        if (data.length > 0) {
          this.cmbProjectsData = data;
        }
      }
    );
  }

  // ======
  // events
  // ======

  // filter events
  public cmbProjectsChange() : void {
    let projectId = this.cmbProjectsData[this.cmbProjects["selectedIndex"]]["id"];
    let project = this.cmbProjectsData[this.cmbProjects["selectedIndex"]]["project"];

    this.unit.projectId = projectId;
    this.unit.project = project;

    this.getUnitsPerProjectId(projectId);
  }

  // unit list operations
  public btnAddUnitClick() : void {
    let btnAddUnit:Element = document.getElementById("btnAddUnit");

    btnAddUnit.setAttribute("disabled","disabled");
    btnAddUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";

    this.unitService.addUnit(this.unit, btnAddUnit);
  }
  public btnDeleteUnitClick() : void {
    this.mdlUnitDeleteShow = true;
  }
  public btnEditUnitClick() : void {
    let selectedUnit = this.fgdUnitsCollection.currentItem;
    this.router.navigate(['/unit', selectedUnit.id]);
  }

  // delete unit modal operations
  public btnOkUnitDeleteModalClick() : void {
    let btnOkUnitDeleteModal:Element = document.getElementById("btnOkUnitDeleteModal");
    let btnCloseUnitDeleteModal:Element = document.getElementById("btnCloseUnitDeleteModal");

    let selectedUnit = this.fgdUnitsCollection.currentItem;

    btnOkUnitDeleteModal.setAttribute("disabled","disabled");
    btnCloseUnitDeleteModal.setAttribute("disabled","disabled");

    this.unitService.deleteUnit(selectedUnit.id,);
    this.unitDeletedSub = this.unitService.unitDeletedObservable.subscribe(
        data => {
            if(data == 1) {
                this.toastr.success("Delete successful.");
                this.fgdUnitsCollection.remove​(selectedUnit);

                btnOkUnitDeleteModal.removeAttribute("disabled");
                btnCloseUnitDeleteModal.removeAttribute("disabled");

                this.mdlUnitDeleteShow = false;
            } else if(data == 0) {
                this.toastr.error("Delete failed.");   

                btnOkUnitDeleteModal.removeAttribute("disabled");
                btnCloseUnitDeleteModal.removeAttribute("disabled");
            }
        }
    );
  }
  public btnCloseUnitDeleteModalClick() : void {
    this.mdlUnitDeleteShow = false;
  }

}