// Angular
import { Component,ViewContainerRef,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { CommissionService } from './commission.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Message box 
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { TrnCommissionRequest } from '../model/model.trn.commissionRequest';

@Component({
  templateUrl: './commission.list.html'
})
export class CommissionList {
  // private properties
  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  private commissionsSub : any;
  private commissionDeletedSub : any;

  // public properties
  public title = 'Commission Request List';

  public commission : TrnCommissionRequest = {
    id: 0,
    commissionRequestNumber: "",
    commissionRequestDate: "",
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
    createdBy: 1,
    createdDateTime: this.currentDateString,
    updatedBy: 1,
    updatedDateTime: this.currentDateString
  };

  public fgdCommissionData : ObservableArray;
  public fgdCommissionCollection : CollectionView;

  public calDateStartData = new Date();
  public calDateEndData = new Date();

  // constructor
  constructor(
    private commissionService : CommissionService,
    private toastr : ToastsManager,
    private viewContainer : ViewContainerRef,
    private router : Router
) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.fgdCommissionData = new ObservableArray();
    this.fgdCommissionCollection = new CollectionView(this.fgdCommissionData);

    this.getCommissions();
  }

  ngOnDestroy() {
    if( this.commissionsSub != null) this.commissionsSub.unsubscribe();
    if( this.commissionDeletedSub != null) this.commissionDeletedSub.unsubscribe();
  }

  // public methods
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

  // events
  public btnEditCommissionClick() : void {
    let selectedCommission = this.fgdCommissionCollection.currentItem;
    this.router.navigate(['/commission', selectedCommission.id]);
  }

}