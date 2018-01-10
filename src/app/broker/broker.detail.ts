// Angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { BrokerService } from './broker.service';

// WijMo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// Message Box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstBroker } from '../model/model.mst.broker';


@Component({
  templateUrl: './broker.detail.html'
})
export class BrokerDetail {
  
  // private properties
  private brokerSub: any;

  private brokerSavedSub: any;
  private brokerLockedSub: any;
  private brokerUnlockedSub: any;

  private dropDownsSub: any;

  // public properties
  public title = 'Broker Detail';

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

  // combo box data sources
  public cmbBrokerStatusData: ObservableArray;
  public cmbCivilStatusData: ObservableArray;
  public cmbGenderData: ObservableArray;

  // tab index
  public tabDetail1 = new Array(true, false, false);

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

  // ng
  ngOnInit() {
    this.getBroker();
  }
  ngOnDestroy() {
    if (this.brokerSub != null) this.brokerSub.unsubscribe();

    if (this.brokerSavedSub != null) this.brokerSavedSub.unsubscribe();
    if (this.brokerLockedSub != null) this.brokerLockedSub.unsubscribe();
    if (this.brokerUnlockedSub != null) this.brokerUnlockedSub.unsubscribe();

    if (this.dropDownsSub != null) this.dropDownsSub.unsubscribe();
  }

  // private methods
  private getIdParameter(): number {
    let id = 0;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  // get broker data
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
          this.broker.status = data.status;
          this.broker.isLocked = data.isLocked;
          this.broker.createdBy = data.createdBy;
          this.broker.createdDateTime = data.createdDateTime;
          this.broker.updatedBy = data.updatedBy;
          this.broker.updatedDateTime = data.updatedDateTime;

          this.getDropdownData();
        }
      );
  }

  // get combo box data sources
  public getDropdownData() {
    this.brokerService.getDropDowns();
    this.dropDownsSub = this.brokerService.dropDownsObservable.subscribe(
      data => {
        let brokerStatus = new ObservableArray();
        let civilStatus = new ObservableArray();
        let gender = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "BROKER STATUS") {
              brokerStatus.push({
                description: data[i].description,
                value: data[i].value
              });
            }
            if (data[i].category == "GENDER") {
              gender.push({
                description: data[i].description,
                value: data[i].value
              });
            }
            if (data[i].category == "CIVIL STATUS") {
              civilStatus.push({
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }
        this.cmbBrokerStatusData = brokerStatus;
        this.cmbGenderData = gender;
        this.cmbCivilStatusData = civilStatus;
      }
    );
  }

  // events
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

  // tab index click
  public tabDetail1Click(index: number) {
    for (var i = 0; i <= this.tabDetail1.length - 1; i++) {
      if(index==i) this.tabDetail1[i] = true;
      else this.tabDetail1[i] = false;
    }
  }

}