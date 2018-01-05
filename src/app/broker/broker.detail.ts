// Angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { BrokerService } from './broker.service';

// WijMo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstBroker } from '../model/model.mst.broker';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './broker.detail.html'
})

export class BrokerDetail {
  public title = 'Broker Detail';

  private brokerSub: any;
  private brokerSavedSub: any;
  private brokerLockedSub: any;
  private brokerUnlockedSub: any;
  private brokerStatusSub: any;

  private cmbBrokerGenderSub: any;
  private cmbBrokerUserStatusSub: any;

  public broker: MstBroker = {
    id: 0,
    brokerCode: "",
    lastName: "",
    firstName: "",
    middleName: "",
    fullName: "",
    licenseNumber: "",
    birthDate: "",
    civilStatus: "",
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
    status: "",
    isLocked: false,
    createdBy: 1,
    createdDateTime: "",
    updatedBy: 1,
    updatedDateTime: "",
  };

  public cmbBrokerUserStatusData: ObservableArray;
  public cmbBrokerGenderData: ObservableArray;

  //constructor
  constructor(
    private brokerService: BrokerService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  public ngOnInit() {
    this.getBroker();
  }

  public ngOnDestroy() {
    if (this.brokerSub != null) this.brokerSub.unsubscribe();

    if (this.cmbBrokerUserStatusSub != null) this.cmbBrokerUserStatusSub.unsubscribe();
    if (this.cmbBrokerGenderSub != null) this.cmbBrokerGenderSub.unsubscribe();

    if (this.brokerSavedSub != null) this.brokerSavedSub.unsubscribe();
    if (this.brokerLockedSub != null) this.brokerLockedSub.unsubscribe();
    if (this.brokerUnlockedSub != null) this.brokerUnlockedSub.unsubscribe();
  }

  public getIdParameter() {
    let id = 0;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  //GET BROKER & CMB GENDER, STATUS
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
        this.broker.realtyFirmTelephoneNumber = data.realtyFirmTelephoneNumber;
        this.broker.realtyFirmMobileNumber = data.realtyFirmMobileNumber;
        this.broker.realtyFirmFaxNumber = data.realtyFirmFaxNumber;
        this.broker.realtyFirmEmailAddress = data.realtyFirmEmailAddress;
        this.broker.realtyFirmWebsite = data.realtyFirmWebsite;
        this.broker.realtyFirmTIN = data.realtyFirmTIN;
        this.broker.organization = data.organization;
        this.broker.remarks = data.remarks;
        this.broker.picture = data.picture;
        this.broker.status = data.status;
        this.broker.isLocked = data.isLocked;
        this.broker.createdBy = data.createdBy;
        this.broker.createdDateTime = data.createdDateTime;
        this.broker.updatedBy = data.updatedBy;
        this.broker.updatedDateTime = data.updatedDateTime;

        this.getCmbBrokerGenderData();
        this.getCmbBrokerStatusData();
      }
      );
  }
  public getCmbBrokerStatusData(): void {
    this.brokerService.getDropDowns();

    this.cmbBrokerUserStatusSub = this.brokerService.dropDownsObservable.subscribe(
      data => {
        let brokerUserStatuses = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "USER STATUS") {
              brokerUserStatuses.push({
                id: data[i].id,
                category: data[i].category,
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }
        this.cmbBrokerUserStatusData = brokerUserStatuses;
      }
    );
  }

  //CMB BROKER GENDER
  public getCmbBrokerGenderData(): void {
    this.brokerService.getDropDowns();

    this.cmbBrokerGenderSub = this.brokerService.dropDownsObservable.subscribe(
      data => {
        let brokerGenders = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "GENDER") {
              brokerGenders.push({
                id: data[i].id,
                category: data[i].category,
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }

        this.cmbBrokerGenderData = brokerGenders;
      }
    );
  }

  //SAVE BROKER ON CLICK
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

  //LOCK BROKER ON CLICK
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

  //UNLOCK BROKER ON CLICK
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

}