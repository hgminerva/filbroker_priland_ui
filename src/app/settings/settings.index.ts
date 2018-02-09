// angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// wijmo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// service(s)
import { SettingsService } from './settings.service';
import { SecurityService } from '../security/security.service';

// model(s)
import { SysSettings } from '../model/model.sys.settings';
import { SysDropDown } from '../model/model.sys.dropDown';

@Component({
  templateUrl: './settings.index.html'
})
export class SettingsIndex {

  // ==================
  // private properties
  // ==================

  // detail
  private settingsSub : any;

  // detail operations
  private settingsSavedSub : any;

  // detail combo boxes
  private usersSub : any;

  // detail line1 (drop downs)
  private dropDownsSub : any;

  // detail line1 (drop downs) operations
  private dropDownsDeletedSub : any;
  private dropDownsSavedSub : any;

  // =================
  // public properties
  // =================

  public title: string = 'Settings';

  // combo boxes data
  public cmbUsersData : ObservableArray;
  public cmbDropDownTypeData: ObservableArray;

  // model(s)
  public settings : SysSettings = {
	id: 0,
	company: "",
	softwareVersion: "",
	softwareDeveloper: "",
	soldUnitCheckedBy: 0,
	soldUnitCheckedByUser: "",
	soldUnitApprovedBy: 0,
	soldUnitApprovedByUser: "",
	commissionRequestCheckedBy: 0,
	commissionRequestCheckedByUser: "",
	commissionRequestApprovedBy: 0,
	commissionRequestApprovedByUser: "",
	proposalFootNote: "",
	brokerFootNote: ""
  };
  public dropDown: SysDropDown = {
    id: 0,
    category: "",
    description: "",
    value: ""
  };

  // detail line1 (drop downs) list
  public fgdDropDownsData : ObservableArray;
  public fgdDropDownsCollection : CollectionView;

  // modal(s)
  public mdlDropDownDeleteShow : boolean = false;
  public mdlDropDownEditShow : boolean = false;

  // =======
  // angular
  // =======

  // constructor
  constructor(
    private settingsService: SettingsService,
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
    this.fgdDropDownsData = new ObservableArray();
    this.fgdDropDownsCollection = new CollectionView(this.fgdDropDownsData);
    if(this.securityService.openPage("SETTINGS") == true) {
      this.getSettings();
    } else {
      this.toastr.error("No rights to open page.")
      setTimeout(() => { this.location.back(); }, 1000);  
    } 
  }
  ngOnDestroy() {
    if( this.settingsSub != null) this.settingsSub.unsubscribe();
    if( this.settingsSavedSub != null) this.settingsSavedSub.unsubscribe();
    if( this.usersSub != null) this.usersSub.unsubscribe();
    if( this.dropDownsSub != null) this.dropDownsSub.unsubscribe();
    if( this.dropDownsDeletedSub != null) this.dropDownsDeletedSub.unsubscribe();
    if( this.dropDownsSavedSub != null) this.dropDownsSavedSub.unsubscribe();
  }

  // ===============
  // private methods
  // ===============

  private getIdParameter() : number {
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
  public getSettings() {
    this.settingsService.getSettings();
    this.settingsSub = this.settingsService.settingsObservable
      .subscribe(
          data => {
            this.settings.id = data.id;
            this.settings.company = data.company;
            this.settings.softwareVersion = data.softwareVersion;
            this.settings.softwareDeveloper = data.softwareDeveloper;
            this.settings.soldUnitCheckedBy = data.soldUnitCheckedBy;
            this.settings.soldUnitApprovedBy = data.soldUnitApprovedBy;
            this.settings.commissionRequestCheckedBy = data.commissionRequestCheckedBy;
            this.settings.commissionRequestApprovedBy = data.commissionRequestApprovedBy;
            this.settings.proposalFootNote = data.proposalFootNote;
            this.settings.brokerFootNote = data.brokerFootNote;

            this.getUsers(data);
            this.getDropDowns();
          }
      );
  }
  
  // detail comboxes
  public getUsers(defaultValue : any) : void {
    this.settingsService.getUsers();
    this.usersSub = this.settingsService.usersObservable.subscribe(
      data => {
        let users = new ObservableArray();
        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            users.push({
              id: data[i].id,
              username: data[i].username,
              fullName: data[i].fullName,
              password: data[i].password,
              status: data[i].status,
              aspNet: data[i].aspNetId
            });
          }
        }
        this.cmbUsersData = users;

        setTimeout(() => { this.settings.soldUnitCheckedBy = defaultValue.soldUnitCheckedBy; }, 100);
        setTimeout(() => { this.settings.soldUnitApprovedBy = defaultValue.soldUnitApprovedBy; }, 100);
        setTimeout(() => { this.settings.commissionRequestCheckedBy = defaultValue.commissionRequestCheckedBy; }, 100);
        setTimeout(() => { this.settings.commissionRequestApprovedBy = defaultValue.commissionRequestApprovedBy; }, 100);
      }
    );
  }

  // detail line1 (drop downs)
  public getDropDowns() : void {
    this.settingsService.getDropDowns();

    this.dropDownsSub = this.settingsService.dropDownsObservable.subscribe(
      data => {
        this.fgdDropDownsData = data;
        this.fgdDropDownsCollection = new CollectionView(this.fgdDropDownsData);
        this.fgdDropDownsCollection.pageSize = 15;
        this.fgdDropDownsCollection.trackChanges = true;  
      }
    );
  }


  // ======
  // events
  // ======

  // detail operations
  public btnSaveSettingsClick() : void {
    let btnSaveSettings:Element = document.getElementById("btnSaveSettings");

    btnSaveSettings.setAttribute("disabled","disabled");
    btnSaveSettings.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    
    this.settingsService.saveSettings(this.settings);
    this.settingsSub =  this.settingsService.settingsSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveSettings.removeAttribute("disabled");
              btnSaveSettings.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveSettings.removeAttribute("disabled");
              btnSaveSettings.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          }
      }
    );
  }

  // detail line1 (drop downs) list operations
  public btnAddDropDownClick() : void {
    this.dropDown.id = 0;
    this.dropDown.category = "";
    this.dropDown.description = "";
    this.dropDown.value = "";

    this.mdlDropDownEditShow = true
  }
  public btnEditDropDownClick() : void {
    let selectedDropDown = this.fgdDropDownsCollection.currentItem;

    this.dropDown.id = selectedDropDown.id;
    this.dropDown.category = selectedDropDown.category;
    this.dropDown.description = selectedDropDown.description;
    this.dropDown.value = selectedDropDown.value;

    this.mdlDropDownEditShow = true
  }
  public btnDeleteDropDownClick() : void {
    this.mdlDropDownDeleteShow = true;
  }

  // detail line1 (drop down) delete modal operations
  public btnOkDropDownDeleteModalClick() : void {
    let btnOkDropDownDeleteModal: Element = document.getElementById("btnOkDropDownDeleteModal");
    let btnCloseDropDownDeleteModal: Element = document.getElementById("btnCloseDropDownDeleteModal");

    btnOkDropDownDeleteModal.setAttribute("disabled","disabled");
    btnCloseDropDownDeleteModal.setAttribute("disabled","disabled");

    let selectedDropDown = this.fgdDropDownsCollection.currentItem;

    this.settingsService.deleteDropDowns(selectedDropDown.id);

    this.dropDownsDeletedSub = this.settingsService.dropDownsDeletedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Delete successful.");
          this.fgdDropDownsCollection.remove​(selectedDropDown);
          
          btnOkDropDownDeleteModal.removeAttribute("disabled");
          btnCloseDropDownDeleteModal.removeAttribute("disabled");

          this.mdlDropDownDeleteShow = false; 
        } else if (data == 0) {
          this.toastr.error("Delete failed.");

          btnOkDropDownDeleteModal.removeAttribute("disabled");
          btnCloseDropDownDeleteModal.removeAttribute("disabled");
        }
      }
    );
  }
  public btnCloseDropDownDeleteModalClick() : void {
    this.mdlDropDownDeleteShow = false;
  }

  // detail line1 (user rights) edit modal operations
  public btnSaveDropDownEditModalClick() : void {
    let btnSaveDropDownEditModal:Element = document.getElementById("btnSaveDropDownEditModal");
    let btnCloseDropDownEditModal:Element = document.getElementById("btnCloseDrownDownEditModal");

    btnSaveDropDownEditModal.setAttribute("disabled","disabled");
    btnSaveDropDownEditModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    btnCloseDropDownEditModal.setAttribute("disabled","disabled");

    this.settingsService.saveDropDowns(this.dropDown);
    this.dropDownsSavedSub =  this.settingsService.dropDownsSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveDropDownEditModal.removeAttribute("disabled");
              btnSaveDropDownEditModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
              btnCloseDropDownEditModal.removeAttribute("disabled");

              this.mdlDropDownEditShow = false;
              this.getDropDowns();
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveDropDownEditModal.removeAttribute("disabled");
              btnSaveDropDownEditModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
              btnCloseDropDownEditModal.removeAttribute("disabled");
          }
      }
    );
  }
  public btnCloseDrownDownEditModalClick() : void {
    this.mdlDropDownEditShow = false;
  }
}