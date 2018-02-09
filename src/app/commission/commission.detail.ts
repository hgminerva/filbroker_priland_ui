// angular
import { Component, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// wijmo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// message box 
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// service(s)
import { CommissionService } from './commission.service';
import { SecurityService } from '../security/security.service';

// model(s)
import { TrnCommissionRequest } from '../model/model.trn.commissionRequest';

@Component({
  templateUrl: './commission.detail.html'
})
export class CommissionDetail {

  // ==================
  // private properties
  // ==================

  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  // detail
  private commissionSub : any;

  // detail operations
  private commissionSavedSub : any;
  private commissionLockedSub : any;
  private commissionUnlockedSub : any;

  // combo boxes
  private cmbBrokerSub : any;
  private cmbSoldUnitSub : any;
  private cmbDropDownsSub : any;
  private cmbUserSub : any;  

  // =================
  // public properties
  // =================

  public title: string = 'Commission Detail';

  // model(s)
  public commission : TrnCommissionRequest = {
    id: 0,
    commissionRequestNumber: "",
    commissionRequestDate: this.currentDateString,
    brokerId: 0,
    broker: "",
    soldUnitId: 0,
    soldUnit: "",
    commissionNumber: "",
    amount: 0,
    remarks: "",
    preparedBy: 0,
    preparedByUser: "",
    checkedBy: 0,
    checkedByUser: "",
    approvedBy: 0,
    approvedByUser: "",
    status: "NEW",
    isLocked: false,
    createdBy: 0,
    createdDateTime: this.currentDateString,
    updatedBy: 0,
    updatedDateTime: this.currentDateString
  };

  // combo boxes
  public cmbBrokerData : ObservableArray;
  public cmbSoldUnitData : ObservableArray;
  public cmbCommissionNumberData : ObservableArray;
  public cmbStatusData : ObservableArray;
  public cmbUserData : ObservableArray;

  // =======
  // angular
  // =======

  // constructor
  constructor(
    private commissionService: CommissionService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService,
    private location: Location
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    if(this.securityService.openPage("COMMISSION DETAIL") == true) {
      this.getCommission(); 
    } else {
      this.toastr.error("No rights to open page.")
      setTimeout(() => { this.location.back(); }, 1000);  
    }
  }
  ngOnDestroy() {
    if( this.commissionSub != null) this.commissionSub.unsubscribe();
    if( this.commissionSavedSub != null) this.commissionSavedSub.unsubscribe();
    if( this.commissionLockedSub != null) this.commissionLockedSub.unsubscribe();
    if( this.commissionUnlockedSub != null) this.commissionUnlockedSub.unsubscribe();

    if( this.cmbBrokerSub != null) this.cmbBrokerSub.unsubscribe();
    if( this.cmbSoldUnitSub != null) this.cmbSoldUnitSub.unsubscribe();
    if( this.cmbDropDownsSub != null) this.cmbDropDownsSub.unsubscribe();
    if( this.cmbUserSub != null) this.cmbUserSub.unsubscribe();
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
  public getCommission() {
    this.commissionService.getCommission(this.getIdParameter());

    this.commissionSub = this.commissionService.commissionObservable
      .subscribe(
        data => {
          this.commission.id = data.id;
          this.commission.commissionRequestNumber = data.commissionRequestNumber;
          this.commission.commissionRequestDate = data.commissionRequestDate;
          this.commission.brokerId = data.brokerId;
          this.commission.broker = data.broker;
          this.commission.soldUnitId = data.soldUnitId;
          this.commission.soldUnit = data.soldUnit;
          this.commission.commissionNumber = data.commissionNumber;
          this.commission.amount = data.amount;
          this.commission.remarks = data.remarks;
          this.commission.preparedBy = data.preparedBy;
          this.commission.preparedByUser = data.preparedByUser;
          this.commission.checkedBy = data.checkedBy;
          this.commission.checkedByUser = data.checkedByUser;
          this.commission.approvedBy = data.approvedBy;
          this.commission.approvedByUser = data.approvedByUser;
          this.commission.status = data.status;
          this.commission.isLocked = data.isLocked;
          this.commission.createdBy = data.createdBy;
          this.commission.createdDateTime = data.createdDateTime;
          this.commission.updatedBy = data.updatedBy;
          this.commission.updatedDateTime = data.updatedDateTime;

          this.getCmbBrokerData(data);
          this.getCmbSoldUnitData(data);
          this.getCmbDropDownsData(data);
          this.getCmbUserData(data);
        }
      );
  }

  // combo boxes
  public getCmbBrokerData(defaultValue : any) : void {
    this.commissionService.getBrokers();

    this.cmbBrokerSub = this.commissionService.brokersObservable.subscribe(
      data => {
        this.cmbBrokerData = data;

        setTimeout(() => { this.commission.brokerId = defaultValue.brokerId; }, 100);
      }
    );
  }
  public getCmbSoldUnitData(defaultValue : any) : void {
    this.commissionService.getSoldUnits();

    this.cmbSoldUnitSub = this.commissionService.soldUnitsObservable.subscribe(
      data => {
        this.cmbSoldUnitData = data;

        setTimeout(() => { this.commission.soldUnitId = defaultValue.soldUnitId; }, 100);
      }
    );
  }
  public getCmbDropDownsData(defaultValue : any) : void {
    let commissionNumbers = new ObservableArray();
    let statuses = new ObservableArray();

    this.commissionService.getDropDowns();

    this.cmbDropDownsSub = this.commissionService.dropDownsObservable.subscribe(
      data => {
        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "COMMISSION STATUS") {
              statuses.push({
                description: data[i].description,
                value: data[i].value
              });
            }
            if (data[i].category == "COMMISSION NUMBERS") {
              commissionNumbers.push({
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }
        this.cmbCommissionNumberData = commissionNumbers;
        this.cmbStatusData = statuses;
        setTimeout(() => { this.commission.commissionNumber = defaultValue.commissionNumber; }, 100);
        setTimeout(() => { this.commission.status = defaultValue.status; }, 100);
      }
    );
  }
  public getCmbUserData(defaultValue : any) : void {
    this.commissionService.getUsers();

    this.cmbUserSub = this.commissionService.usersObservable.subscribe(
      data => {
        this.cmbUserData = data;

        setTimeout(() => { this.commission.preparedBy = defaultValue.preparedBy; }, 100);
        setTimeout(() => { this.commission.checkedBy = defaultValue.checkedBy; }, 100);
        setTimeout(() => { this.commission.approvedBy = defaultValue.approvedBy; }, 100);
      }
    );
  }

  // ======
  // events
  // ======

  // detail operations
  public btnSaveCommissionClick() : void {
    let btnSaveCommission: Element = document.getElementById("btnSaveCommission");

    btnSaveCommission.setAttribute("disabled","disabled");
    btnSaveCommission.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    
    this.commissionService.saveCommission(this.commission);
    this.commissionSavedSub =  this.commissionService.commissionSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveCommission.removeAttribute("disabled");
              btnSaveCommission.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveCommission.removeAttribute("disabled");
              btnSaveCommission.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          }
      }
    );
  }
  public btnLockCommissionClick() : void {
    let btnLockCommission: Element = document.getElementById("btnLockCommission");

    btnLockCommission.setAttribute("disabled","disabled");
    btnLockCommission.innerHTML = "<i class='fa fa-plus fa-fw'></i> Locking...";

    this.commissionService.lockCommission(this.commission);
    this.commissionLockedSub =  this.commissionService.commissionLockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Locking successful.");
              this.commission.isLocked = true;
              btnLockCommission.removeAttribute("disabled");
              btnLockCommission.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          } else if(data == 0) {
              this.toastr.error("Locking failed.");   
              btnLockCommission.removeAttribute("disabled");
              btnLockCommission.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          }
      }
    );
  }
  public btnUnlockCommissionClick() : void {
    let btnUnlockCommission: Element = document.getElementById("btnUnlockCommission");

    btnUnlockCommission.setAttribute("disabled","disabled");
    btnUnlockCommission.innerHTML = "<i class='fa fa-plus fa-fw'></i> Unlocking...";

    this.commissionService.unlockCommission(this.commission);
    this.commissionUnlockedSub = this.commissionService.commissionUnlockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Unlocking successful.");
              this.commission.isLocked = false;
              btnUnlockCommission.removeAttribute("disabled");
              btnUnlockCommission.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          } else if(data == 0) {
              this.toastr.error("Unlocking failed.");   
              btnUnlockCommission.removeAttribute("disabled");
              btnUnlockCommission.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          }
      }
    );
  }
  public btnPrintCommissionClick() : void {
    this.toastr.success("Not yet implemented.");
  }


}