// angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// wijmo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// services
import { ReportsService } from './reports.service';
import { SecurityService } from '../security/security.service';

@Component({
  templateUrl: './reports.index.html'
})
export class ReportsIndex {

  // ==================
  // private properties
  // ==================

  private soldUnitsSub : any;
  private commissionRequestsSub : any;
  private requirementActivitiesSub : any;

  // =================
  // public properties
  // =================

  public title: string = 'Reports';
  public filterReport: string;

  public fgdSoldUnitsData : ObservableArray;
  public fgdSoldUnitsCollection : CollectionView;

  public fgdCommissionRequestsData : ObservableArray;
  public fgdCommissionRequestsCollection : CollectionView;

  public fgdRequirementActivitiesData : ObservableArray;
  public fgdRequirementActivitiesCollection : CollectionView;

  public tabDetail1 = new Array(true, false, false);

  // filters
  public calDateStartData = new Date();
  public calDateEndData = new Date();

  // =======
  // angular
  // =======

  // constructor
  constructor(
    private reportsService: ReportsService,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private router: Router,
    private securityService: SecurityService,
    private location: Location
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.fgdSoldUnitsData = new ObservableArray();
    this.fgdSoldUnitsCollection = new CollectionView(this.fgdSoldUnitsData);

    this.fgdCommissionRequestsData = new ObservableArray();
    this.fgdCommissionRequestsCollection = new CollectionView(this.fgdCommissionRequestsData);

    this.fgdRequirementActivitiesData = new ObservableArray();
    this.fgdRequirementActivitiesCollection = new CollectionView(this.fgdRequirementActivitiesData);

    if(this.securityService.openPage("REPORTS") == true) {
      this.getReports();
    } else {
      this.toastr.error("No rights to open page.")
      setTimeout(() => { this.location.back(); }, 1000);  
    } 
  }
  ngOnDestroy() {
    if( this.soldUnitsSub != null) this.soldUnitsSub.unsubscribe();
    if( this.commissionRequestsSub != null) this.commissionRequestsSub.unsubscribe();
    if( this.requirementActivitiesSub != null) this.requirementActivitiesSub.unsubscribe();
  }

  // ==============
  // public methods
  // ==============

  public getReports() : void {
    let dateStart : string = [this.calDateStartData.getFullYear(), this.calDateStartData.getMonth() + 1, this.calDateStartData.getDate()].join('-');
    let dateEnd : string = [this.calDateEndData.getFullYear(), this.calDateEndData.getMonth() + 1, this.calDateEndData.getDate()].join('-');

    this.getUnitSolds(dateStart,dateEnd);
    this.getCommissionRequests(dateStart,dateEnd);
    this.getRequirementActivities(dateStart,dateEnd);
  }

  public getUnitSolds(dateStart: string, dateEnd: string) : void {
    this.reportsService.getSoldUnitSummary(dateStart,dateEnd);

    this.soldUnitsSub = this.reportsService.soldUnitsObservable.subscribe(
      data => {
        this.fgdSoldUnitsData = data;
        this.fgdSoldUnitsCollection = new CollectionView(this.fgdSoldUnitsData);
        this.fgdSoldUnitsCollection.pageSize = 15;
        this.fgdSoldUnitsCollection.trackChanges = true;  
      }
    );
  }
  public getCommissionRequests(dateStart: string, dateEnd: string) : void {
    this.reportsService.getCommissionRequestSummary(dateStart,dateEnd);

    this.commissionRequestsSub = this.reportsService.commissionRequestsObservable.subscribe(
      data => {
        this.fgdCommissionRequestsData = data;
        this.fgdCommissionRequestsCollection = new CollectionView(this.fgdCommissionRequestsData);
        this.fgdCommissionRequestsCollection.pageSize = 15;
        this.fgdCommissionRequestsCollection.trackChanges = true;  
      }
    );
  }
  public getRequirementActivities(dateStart: string, dateEnd: string) : void {
    this.reportsService.getSoldUnitRequirementActivitySummary(dateStart,dateEnd);

    this.requirementActivitiesSub = this.reportsService.soldUnitRequirementActivitiesObservable.subscribe(
      data => {
        this.fgdRequirementActivitiesData = data;
        this.fgdRequirementActivitiesCollection = new CollectionView(this.fgdRequirementActivitiesData);
        this.fgdRequirementActivitiesCollection.pageSize = 15;
        this.fgdRequirementActivitiesCollection.trackChanges = true;  
      }
    );
  }

  // ======
  // events
  // ======

  // detail tab index click
  public tabDetail1Click(index: number) {
    let dateStart : string = [this.calDateStartData.getFullYear(), this.calDateStartData.getMonth() + 1, this.calDateStartData.getDate()].join('-');
    let dateEnd : string = [this.calDateEndData.getFullYear(), this.calDateEndData.getMonth() + 1, this.calDateEndData.getDate()].join('-');

    for (var i = 0; i <= this.tabDetail1.length - 1; i++) {
      if(index==i) this.tabDetail1[i] = true;
      else this.tabDetail1[i] = false;
    }

    if(index==0) this.getUnitSolds(dateStart,dateEnd);
    if(index==1) this.getCommissionRequests(dateStart,dateEnd);
    if(index==2) this.getRequirementActivities(dateStart,dateEnd);
  }
}