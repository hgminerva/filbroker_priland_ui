// Angular
import { Component,ViewContainerRef,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SoldUnitService } from './soldUnit.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Message box 
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { TrnSoldUnit } from '../model/model.trn.soldUnit';

@Component({
  templateUrl: './soldUnit.list.html'
})
export class SoldUnitList {
  // private properties
  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  private soldUnitsSub : any;
  private soldUnitDeletedSub : any;

  // public properties
  public title = 'Sold Unit List';

  public soldUnit : TrnSoldUnit = {
    id: 0,
    soldUnitNumber: "",
    soldUnitDate: "",
    projectId: 0,
    project: "",
    unitId: 0,
    unit: "",
    customerId: 0,
    customer: "",
    brokerId: 0,
    broker: "",
    checklistId: 0,
    checklist: "",
    price: 0,
    totalInvestment: "",
    paymentOptions: "",
    financing: "",
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
    updatedDateTime: this.currentDateString,
  };

  public fgdSoldUnitData : ObservableArray;
  public fgdSoldUnitCollection : CollectionView;

  public calDateStartData = new Date();
  public calDateEndData = new Date();

  // constructor
  constructor(
    private soldUnitService : SoldUnitService,
    private toastr : ToastsManager,
    private viewContainer : ViewContainerRef,
    private router : Router
) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.fgdSoldUnitData = new ObservableArray();
    this.fgdSoldUnitCollection = new CollectionView(this.fgdSoldUnitData);

    this.getSoldUnits();
  }

  ngOnDestroy() {
    if( this.soldUnitsSub != null) this.soldUnitsSub.unsubscribe();
    if( this.soldUnitDeletedSub != null) this.soldUnitDeletedSub.unsubscribe();
  }

  // public methods
  public getSoldUnits() : void {
    let dateStart = [this.calDateStartData.getFullYear(), this.calDateStartData.getMonth() + 1, this.calDateStartData.getDate()].join('-');
    let dateEnd = [this.calDateEndData.getFullYear(), this.calDateEndData.getMonth() + 1, this.calDateEndData.getDate()].join('-');
    let soldUnits = new ObservableArray();

    this.soldUnitService.getSoldUnitsPerDates(dateStart,dateEnd);

    this.soldUnitsSub = this.soldUnitService.soldUnitsObservable.subscribe(
      data => {
        this.fgdSoldUnitData = data;
        this.fgdSoldUnitCollection = new CollectionView(this.fgdSoldUnitData);
        this.fgdSoldUnitCollection.pageSize = 15;
        this.fgdSoldUnitCollection.trackChanges = true;  
      }
    );
  }

  // events
  public btnEditSoldUnitClick() : void {
    let selectedSoldUnit = this.fgdSoldUnitCollection.currentItem;
    this.router.navigate(['/soldUnit', selectedSoldUnit.id]);
  }
}