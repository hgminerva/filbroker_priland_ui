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
  private checklistRequirementsSub : any;
  private sendEmailSub : any;

  // =================
  // public properties
  // =================

  public title: string = 'Reports';
  public filterReport: string;

  public fgdSoldUnitsData : ObservableArray;
  public fgdSoldUnitsCollection : CollectionView;
  
  public fgdRequirementActivitiesData : ObservableArray;
  public fgdRequirementActivitiesCollection : CollectionView;

  public fgdChecklistRequirementsData : ObservableArray;
  public fgdChecklistRequirementsCollection : CollectionView;

  public fgdCommissionRequestsData : ObservableArray;
  public fgdCommissionRequestsCollection : CollectionView;

  public tabDetail1 = new Array(true, false, false, false);

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
    if( this.checklistRequirementsSub != null) this.checklistRequirementsSub.unsubscribe();
    if( this.sendEmailSub != null) this.sendEmailSub.unsubscribe();
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
    this.getChecklistRequirements(dateStart,dateEnd);
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
  public getChecklistRequirements(dateStart: string, dateEnd: string) : void {
    this.reportsService.getSoldUnitChecklistSummary(dateStart,dateEnd);

    this.checklistRequirementsSub = this.reportsService.soldUnitChecklistRequirementObservable.subscribe(
      data => {
        this.fgdChecklistRequirementsData = data;
        this.fgdChecklistRequirementsCollection = new CollectionView(this.fgdChecklistRequirementsData);
        this.fgdChecklistRequirementsCollection.pageSize = 15;
        this.fgdChecklistRequirementsCollection.trackChanges = true;  
      }
    );
  }

  // ======
  // events
  // ======

  // report activity
  public generateCSV() : Blob {
    var data = "";
    var collection;
    var fileName = "";

    if(this.tabDetail1[0] == true) {
      data = 'Sold Unit Summary Report' + '\r\n\n';
      collection = this.fgdSoldUnitsCollection;
      fileName = "report-soldUnit.csv";
    } else if(this.tabDetail1[1] == true) {
      data = 'Sold Unit Checklist Requirement Report' + '\r\n\n';
      collection = this.fgdChecklistRequirementsCollection;
      fileName = "report-soldUnitChecklist.csv";
    } else if(this.tabDetail1[2] == true) {
      data = 'Sold Unit Checklist Requirement Activity Report' + '\r\n\n';
      collection = this.fgdRequirementActivitiesCollection;
      fileName = "report-soldUnitChecklistActivities.csv";
    } else if(this.tabDetail1[3] == true) {
      data = 'Commission Request Summary Report' + '\r\n\n';
      collection = this.fgdCommissionRequestsCollection;
      fileName = "report-commissionRequest.csv";
    }

    if(data != "")  {
      var label = '';
      for (var s in collection.items[0]) {
        label += s + ',';
      }
      label = label.slice(0, -1);

      data +=  label + '\r\n';

      collection.moveToFirstPage();
      for (var p = 0; p < collection.pageCount; p++) {
        for (var i = 0; i < collection.items.length; i++) {
          var row = '';
          for (var s in collection.items[i]) {
            row += '"' + collection.items[i][s] + '",';
          }
          row.slice(0, row.length - 1);
          data += row + '\r\n';
        }
        collection.moveToNextPage();
      }
    }

    return new Blob([data], {type: 'text/csv;charset=utf-8;'});
  }
  public btnCSVReportClick() : void {
    var fileName = "";

    if(this.tabDetail1[0] == true) {
      fileName = "report-soldUnit.csv";
    } else if(this.tabDetail1[1] == true) {
      fileName = "report-soldUnitChecklist.csv";
    } else if(this.tabDetail1[2] == true) {
      fileName = "report-soldUnitChecklistActivities.csv";
    } else if(this.tabDetail1[3] == true) {
      fileName = "report-commissionRequest.csv";
    }

    var csvData = this.generateCSV();
    var csvURL = window.URL.createObjectURL(csvData);
    var tempLink = document.createElement('a');

    tempLink.href = csvURL;
    tempLink.setAttribute('download', fileName);
    tempLink.click();
  }
  public btnEmailReportClick() : void {
    var csvData = this.generateCSV();
    var fileName = "";

    if(this.tabDetail1[0] == true) {
      fileName = "report-soldUnit.csv";
    } else if(this.tabDetail1[1] == true) {
      fileName = "report-soldUnitChecklist.csv";
    } else if(this.tabDetail1[2] == true) {
      fileName = "report-soldUnitChecklistActivities.csv";
    } else if(this.tabDetail1[3] == true) {
      fileName = "report-commissionRequest.csv";
    }

    this.reportsService.sendEmail(csvData,fileName);

    this.sendEmailSub = this.reportsService.sendEmailObservable.subscribe(
      data => {
        if(data == 1) {
          this.toastr.success("Email sent.");
        } else {
          this.toastr.error("Error sending email.");
        }
      }
    );
  }

  // detail tab index click
  public tabDetail1Click(index: number) : void {
    let dateStart : string = [this.calDateStartData.getFullYear(), this.calDateStartData.getMonth() + 1, this.calDateStartData.getDate()].join('-');
    let dateEnd : string = [this.calDateEndData.getFullYear(), this.calDateEndData.getMonth() + 1, this.calDateEndData.getDate()].join('-');

    for (var i = 0; i <= this.tabDetail1.length - 1; i++) {
      if(index == i) this.tabDetail1[i] = true;
      else this.tabDetail1[i] = false;
    }

    if(index==0) this.getUnitSolds(dateStart,dateEnd);
    if(index==1) this.getChecklistRequirements(dateStart,dateEnd);
    if(index==2) this.getRequirementActivities(dateStart,dateEnd);
    if(index==3) this.getCommissionRequests(dateStart,dateEnd);
  }
}