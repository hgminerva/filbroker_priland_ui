// angular
import { Component, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// wijmo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// service(s)
import { UnitService } from './unit.service';

// model(s)
import { MstUnit } from '../model/model.mst.unit';

@Component({
  templateUrl: './unit.detail.html'
})
export class UnitDetail {

  // ==================
  // private properties
  // ==================

  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  // detail
  private unitSub : any;

  // detail operations
  private unitSavedSub : any;
  private unitLockedSub : any;
  private unitUnlockedSub : any;

  // combo boxes
  private cmbHouseModelSub : any;
  private cmbUnitStatusSub : any;
  
  // =================
  // public properties
  // =================

  public title = 'Unit Detail';

  // model(s)
  public unit : MstUnit = {
    id: 0,
    unitCode: "",
    block: "",
    lot: "",
    projectId: 0,
    project: "",
    houseModelId: 0,
    houseModel: "",
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
  public cmbHouseModelData : ObservableArray;
  public cmbUnitStatusData : ObservableArray;

  // =======
  // angular
  // =======

  // constructor
  constructor(
    private unitService: UnitService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.getUnit();
  }
  ngOnDestroy() {
    if( this.unitSub != null) this.unitSub.unsubscribe();

    if( this.unitSavedSub != null) this.unitSavedSub.unsubscribe();
    if( this.unitLockedSub != null) this.unitLockedSub.unsubscribe();
    if( this.unitUnlockedSub != null) this.unitUnlockedSub.unsubscribe();

    if( this.cmbHouseModelSub != null) this.cmbHouseModelSub.unsubscribe();
    if( this.cmbUnitStatusSub != null) this.cmbUnitStatusSub.unsubscribe();
  }

  // ===============
  // private methods
  // ===============

  private getIdParameter() {
    let id = 0;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  // ==============
  // public methods
  // ==============

  // detail
  public getUnit() {
    this.unitService.getUnit(this.getIdParameter());

    this.unitSub = this.unitService.unitObservable
      .subscribe(
        data => {
          this.unit.id = data.id;
          this.unit.unitCode = data.unitCode;
          this.unit.block = data.block;
          this.unit.lot = data.lot;
          this.unit.projectId = data.projectId;
          this.unit.project = data.project;
          this.unit.houseModelId = data.houseModelId;
          this.unit.houseModel = data.houseModel;
          this.unit.tla = data.tla;
          this.unit.tfa = data.tfa;
          this.unit.price = data.price;
          this.unit.status = data.status;
          this.unit.isLocked = data.isLocked;
          this.unit.createdBy = data.createdBy;
          this.unit.createdDateTime = data.createdDateTime;
          this.unit.updatedBy = data.updatedBy;
          this.unit.updatedDateTime = data.updatedDateTime;

          this.getHouseModelsPerProject(data.houseModelId);
          this.getUnitStatuses(data.status);
        }
      );
  }

  // combo boxes
  public getHouseModelsPerProject(defaultValue : number) : void {
    this.unitService.getHouseModelsPerProject(this.unit.projectId);

    this.cmbHouseModelSub = this.unitService.houseModelsObservable.subscribe(
      data => {
        this.cmbHouseModelData = data;
        setTimeout(() => {
          this.unit.houseModelId = defaultValue;
        }, 100);
      }
    );
  }
  public getUnitStatuses(defaultValue : string) : void {
    this.unitService.getDropDowns();

    this.cmbUnitStatusSub = this.unitService.dropDownsObservable.subscribe(
      data => {
        let unitStatuses = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "UNIT STATUS") {
              unitStatuses.push({
                id: data[i].id,
                category: data[i].category,
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }

        this.cmbUnitStatusData = unitStatuses;
        setTimeout(() => {
          this.unit.status = defaultValue;
        }, 100);
      }
    );     
  }

  // ======
  // events
  // ======

  // detail operations
  public btnSaveUnitClick() : void {
    let btnSaveUnit:Element = document.getElementById("btnSaveUnit");

    btnSaveUnit.setAttribute("disabled","disabled");
    btnSaveUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    
    this.unitService.saveUnit(this.unit);
    this.unitSavedSub =  this.unitService.unitSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveUnit.removeAttribute("disabled");
              btnSaveUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveUnit.removeAttribute("disabled");
              btnSaveUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          }
      }
    );
  }
  public btnLockUnitClick() : void {
    let btnLockUnit:Element = document.getElementById("btnLockUnit");

    btnLockUnit.setAttribute("disabled","disabled");
    btnLockUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Locking...";

    this.unitService.lockUnit(this.unit);
    this.unitLockedSub =  this.unitService.unitLockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Locking successful.");
              this.unit.isLocked = true;
              btnLockUnit.removeAttribute("disabled");
              btnLockUnit.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          } else if(data == 0) {
              this.toastr.error("Locking failed.");   
              btnLockUnit.removeAttribute("disabled");
              btnLockUnit.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          }
      }
    );
  }
  public btnUnlockUnitClick() : void {
    let btnUnlockUnit:Element = document.getElementById("btnUnlockUnit");

    btnUnlockUnit.setAttribute("disabled","disabled");
    btnUnlockUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Unlocking...";

    this.unitService.unlockUnit(this.unit);
    this.unitUnlockedSub = this.unitService.unitUnlockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Unlocking successful.");
              this.unit.isLocked = false;
              btnUnlockUnit.removeAttribute("disabled");
              btnUnlockUnit.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          } else if(data == 0) {
              this.toastr.error("Unlocking failed.");   
              btnUnlockUnit.removeAttribute("disabled");
              btnUnlockUnit.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          }
      }
    );
  }

  // unit code events
  public txtBlockKeyup() : void {
    this.unit.unitCode = this.unit.block + this.unit.lot;
  }
  public txtLotKeyup() : void {
    this.unit.unitCode = this.unit.block + this.unit.lot;
  }

}