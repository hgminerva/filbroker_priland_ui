// angular
import { Component,ViewContainerRef,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// services
import { UnitService } from './unit.service';
import { SecurityService } from '../security/security.service';

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
  private unitUpdatePriceSub : any;

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
    updatedDateTime: this.currentDateString,
    customer: ""
  };

  // combo boxes data
  public cmbProjectsData : ObservableArray;

  // combo boxes element (if there are events)
  @ViewChild("cmbProjects")
  public cmbProjects:ElementRef;

  // unit list data source
  public fgdUnitsData : ObservableArray;
  public fgdUnitsCollection : CollectionView;

  // unit prices (for bulk price update)
  public fgdUnitPricesData : ObservableArray;
  public fgdUnitPricesCollection : CollectionView;

  // modals
  public mdlUnitDeleteShow : boolean = false;
  public mdlChangeBulkUnitPriceShow : boolean = false;

  public btnUploadCSVFileHide : boolean = false;

  // =======
  // angular
  // =======

  // constructor
  constructor(
      private unitService : UnitService,
      private toastr : ToastsManager,
      private viewContainer : ViewContainerRef,
      private router : Router,
      private securityService: SecurityService,
      private location: Location
  ) {
      this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.fgdUnitsData = new ObservableArray();
    this.fgdUnitsCollection = new CollectionView(this.fgdUnitsData);

    this.fgdUnitPricesData = new ObservableArray();
    this.fgdUnitPricesCollection = new CollectionView(this.fgdUnitPricesData);
    
    if(this.securityService.openPage("UNIT LIST") == true) {
      this.getProjects(); 
    } else {
      this.toastr.error("No rights to open page.")
      setTimeout(() => { this.location.back(); }, 1000);  
    } 
  }
  ngOnDestroy() {
    if( this.unitsSub != null) this.unitsSub.unsubscribe();
    if( this.projectsSub != null) this.projectsSub.unsubscribe();

    if( this.unitDeletedSub != null) this.unitDeletedSub.unsubscribe();
    if( this.unitUpdatePriceSub != null) this.unitUpdatePriceSub.unsubscribe();
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
  public btnCSVUnitClick() : void {
    var data = 'Unit Inventory Report' + '\r\n\n';
    var collection = this.fgdUnitsCollection;
    var fileName = "unit-inventory.csv";

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

    var csvData = new Blob([data], {type: 'text/csv;charset=utf-8;'});
    var csvURL = window.URL.createObjectURL(csvData);
    var tempLink = document.createElement('a');

    tempLink.href = csvURL;
    tempLink.setAttribute('download', fileName);
    tempLink.click();
  }
  public btnChangePriceUnitClick() : void {
    this.mdlChangeBulkUnitPriceShow = true;
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

  // change price in bulk
  public btnUploadCSVFileClick(e: Event) : void {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    if(target.files.length > 0) {
      var r = new FileReader();
      r.readAsText(target.files[0]);
      r.onload = (e) => {
          let csv: string = r.result;
          var csvLines = csv.split(/\r\n|\n/);
          var csvData = new ObservableArray();

          for ( var i = 0; i < csvLines.length; i++) {
            var data = csvLines[i].split(",");
            if(data[0] != "") {
              csvData.push({
                unit: data[0].replace(/\"/gi,''),
                price: Number(data[1].replace(/\"/gi,''))
              });
           }
          }

          this.fgdUnitPricesData = csvData;
          this.fgdUnitPricesCollection = new CollectionView(this.fgdUnitPricesData);
          this.fgdUnitPricesCollection.pageSize = 15;
          this.fgdUnitPricesCollection.trackChanges = true;  
       }
    };
  }
  public btnOkChangeBulkUnitPriceModalClick() : void {

    if(this.fgdUnitPricesData.length > 0) {
      let btnOkChangeBulkUnitPriceModal:Element = document.getElementById("btnOkChangeBulkUnitPriceModal");
      let btnCloseChangeBulkUnitPriceModal:Element = document.getElementById("btnCloseChangeBulkUnitPriceModal");

      btnOkChangeBulkUnitPriceModal.setAttribute("disabled","disabled");
      btnCloseChangeBulkUnitPriceModal.setAttribute("disabled","disabled");
      this.btnUploadCSVFileHide= true;

      let counter = 1;
      for(var i=0; i<this.fgdUnitPricesData.length; i++) {
        this.unitService.updateUnitPrices(this.unit.projectId,this.fgdUnitPricesData[i].unit,this.fgdUnitPricesData[i].price);
        this.unitUpdatePriceSub = this.unitService.unitUpdatePriceObservable.subscribe(
            data => {
                if(data == 1) {
                    this.toastr.success("Price Update successful.");
                } else if(data == 0) {
                    this.toastr.error("Price Update failed.");   
                }
                counter++;
                if(counter == this.fgdUnitPricesData.length) {
                  btnOkChangeBulkUnitPriceModal.removeAttribute("disabled");
                  btnCloseChangeBulkUnitPriceModal.removeAttribute("disabled");
                  this.btnUploadCSVFileHide= false;
                }
            }
        );
      }
    }
  }
  public btnCloseChangeBulkUnitPriceModalClick() : void {
    this.mdlChangeBulkUnitPriceShow = false;

    this.fgdUnitPricesData = new ObservableArray();
    this.fgdUnitPricesCollection = new CollectionView(this.fgdUnitPricesData);
  }
}