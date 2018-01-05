// Angular
import { Component, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { SoldUnitService } from './soldUnit.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Message Box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { TrnSoldUnit } from '../model/model.trn.soldUnit';
import { TrnSoldUnitRequirement } from '../model/model.trn.soldUnit.requirement';
import { TrnSoldUnitRequirementActivity } from '../model/model.trn.soldUnit.requirement.activity';

@Component({
  templateUrl: './soldUnit.detail.html',
  styleUrls: ['./soldUnit.style.css'],
})
export class SoldUnitDetail {

  // ==================
  // private properties
  // ==================

  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  // detail and event async subscriptions (must be unsubscribe upon destruction)
  private soldUnitSub : any;
  private soldUnitSavedSub : any;
  private soldUnitLockedSub : any;
  private soldUnitUnlockedSub : any;

  private soldUnitRequirementsSub : any;
  private soldUnitRequirementActivitiesSub : any;

  private soldUnitRequirementSavedSub : any
  private soldUnitRequirementActivitySavedSub : any;

  // combobox async subscriptions (must be unsubscribe upon destruction)
  private cmbProjectsSub : any;
  private cmbUnitsSub : any;
  private cmbChecklistsSub : any;
  private cmbCustomersSub : any;
  private cmbBrokersSub : any;
  private cmbUsersSub : any;

  private cmbUnitSoldRequirementStatusSub : any;
  private soldUnitRequirementActivityDeleteSub : any;
  
  // =================
  // public properties
  // =================

  public title = 'Sold Unit Detail';

  // detail model
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

  // detail item 1 model
  public soldUnitRequirement : TrnSoldUnitRequirement = {
    id: 0,
    soldUnitId: 0,
    checklistRequirementId: 0,
    checklistRequirement: "",
    checklistRequirementNo: 0,
    checklistCategory: "",
    checklistType: "",
    checklistWithAttachments: false,
    attachment1: "",
    attachment2: "",
    attachment3: "",
    attachment4: "",
    attachment5: "",
    remarks: "",
    status: "NOT OK",
    statusDate: this.currentDateString
  };

   // detail item 1 sub item 1 model
  public soldUnitRequirementActivity : TrnSoldUnitRequirementActivity = {
    id: 0,
    soldUnitRequirementId: 0,
    activityDate: this.currentDateString,
    activity: "",
    remarks: "",
    userId: 0,
    user: ""
  };

  // Combobox data
  public cmbProjectsData : ObservableArray;
  public cmbUnitsData : ObservableArray;
  public cmbChecklistsData : ObservableArray;
  public cmbCustomersData : ObservableArray;
  public cmbBrokersData : ObservableArray;
  public cmbUsersData : ObservableArray; //shared by cmbPreparedBy, cmbCheckedBy, cmbApprovedBy
  public cmbUnitSoldRequirementStatusData : ObservableArray;

  @ViewChild("cmbProjects")   public cmbProjects : ElementRef;
  @ViewChild("cmbUnits")      public cmbUnits : ElementRef;
  @ViewChild("cmbChecklists") public cmbChecklists : ElementRef;
  @ViewChild("cmbCustomers")  public cmbCustomers : ElementRef;
  @ViewChild("cmbBrokers")    public cmbBrokers : ElementRef;
  @ViewChild("cmbPreparedBy") public cmbPreparedBy : ElementRef;
  @ViewChild("cmbCheckedBy")  public cmbCheckedBy : ElementRef;
  @ViewChild("cmbApprovedBy") public cmbApprovedBy : ElementRef;

  @ViewChild("cmbUnitSoldRequirementStatus") public cmbUnitSoldRequirementStatus : ElementRef;

  // detail item grid
  public fgdSoldUnitRequirementsData : ObservableArray;
  public fgdSoldUnitRequirementsCollection : CollectionView;

  public fgdSoldUnitRequirementActivitiesData : ObservableArray;
  public fgdSoldUnitRequirementActivitiesCollection : CollectionView;

  // tab index
  public tabDetail1 = new Array(true, false, false, false);
  public tabDetail1Modal1 = new Array(true, false, false);

  // modal show flags
  public mdlSoldUnitRequirementsModalShow : boolean = false;
  public mdlEditSoldUnitRequirementModalShow : boolean = false;
  public mdlSoldUnitRequirementActivityModalShow : boolean = false;

  // ===========
  // constructor
  // ===========

  // there is only one constructor
  constructor(
    private soldUnitService: SoldUnitService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // =============================
  // ng - angular component events
  // =============================

  // upon init
  ngOnInit() {
    this.fgdSoldUnitRequirementsData = new ObservableArray();
    this.fgdSoldUnitRequirementsCollection = new CollectionView(this.fgdSoldUnitRequirementsData);

    this.fgdSoldUnitRequirementActivitiesData = new ObservableArray();
    this.fgdSoldUnitRequirementActivitiesCollection = new CollectionView(this.fgdSoldUnitRequirementActivitiesData);

    this.getSoldUnit(); 
  }

  // upon destruction (closing)
  ngOnDestroy() {
    if( this.soldUnitSub != null) this.soldUnitSub.unsubscribe();

    if( this.soldUnitSavedSub != null) this.soldUnitSavedSub.unsubscribe();
    if( this.soldUnitLockedSub != null) this.soldUnitLockedSub.unsubscribe();
    if( this.soldUnitUnlockedSub != null) this.soldUnitUnlockedSub.unsubscribe();

    if( this.soldUnitRequirementsSub != null) this.soldUnitRequirementsSub.unsubscribe();
    if( this.soldUnitRequirementActivitiesSub != null) this.soldUnitRequirementActivitiesSub.unsubscribe();

    if( this.cmbProjectsSub != null) this.cmbProjectsSub.unsubscribe();
    if( this.cmbUnitsSub != null) this.cmbUnitsSub.unsubscribe();
    if( this.cmbChecklistsSub != null) this.cmbChecklistsSub.unsubscribe();
    if( this.cmbCustomersSub != null) this.cmbCustomersSub.unsubscribe();
    if( this.cmbBrokersSub != null) this.cmbBrokersSub.unsubscribe();
  }

  // ===============
  // private methods
  // ===============

  // get url id parameter
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

  // get detail record
  public getSoldUnit() {
    this.soldUnitService.getSoldUnit(this.getIdParameter());

    this.soldUnitSub = this.soldUnitService.soldUnitObservable
      .subscribe(
        data => {
          this.soldUnit.id = data.id;
          this.soldUnit.soldUnitNumber = data.soldUnitNumber;
          this.soldUnit.soldUnitDate = data.soldUnitDate;
          this.soldUnit.projectId = data.projectId;
          this.soldUnit.project = data.project;
          this.soldUnit.unitId = data.unitId;
          this.soldUnit.unit = data.unit;
          this.soldUnit.customerId = data.customerId;
          this.soldUnit.customer = data.customer;
          this.soldUnit.brokerId = data.brokerId;
          this.soldUnit.broker = data.broker;
          this.soldUnit.checklistId = data.checklistId;
          this.soldUnit.checklist = data.checklist;
          this.soldUnit.price = data.price;
          this.soldUnit.totalInvestment = data.totalInvestment;
          this.soldUnit.paymentOptions = data.paymentOptions;
          this.soldUnit.financing = data.financing;
          this.soldUnit.remarks = data.remarks;
          this.soldUnit.preparedBy = data.preparedBy;
          this.soldUnit.preparedByUser = data.preparedByUser;
          this.soldUnit.checkedBy = data.checkedBy;
          this.soldUnit.checkedByUser = data.checkedByUser;
          this.soldUnit.approvedBy = data.approvedBy;
          this.soldUnit.approvedByUser = data.approvedByUser;
          this.soldUnit.status = data.status;
          this.soldUnit.isLocked = data.isLocked;
          this.soldUnit.createdBy = data.createdBy;
          this.soldUnit.createdDateTime = data.createdDateTime;
          this.soldUnit.updatedBy = data.updatedBy;
          this.soldUnit.updatedDateTime = data.updatedDateTime;

          this.getCmbProjects();
          this.getCmbCustomers();
          this.getCmbBrokers();
          this.getCmbUsers();

          this.getSoldUnitRequirements();
        }
      );
  }

  // fill cmbProjects with data
  public getCmbProjects() : void {
    this.soldUnitService.getProjects();

    this.cmbProjectsSub = this.soldUnitService.projectsObservable.subscribe(
      data => {
        this.cmbProjectsData = data;
      }
    );
  }

  // fill cmbUnits with data
  public getUnitsPerProjectId(projectId) : void {
    this.soldUnitService.getUnitsPerProject(this.soldUnit.projectId);

    this.cmbUnitsSub = this.soldUnitService.unitsObservable.subscribe(
      data => {
        this.cmbUnitsData = data;
      }
    );
  }

  // fill cmbChecklist with data
  public getChecklistsPerProjectId(projectId) : void {
    this.soldUnitService.getChecklistsPerProject(this.soldUnit.projectId);

    this.cmbChecklistsSub = this.soldUnitService.checklistsObservable.subscribe(
      data => {
        this.cmbChecklistsData = data;
      }
    );
  }

  // fill cmbCustomers with data
  public getCmbCustomers() : void {
    this.soldUnitService.getCustomers();

    this.cmbCustomersSub = this.soldUnitService.customersObservable.subscribe(
      data => {
        this.cmbCustomersData = data;
      }
    );
  }

  // fill cmbBrokers with data
  public getCmbBrokers() : void {
    this.soldUnitService.getBrokers();

    this.cmbBrokersSub = this.soldUnitService.brokersObservable.subscribe(
      data => {
        this.cmbBrokersData = data;
      }
    );
  }

  // fill cmbPreparedBy, cmbCheckedBy, cmbApprovedBy with data
  public getCmbUsers() : void {
    this.soldUnitService.getUsers();

    this.cmbUsersSub = this.soldUnitService.usersObservable.subscribe(
      data => {
        this.cmbUsersData = data;
      }
    );
  }

  // fill the detail checklist with new requirements (this will remove the existing requirements)
  public getNewSoldUnitRequirements() : void {
    this.soldUnitService.getNewSoldUnitRequirements(this.soldUnit.id,this.soldUnit.checklistId);

    this.soldUnitRequirementsSub = this.soldUnitService.soldUnitRequirementsSource.subscribe(
      data => {
        this.fgdSoldUnitRequirementsData = data;
        this.fgdSoldUnitRequirementsCollection = new CollectionView(this.fgdSoldUnitRequirementsData);
        this.fgdSoldUnitRequirementsCollection.pageSize = 15;
        this.fgdSoldUnitRequirementsCollection.trackChanges = true;  

        console.log(this.fgdSoldUnitRequirementsData);
      }
    );
  }

  // fill the detail checklist requirements
  public getSoldUnitRequirements() : void {
    this.soldUnitService.getSoldUnitRequirements(this.soldUnit.id);

    this.soldUnitRequirementsSub = this.soldUnitService.soldUnitRequirementsSource.subscribe(
      data => {
        this.fgdSoldUnitRequirementsData = data;
        this.fgdSoldUnitRequirementsCollection = new CollectionView(this.fgdSoldUnitRequirementsData);
        this.fgdSoldUnitRequirementsCollection.pageSize = 15;
        this.fgdSoldUnitRequirementsCollection.trackChanges = true;  

        console.log(this.fgdSoldUnitRequirementsData);
      }
    );
  }

  // fill cmbUnitSoldRequirementStatus with data
  public getCmbUnitSoldRequirementStatus() : void {
    this.soldUnitService.getDropDowns();

    this.cmbUnitSoldRequirementStatusSub = this.soldUnitService.dropDownsObservable.subscribe(
      data => {
        let soldUnitRequirementStatus = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "REQUIREMENT STATUS") {
              soldUnitRequirementStatus.push({
                id: data[i].Id,
                category: data[i].Category,
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }
        this.cmbUnitSoldRequirementStatusData = soldUnitRequirementStatus;

        setTimeout(() => {
          let selectedSoldUnitRequirement = this.fgdSoldUnitRequirementsCollection.currentItem;
          this.soldUnitRequirement.status = selectedSoldUnitRequirement.status;
        }, 100);

      }
    );     
  }

  // fill fgdSoldUnitRequirementActivities grid with data
  public getSoldUnitRequirementActivities() : void {
    this.soldUnitService.getSoldUnitRequirementActivities(this.soldUnitRequirement.id);

    this.soldUnitRequirementActivitiesSub = this.soldUnitService.soldUnitRequirementActivitiesSource.subscribe(
      data => {
        this.fgdSoldUnitRequirementActivitiesData = data;
        this.fgdSoldUnitRequirementActivitiesCollection = new CollectionView(this.fgdSoldUnitRequirementActivitiesData);
        this.fgdSoldUnitRequirementActivitiesCollection.pageSize = 15;
        this.fgdSoldUnitRequirementActivitiesCollection.trackChanges = true;  
      }
    );
  }

  // ======
  // events
  // ======

  // detail combo box changes
  public cmbProjectsChange() : void {
    let index = this.cmbProjects["selectedIndex"];
    let projectId = this.cmbProjectsData[index]["id"];
    let project = this.cmbProjectsData[index]["project"];

    this.soldUnit.projectId = projectId;
    this.soldUnit.project = project;

    this.getUnitsPerProjectId(projectId);
    this.getChecklistsPerProjectId(projectId);
  }
  public cmbUnitsChange() : void {
    let index = this.cmbUnits["selectedIndex"];
    let unitId = this.cmbUnitsData[index]["id"];
    let unit = this.cmbUnitsData[index]["unit"];

    this.soldUnit.unitId = unitId;
    this.soldUnit.unit = unit;
  }
  public cmbChecklistsChange() : void {
    let index = this.cmbChecklists["selectedIndex"];
    let checklistId = this.cmbChecklistsData[index]["id"];
    let checklist = this.cmbChecklistsData[index]["checklist"];

    this.soldUnit.checklistId = checklistId;
    this.soldUnit.checklist = checklist;
  }
  public cmbCustomersChange() : void {
    let index = this.cmbCustomers["selectedIndex"];
    let customerId = this.cmbCustomersData[index]["id"];
    let customer = this.cmbCustomersData[index]["fullName"];

    this.soldUnit.customerId = customerId;
    this.soldUnit.customer = customer;
  }
  public cmbBrokersChange() : void {
    let index = this.cmbBrokers["selectedIndex"];
    let brokerId = this.cmbBrokersData[index]["id"];
    let broker = this.cmbBrokersData[index]["fullName"];

    this.soldUnit.brokerId = brokerId;
    this.soldUnit.broker = broker;
  }
  public cmbPreparedByChange() : void {
    let index = this.cmbPreparedBy["selectedIndex"];
    let userId = this.cmbUsersData[index]["id"];
    let user = this.cmbUsersData[index]["fullName"];

    this.soldUnit.brokerId = userId;
    this.soldUnit.broker = user;
  }
  public cmbCheckedByChange() : void {
    let index = this.cmbCheckedBy["selectedIndex"];
    let userId = this.cmbUsersData[index]["id"];
    let user = this.cmbUsersData[index]["fullName"];

    this.soldUnit.brokerId = userId;
    this.soldUnit.broker = user;
  }
  public cmbApprovedByChange() : void {
    let index = this.cmbApprovedBy["selectedIndex"];
    let userId = this.cmbUsersData[index]["id"];
    let user = this.cmbUsersData[index]["fullName"];

    this.soldUnit.approvedBy = userId;
    this.soldUnit.approvedByUser = user;
  }

  // detail events
  public btnSaveSoldUnitClick() : void {
    let btnSaveSoldUnit:Element = document.getElementById("btnSaveSoldUnit");

    btnSaveSoldUnit.setAttribute("disabled","disabled");
    btnSaveSoldUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    
    this.soldUnitService.saveSoldUnit(this.soldUnit);
    this.soldUnitSavedSub =  this.soldUnitService.soldUnitSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveSoldUnit.removeAttribute("disabled");
              btnSaveSoldUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveSoldUnit.removeAttribute("disabled");
              btnSaveSoldUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          }
      }
    );
  }
  public btnLockSoldUnitClick() : void {
    let btnLockSoldUnit:Element = document.getElementById("btnLockSoldUnit");

    btnLockSoldUnit.setAttribute("disabled","disabled");
    btnLockSoldUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Locking...";

    this.soldUnitService.lockSoldUnit(this.soldUnit);
    this.soldUnitLockedSub =  this.soldUnitService.soldUnitLockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Locking successful.");
              this.soldUnit.isLocked = true;
              btnLockSoldUnit.removeAttribute("disabled");
              btnLockSoldUnit.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          } else if(data == 0) {
              this.toastr.error("Locking failed.");   
              btnLockSoldUnit.removeAttribute("disabled");
              btnLockSoldUnit.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          }
      }
    );
  }
  public btnUnlockSoldUnitClick() : void {
    let btnUnlockSoldUnit:Element = document.getElementById("btnUnlockSoldUnit");

    btnUnlockSoldUnit.setAttribute("disabled","disabled");
    btnUnlockSoldUnit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Unlocking...";

    this.soldUnitService.unlockSoldUnit(this.soldUnit);
    this.soldUnitUnlockedSub = this.soldUnitService.soldUnitUnlockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Unlocking successful.");
              this.soldUnit.isLocked = false;
              btnUnlockSoldUnit.removeAttribute("disabled");
              btnUnlockSoldUnit.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          } else if(data == 0) {
              this.toastr.error("Unlocking failed.");   
              btnUnlockSoldUnit.removeAttribute("disabled");
              btnUnlockSoldUnit.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          }
      }
    );
  }
  public btnOpenSoldUnitRequirementsModalClick() : void {
    this.mdlSoldUnitRequirementsModalShow = true;
  }

  // item (sub detail) events
  public tabDetail1Click(index: number) {
    for (var i = 0; i <= this.tabDetail1.length - 1; i++) {
      if(index==i) this.tabDetail1[i] = true;
      else this.tabDetail1[i] = false;
    }
  }
  public btnEditSoldUnitRequirementClick() {
    let selectedSoldUnitRequirement = this.fgdSoldUnitRequirementsCollection.currentItem;

    this.soldUnitRequirement.id = selectedSoldUnitRequirement.id;
    this.soldUnitRequirement.soldUnitId = selectedSoldUnitRequirement.soldUnitId;
    this.soldUnitRequirement.checklistRequirementId = selectedSoldUnitRequirement.checklistRequirementId;
    this.soldUnitRequirement.checklistRequirement = selectedSoldUnitRequirement.checklistRequirement;
    this.soldUnitRequirement.checklistRequirementNo = selectedSoldUnitRequirement.checklistRequirementNo;
    this.soldUnitRequirement.checklistCategory = selectedSoldUnitRequirement.checklistCategory;
    this.soldUnitRequirement.checklistType = selectedSoldUnitRequirement.checklistType;
    this.soldUnitRequirement.checklistWithAttachments = selectedSoldUnitRequirement.checklistWithAttachments;
    this.soldUnitRequirement.attachment1 = selectedSoldUnitRequirement.attachment1;
    this.soldUnitRequirement.attachment2 = selectedSoldUnitRequirement.attachment2;
    this.soldUnitRequirement.attachment3 = selectedSoldUnitRequirement.attachment3;
    this.soldUnitRequirement.attachment4 = selectedSoldUnitRequirement.attachment4;
    this.soldUnitRequirement.attachment5 = selectedSoldUnitRequirement.attachment5;
    this.soldUnitRequirement.remarks = selectedSoldUnitRequirement.remarks;
    this.soldUnitRequirement.status = selectedSoldUnitRequirement.status;
    this.soldUnitRequirement.statusDate = selectedSoldUnitRequirement.statusDate; 

    this.getCmbUnitSoldRequirementStatus();
    this.getSoldUnitRequirementActivities();

    this.mdlEditSoldUnitRequirementModalShow = true;
  }

  // new sold unit requirements modal events
  public btnOkSoldUnitRequirementsModalClick() : void {
    this.getNewSoldUnitRequirements();
    this.mdlSoldUnitRequirementsModalShow = false;
  }
  public btnCloseSoldUnitRequirementsModalClick() : void {
    this.mdlSoldUnitRequirementsModalShow = false;
  }
  
  // edit sold unit requirement modal events
  public tabDetail1Modal1Click(index: number) {
    for (var i = 0; i <= this.tabDetail1Modal1.length - 1; i++) {
      if(index==i) this.tabDetail1Modal1[i] = true;
      else this.tabDetail1Modal1[i] = false;

      if(index==2) this.getSoldUnitRequirementActivities();
    }
  }
  public btnSaveEditSoldUnitRequirementModalClick() {
    let btnSaveEditSoldUnitRequirementModal:Element = document.getElementById("btnSaveEditSoldUnitRequirementModal");
    let btnCloseEditSoldUnitRequirementModal:Element = document.getElementById("btnCloseEditSoldUnitRequirementModal");

    btnSaveEditSoldUnitRequirementModal.setAttribute("disabled","disabled");
    btnSaveEditSoldUnitRequirementModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    btnCloseEditSoldUnitRequirementModal.setAttribute("disabled","disabled");

    this.soldUnitService.saveSoldUnitRequirement(this.soldUnitRequirement);
    this.soldUnitRequirementSavedSub =  this.soldUnitService.soldUnitRequirementSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveEditSoldUnitRequirementModal.removeAttribute("disabled");
              btnSaveEditSoldUnitRequirementModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
              btnCloseEditSoldUnitRequirementModal.removeAttribute("disabled");

              this.getSoldUnitRequirements();
              this.mdlSoldUnitRequirementsModalShow = false;
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveEditSoldUnitRequirementModal.removeAttribute("disabled");
              btnSaveEditSoldUnitRequirementModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
              btnCloseEditSoldUnitRequirementModal.removeAttribute("disabled");
          }
      },
      error => {
        this.toastr.error("Server error.");   
        btnSaveEditSoldUnitRequirementModal.removeAttribute("disabled");
        btnSaveEditSoldUnitRequirementModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
        btnCloseEditSoldUnitRequirementModal.removeAttribute("disabled");
      }
    );

    this.mdlEditSoldUnitRequirementModalShow = false;
  }
  public btnAddSoldUnitRequirementActivitiesClick() {
    let selectedSoldUnitRequirementActivity = this.fgdSoldUnitRequirementActivitiesCollection.currentItem;

    this.soldUnitRequirementActivity.id = 0;
    this.soldUnitRequirementActivity.soldUnitRequirementId = this.soldUnitRequirement.id;
    this.soldUnitRequirementActivity.activityDate = "";
    this.soldUnitRequirementActivity.activity = "";
    this.soldUnitRequirementActivity.remarks = "";
    this.soldUnitRequirementActivity.userId = 0;
    this.soldUnitRequirementActivity.user = "";  

    this.mdlSoldUnitRequirementActivityModalShow = true;
  }
  public btnCloseEditSoldUnitRequirementModalClick() {
    this.mdlEditSoldUnitRequirementModalShow = false;
  }
  public btnEditSoldUnitRequirementActivitiesClick() {
    let selectedSoldUnitRequirementActivity = this.fgdSoldUnitRequirementActivitiesCollection.currentItem;

    this.soldUnitRequirementActivity.id = selectedSoldUnitRequirementActivity.id;
    this.soldUnitRequirementActivity.soldUnitRequirementId = selectedSoldUnitRequirementActivity.soldUnitRequirementId;
    this.soldUnitRequirementActivity.activityDate = selectedSoldUnitRequirementActivity.activityDate;
    this.soldUnitRequirementActivity.activity = selectedSoldUnitRequirementActivity.activity;
    this.soldUnitRequirementActivity.remarks = selectedSoldUnitRequirementActivity.remarks;
    this.soldUnitRequirementActivity.userId = selectedSoldUnitRequirementActivity.userId;
    this.soldUnitRequirementActivity.user = selectedSoldUnitRequirementActivity.user;  

    this.mdlSoldUnitRequirementActivityModalShow = true;
  }
  public btnDeleteSoldUnitRequirementActivitiesClick() {
    let selectedSoldUnitRequirementActivity = this.fgdSoldUnitRequirementActivitiesCollection.currentItem;

    this.soldUnitService.deleteSoldUnitRequirementActivity(selectedSoldUnitRequirementActivity.id,);
    this.soldUnitRequirementActivityDeleteSub = this.soldUnitService.soldUnitRequirementActivityDeleteObservable.subscribe(
        data => {
            if(data == 1) {
                this.toastr.success("Delete successful.");
                this.fgdSoldUnitRequirementActivitiesCollection.remove​(selectedSoldUnitRequirementActivity);
            } else if(data == 0) {
                this.toastr.error("Delete failed.");   
            }
        }
    );
  }

  // edit sold unit requirement activity modal events
  public btnSaveSoldUnitRequirementActivityModalClick() {
    let btnSaveSoldUnitRequirementActivityModal:Element = document.getElementById("btnSaveSoldUnitRequirementActivityModal");
    let btnCloseSoldUnitRequirementActivityModal:Element = document.getElementById("btnCloseSoldUnitRequirementActivityModal");

    btnSaveSoldUnitRequirementActivityModal.setAttribute("disabled","disabled");
    btnSaveSoldUnitRequirementActivityModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    btnCloseSoldUnitRequirementActivityModal.setAttribute("disabled","disabled");
    
    if(this.soldUnitRequirementActivity.id == 0) {
      this.soldUnitService.addSoldUnitRequirementActivity(this.soldUnitRequirementActivity);
      this.soldUnitRequirementActivitySavedSub =  this.soldUnitService.soldUnitRequirementActivityAddObservable.subscribe(
        data => {
            if(data == 1) {
                this.toastr.success("Saving successful.");
                btnSaveSoldUnitRequirementActivityModal.removeAttribute("disabled");
                btnSaveSoldUnitRequirementActivityModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
                btnCloseSoldUnitRequirementActivityModal.removeAttribute("disabled");
  
                this.getSoldUnitRequirementActivities();
                this.mdlSoldUnitRequirementActivityModalShow = false;
            } else if(data == 0) {
                this.toastr.error("Saving failed.");   
                btnSaveSoldUnitRequirementActivityModal.removeAttribute("disabled");
                btnSaveSoldUnitRequirementActivityModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
                btnCloseSoldUnitRequirementActivityModal.removeAttribute("disabled");
            }
        },
        error => {
          this.toastr.error("Server error.");   
          btnSaveSoldUnitRequirementActivityModal.removeAttribute("disabled");
          btnSaveSoldUnitRequirementActivityModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          btnCloseSoldUnitRequirementActivityModal.removeAttribute("disabled");
        }
      );        
    } else {
      this.soldUnitService.saveSoldUnitRequirementActivity(this.soldUnitRequirementActivity);
      this.soldUnitRequirementActivitySavedSub =  this.soldUnitService.soldUnitRequirementActivitySavedObservable.subscribe(
        data => {
            if(data == 1) {
                this.toastr.success("Saving successful.");
                btnSaveSoldUnitRequirementActivityModal.removeAttribute("disabled");
                btnSaveSoldUnitRequirementActivityModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
                btnCloseSoldUnitRequirementActivityModal.removeAttribute("disabled");
  
                this.getSoldUnitRequirementActivities();
                this.mdlSoldUnitRequirementActivityModalShow = false;
            } else if(data == 0) {
                this.toastr.error("Saving failed.");   
                btnSaveSoldUnitRequirementActivityModal.removeAttribute("disabled");
                btnSaveSoldUnitRequirementActivityModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
                btnCloseSoldUnitRequirementActivityModal.removeAttribute("disabled");
            }
        },
        error => {
          this.toastr.error("Server error.");   
          btnSaveSoldUnitRequirementActivityModal.removeAttribute("disabled");
          btnSaveSoldUnitRequirementActivityModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          btnCloseSoldUnitRequirementActivityModal.removeAttribute("disabled");
        }
      );
    }
  }
  public btnCloseSoldUnitRequirementActivityModalClick() {
    this.mdlSoldUnitRequirementActivityModalShow = false;    
  }
}