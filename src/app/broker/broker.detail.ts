// angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// wijmo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// service(s)
import { BrokerService } from './broker.service';
import { SecurityService } from '../security/security.service';

// model(s)
import { MstBroker } from '../model/model.mst.broker';

@Component({
  templateUrl: './broker.detail.html'
})
export class BrokerDetail {
  
  // ==================
  // private properties
  // ==================

  // list operation
  private brokerSub: any;

  // detail operation
  private brokerSavedSub: any;
  private brokerLockedSub: any;
  private brokerUnlockedSub: any;

  private brokerPictureSub: any;

  // combo boxes
  private dropDownsSub: any;

  // =================
  // public properties
  // =================

  public title: string = 'Broker Detail';

  // model(s)
  public broker: MstBroker = {
    id: 0,
    brokerCode: "",
    lastName: "",
    firstName: "",
    middleName: "",
    fullName: "",
    licenseNumber: "",
    birthDate: "",
    civilStatus: "SINGLE",
    gender: "",
    address: "",
    telephoneNumber: "",
    mobileNumber: "",
    religion: "",
    emailAddress: "",
    facebook: "",
    tin: "",
    realtyFirm: "",
    realtyFirmAddress: "",
    realtyFirmTelephoneNumber: "",
    realtyFirmMobileNumber: "",
    realtyFirmFaxNumber: "",
    realtyFirmEmailAddress: "",
    realtyFirmWebsite: "",
    realtyFirmTIN: "",
    organization: "",
    remarks: "",
    picture: "",
    attachment1: "",
    attachment2: "",
    attachment3: "",
    attachment4: "",
    attachment5: "",
    status: "ACTIVE",
    isLocked: false,
    createdBy: 1,
    createdDateTime: "",
    updatedBy: 1,
    updatedDateTime: "",
  };

  // combo box data sources
  public cmbStatusData: ObservableArray;
  public cmbCivilStatusData: ObservableArray;
  public cmbGenderData: ObservableArray;

  // detail tab index (if large number of fields)
  public tabDetail1 = new Array(true, false, false);

  // =======
  // angular
  // =======

  //constructor
  constructor(
    private brokerService: BrokerService,
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
    if(this.securityService.openPage("BROKER DETAIL") == true) {
      this.getBroker();
    } else {
      this.toastr.error("No rights to open page.")
      setTimeout(() => { this.location.back(); }, 1000);  
    }
  }
  ngOnDestroy() {
    if (this.brokerSub != null) this.brokerSub.unsubscribe();

    if (this.brokerSavedSub != null) this.brokerSavedSub.unsubscribe();
    if (this.brokerLockedSub != null) this.brokerLockedSub.unsubscribe();
    if (this.brokerUnlockedSub != null) this.brokerUnlockedSub.unsubscribe();
    if (this.brokerPictureSub != null) this.brokerPictureSub.unsubscribe();

    if (this.dropDownsSub != null) this.dropDownsSub.unsubscribe();
  }

  // ===============
  // private methods
  // ===============

  private getIdParameter(): number {
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
  public getBroker() {
    this.brokerService.getBroker(this.getIdParameter());

    this.brokerSub = this.brokerService.brokerObservable
      .subscribe(
        data => {
          this.broker.id = data.id;
          this.broker.brokerCode = data.brokerCode;
          this.broker.lastName = data.lastName;
          this.broker.firstName = data.firstName;
          this.broker.middleName = data.middleName;
          this.broker.fullName = data.fullName;
          this.broker.licenseNumber = data.licenseNumber;
          this.broker.birthDate = data.birthDate;
          this.broker.civilStatus = data.civilStatus;
          this.broker.gender = data.gender;
          this.broker.address = data.address;
          this.broker.telephoneNumber = data.telephoneNumber;
          this.broker.mobileNumber = data.mobileNumber;
          this.broker.religion = data.religion;
          this.broker.emailAddress = data.emailAddress;
          this.broker.tin = data.tin;
          this.broker.realtyFirm = data.realtyFirm;
          this.broker.realtyFirmAddress = data.realtyFirmAddress;
          this.broker.realtyFirmTelephoneNumber = data.realtyFirmTelephoneNumber;
          this.broker.realtyFirmMobileNumber = data.realtyFirmMobileNumber;
          this.broker.realtyFirmFaxNumber = data.realtyFirmFaxNumber;
          this.broker.realtyFirmEmailAddress = data.realtyFirmEmailAddress;
          this.broker.realtyFirmWebsite = data.realtyFirmWebsite;
          this.broker.realtyFirmTIN = data.realtyFirmTIN;
          this.broker.organization = data.organization;
          this.broker.remarks = data.remarks;
          this.broker.picture = data.picture;
          this.broker.attachment1 = data.attachment1;
          this.broker.attachment2 = data.attachment2;
          this.broker.attachment3 = data.attachment3;
          this.broker.attachment4 = data.attachment4;
          this.broker.attachment5 = data.attachment5;
          this.broker.status = data.status;
          this.broker.isLocked = data.isLocked;
          this.broker.createdBy = data.createdBy;
          this.broker.createdDateTime = data.createdDateTime;
          this.broker.updatedBy = data.updatedBy;
          this.broker.updatedDateTime = data.updatedDateTime;

          this.getDropdowns(data);
        }
      );
  }

  // combo boxes
  public getDropdowns(defaultValues: any) {
    this.brokerService.getDropDowns();
    this.dropDownsSub = this.brokerService.dropDownsObservable.subscribe(
      data => {
        let statuses = new ObservableArray();
        let civilStatuses = new ObservableArray();
        let genders = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "BROKER STATUS") {
              statuses.push({
                description: data[i].description,
                value: data[i].value
              });
            }
            if (data[i].category == "GENDER") {
              genders.push({
                description: data[i].description,
                value: data[i].value
              });
            }
            if (data[i].category == "CIVIL STATUS") {
              civilStatuses.push({
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }
        this.cmbStatusData = statuses;
        this.cmbGenderData = genders;
        this.cmbCivilStatusData = civilStatuses;

        setTimeout(() => { this.broker.status = defaultValues.status; }, 100);
        setTimeout(() => { this.broker.gender = defaultValues.gender; }, 100);
        setTimeout(() => { this.broker.civilStatus = defaultValues.civilStatus; }, 100);
      }
    );
  }

  // ======
  // events
  // ======

  // detail operations
  public btnSaveBrokerClick(): void {
    let btnSaveBroker: Element = document.getElementById("btnSaveBroker");

    btnSaveBroker.setAttribute("disabled", "disabled");
    btnSaveBroker.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";

    this.brokerService.saveBroker(this.broker);
    this.brokerSavedSub = this.brokerService.brokerSavedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Saving successful.");
          btnSaveBroker.removeAttribute("disabled");
          btnSaveBroker.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
        } else if (data == 0) {
          this.toastr.error("Saving failed.");
          btnSaveBroker.removeAttribute("disabled");
          btnSaveBroker.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
        }
      }
    );
  }
  public btnLockBrokerClick(): void {
    let btnLockBroker: Element = document.getElementById("btnLockBroker");

    btnLockBroker.setAttribute("disabled", "disabled");
    btnLockBroker.innerHTML = "<i class='fa fa-plus fa-fw'></i> Locking...";

    this.brokerService.lockBroker(this.broker);
    this.brokerLockedSub = this.brokerService.brokerLockedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Locking successful.");
          this.broker.isLocked = true;
          btnLockBroker.removeAttribute("disabled");
          btnLockBroker.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
        } else if (data == 0) {
          this.toastr.error("Locking failed.");
          btnLockBroker.removeAttribute("disabled");
          btnLockBroker.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
        }
      }
    );
  }
  public btnUnlockBrokerClick(): void {
    let btnUnlockBroker: Element = document.getElementById("btnUnlockBroker");

    btnUnlockBroker.setAttribute("disabled", "disabled");
    btnUnlockBroker.innerHTML = "<i class='fa fa-plus fa-fw'></i> Unlocking...";

    this.brokerService.unlockBroker(this.broker);
    this.brokerUnlockedSub = this.brokerService.brokerUnlockedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Unlocking successful.");
          this.broker.isLocked = false;
          btnUnlockBroker.removeAttribute("disabled");
          btnUnlockBroker.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
        } else if (data == 0) {
          this.toastr.error("Unlocking failed.");
          btnUnlockBroker.removeAttribute("disabled");
          btnUnlockBroker.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
        }
      }
    );
  }
  public btnPrintBrokerClick(): void {
    this.router.navigate(['/pdf', 'broker',this.broker.id]); 
  }
  public btnUploadPictureClick(e: Event) : void {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    if(target.files.length > 0) {
      this.brokerService.uploadBrokerPicture(target.files[0],"BROKER-" + this.broker.brokerCode + "-" + Date.now());
      this.brokerPictureSub = this.brokerService.brokerPictureObservable
          .subscribe( data => {
            this.broker.picture = data.fileUrl;
          });
    }
  }

  // detail tab index click
  public tabDetail1Click(index: number) {
    for (var i = 0; i <= this.tabDetail1.length - 1; i++) {
      if(index==i) this.tabDetail1[i] = true;
      else this.tabDetail1[i] = false;
    }
  }

  // attachments
  public btnOpenBrokerAttachment1Click(e: Event) : void {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    if(target.files.length > 0) {
      this.brokerService.uploadBrokerPicture(target.files[0],"BROKERFILE1-" + this.broker.brokerCode + "-" + Date.now());
      this.brokerPictureSub = this.brokerService.brokerPictureObservable
          .subscribe( data => {
            this.broker.attachment1 = data.fileUrl;
          });
    }
  }
  public btnOpenBrokerAttachment2Click(e: Event) : void {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    if(target.files.length > 0) {
      this.brokerService.uploadBrokerPicture(target.files[0],"BROKERFILE2-" + this.broker.brokerCode + "-" + Date.now());
      this.brokerPictureSub = this.brokerService.brokerPictureObservable
          .subscribe( data => {
            this.broker.attachment2 = data.fileUrl;
          });
    }
  }
  public btnOpenBrokerAttachment3Click(e: Event) : void {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    if(target.files.length > 0) {
      this.brokerService.uploadBrokerPicture(target.files[0],"BROKERFILE3-" + this.broker.brokerCode + "-" + Date.now());
      this.brokerPictureSub = this.brokerService.brokerPictureObservable
          .subscribe( data => {
            this.broker.attachment3 = data.fileUrl;
          });
    }
  }
  public btnOpenBrokerAttachment4Click(e: Event) : void {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    if(target.files.length > 0) {
      this.brokerService.uploadBrokerPicture(target.files[0],"BROKERFILE4-" + this.broker.brokerCode + "-" + Date.now());
      this.brokerPictureSub = this.brokerService.brokerPictureObservable
          .subscribe( data => {
            this.broker.attachment4 = data.fileUrl;
          });
    }
  }
  public btnOpenBrokerAttachment5Click(e: Event) : void {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    if(target.files.length > 0) {
      this.brokerService.uploadBrokerPicture(target.files[0],"BROKERFILE5-" + this.broker.brokerCode + "-" + Date.now());
      this.brokerPictureSub = this.brokerService.brokerPictureObservable
          .subscribe( data => {
            this.broker.attachment5 = data.fileUrl;
          });
    }
  }
}