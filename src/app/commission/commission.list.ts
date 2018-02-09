// angular
import { Component,ViewContainerRef,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
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
  templateUrl: './commission.list.html'
})
export class CommissionList {

  // ==================
  // private properties
  // ==================

  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  // list
  private commissionsSub : any;

  // list operations
  private commissionsDeletedSub : any;

  // =================
  // public properties
  // =================

  public title : string = 'Commission Request List';
  public filterCommission: string;

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

  // list grid data source
  public fgdCommissionData : ObservableArray;
  public fgdCommissionCollection : CollectionView;

  // filters
  public calDateStartData = new Date();
  public calDateEndData = new Date();

  // modals
  public mdlCommissionDeleteShow: boolean = false;

  // =======
  // angular
  // =======

  // constructor
  constructor(
    private commissionService : CommissionService,
    private toastr : ToastsManager,
    private viewContainer : ViewContainerRef,
    private router : Router,
    private securityService: SecurityService,
    private location: Location) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.fgdCommissionData = new ObservableArray();
    this.fgdCommissionCollection = new CollectionView(this.fgdCommissionData);

    if(this.securityService.openPage("COMMISSION LIST") == true) {
      this.getCommissions();
    } else {
      this.toastr.error("No rights to open page.")
      setTimeout(() => { this.location.back(); }, 1000);  
    }
  }
  ngOnDestroy() {
    if( this.commissionsSub != null) this.commissionsSub.unsubscribe();
    if( this.commissionsDeletedSub != null) this.commissionsDeletedSub.unsubscribe();
  }

  // ==============
  // public methods
  // ==============

  public getCommissions() : void {
    let dateStart = [this.calDateStartData.getFullYear(), this.calDateStartData.getMonth() + 1, this.calDateStartData.getDate()].join('-');
    let dateEnd = [this.calDateEndData.getFullYear(), this.calDateEndData.getMonth() + 1, this.calDateEndData.getDate()].join('-');
    let soldUnits = new ObservableArray();

    this.commissionService.getCommissionsPerDates(dateStart,dateEnd);

    this.commissionsSub = this.commissionService.commissionsObservable.subscribe(
      data => {
        this.fgdCommissionData = data;
        this.fgdCommissionCollection = new CollectionView(this.fgdCommissionData);
        this.fgdCommissionCollection.pageSize = 15;
        this.fgdCommissionCollection.trackChanges = true;  
      }
    );
  }

  // ======
  // events
  // ======

  // list operations
  public btnAddCommissionClick() : void {
    let btnAddCommission: Element = document.getElementById("btnAddCommission");

    btnAddCommission.setAttribute("disabled","true");
    btnAddCommission.innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";

    this.commissionService.addCommission(this.commission, btnAddCommission);
  }
  public btnEditCommissionClick() : void {
    let selectedCommission = this.fgdCommissionCollection.currentItem;
    this.router.navigate(['/commission', selectedCommission.id]);
  }
  public btnDeleteCommissionClick() : void {
    this.mdlCommissionDeleteShow = true;
  }

  // delete modal events
  public btnOkCommissionDeleteModalClick() : void {
    let btnOkCommissionDeleteModal:Element = document.getElementById("btnOkCommissionDeleteModal");
    let btnCloseCommissionDeleteModal:Element = document.getElementById("btnCloseCommissionDeleteModal");

    let selectedCommission = this.fgdCommissionCollection.currentItem;

    btnOkCommissionDeleteModal.setAttribute("disabled","disabled");
    btnCloseCommissionDeleteModal.setAttribute("disabled","disabled");

    this.commissionService.deleteCommission(selectedCommission.id,);
    this.commissionsDeletedSub = this.commissionService.commissionDeletedObservable.subscribe(
        data => {
            if(data == 1) {
                this.toastr.success("Delete successful.");
                this.fgdCommissionCollection.remove​(selectedCommission);

                btnOkCommissionDeleteModal.removeAttribute("disabled");
                btnCloseCommissionDeleteModal.removeAttribute("disabled");

                this.mdlCommissionDeleteShow = false
            } else if(data == 0) {
                this.toastr.error("Delete failed.");   

                btnOkCommissionDeleteModal.removeAttribute("disabled");
                btnCloseCommissionDeleteModal.removeAttribute("disabled");
            }
        }
    );
  }
  public btnCloseCommissionDeleteModalClick() : void {
    this.mdlCommissionDeleteShow = false;
  }

}