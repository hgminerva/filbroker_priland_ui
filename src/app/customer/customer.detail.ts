// angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// wijmo
import { ObservableArray, CollectionView} from 'wijmo/wijmo';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// service(s)
import { CustomerService } from './customer.service';
import { SecurityService } from '../security/security.service';

// model(s)
import { MstCustomer } from '../model/model.mst.customer';

@Component({
  templateUrl: './customer.detail.html'
})
export class CustomerDetail {

  // ==================
  // private properties
  // ==================

  // default date
  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  // detail
  private customerSub: any;

  // detail operations
  private customerSavedSub: any;
  private customerLockedSub: any;
  private customerUnlockedSub: any;
  private customerPictureSub: any;

  // combo boxes
  private dropDownsSub: any;

  // =================
  // public properties
  // =================

  public title: string = 'Customer Detail';

  // model(s)
  public customer : MstCustomer = {
    id: 0,
    customerCode: "",
    lastName: "",
    firstName: "",
    middleName: "",
    fullName: "",
    civilStatus: "SINGLE",
    gender: "MALE",
    birthDate: "",
    tin: "",
    idType: "DRIVERS LICENSE",
    idNumber: "",
    address: "",
    city: "",
    province: "",
    country: "",
    zipCode: "",
    emailAddress: "",
    telephoneNumber: "",
    mobileNumber: "",
    employer: "",
    employerIndustry: "",
    noOfYearsEmployed: 0,
    position: "",
    employmentStatus: "PERMANENT",
    employerAddress: "",
    employerCity: "",
    employerProvince: "",
    employerCountry: "",
    employerZipCode: "",
    employerTelephoneNumber: "",
    employerMobileNumber: "",
    spouseLastName: "",
    spouseFirstName: "",
    spouseMiddleName: "",
    spouseBirthDate: this.currentDateString,
    remarks: "",
    status: "ACTIVE",
    picture: "",
    isLocked: false,
    createdBy: 0,
    createdDateTime: "",
    updatedBy: 0,
    updatedDateTime: ""
  };

  // combo box data sources
  public cmbStatusData: ObservableArray;
  public cmbCivilStatusData: ObservableArray;
  public cmbGenderData: ObservableArray;
  public cmbIDTypeData: ObservableArray;
  public cmbEmploymentStatusData: ObservableArray;

  // tab index (for large number of fields)
  public tabDetail1 = new Array(true, false);

  // =======
  // angular
  // =======

  // constructor
  constructor(
    private customerService: CustomerService,
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
  public ngOnInit() {
    if(this.securityService.openPage("CUSTOMER DETAIL") == true) {
      this.getCustomer();
    } else {
      this.toastr.error("No rights to open page.")
      setTimeout(() => { this.location.back(); }, 1000);  
    }
  }
  public ngOnDestroy() {
    if( this.customerSub != null) this.customerSub.unsubscribe();
    if( this.customerSavedSub != null) this.customerSavedSub.unsubscribe();
    if( this.customerLockedSub != null) this.customerLockedSub.unsubscribe();
    if( this.customerUnlockedSub != null) this.customerUnlockedSub.unsubscribe();
    if( this.dropDownsSub != null) this.dropDownsSub.unsubscribe();
    if( this.customerPictureSub != null) this.customerPictureSub.unsubscribe();
  }

  // ===============
  // private methods
  // ===============

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

  // detail
  public getCustomer() {
    this.customerService.getCustomer(this.getIdParameter());

    this.customerSub = this.customerService.customerObservable
      .subscribe(
        data => {
          this.customer.id = data.id;
          this.customer.customerCode = data.customerCode;
          this.customer.lastName = data.lastName;
          this.customer.firstName = data.firstName;
          this.customer.middleName = data.middleName;
          this.customer.fullName = data.fullName;
          this.customer.civilStatus = data.civilStatus;
          this.customer.gender = data.gender;
          this.customer.birthDate = data.birthDate;
          this.customer.tin = data.tin;
          this.customer.idType = data.idType;
          this.customer.idNumber = data.idNumber;
          this.customer.address = data.address;
          this.customer.city = data.city;
          this.customer.province = data.province;
          this.customer.country = data.country;
          this.customer.zipCode = data.zipCode;
          this.customer.emailAddress = data.emailAddress;
          this.customer.telephoneNumber = data.telephoneNumber;
          this.customer.mobileNumber = data.mobileNumber;
          this.customer.employer = data.employer;
          this.customer.employerIndustry = data.employerIndustry;
          this.customer.noOfYearsEmployed = data.noOfYearsEmployed;
          this.customer.position = data.position;
          this.customer.employmentStatus = data.employmentStatus;
          this.customer.employerAddress = data.employerAddress;
          this.customer.employerCity = data.employerCity;
          this.customer.employerProvince = data.employerProvince;
          this.customer.employerCountry = data.employerCountry;
          this.customer.employerZipCode = data.employerZipCode;
          this.customer.employerTelephoneNumber = data.employerTelephoneNumber;
          this.customer.employerMobileNumber = data.employerMobileNumber;
          this.customer.remarks = data.remarks;
          this.customer.status = data.status;
          this.customer.picture = data.picture;
          this.customer.isLocked = data.isLocked;
          this.customer.createdBy = data.createdBy;
          this.customer.createdDateTime = data.createdDateTime;
          this.customer.updatedBy = data.updatedBy;
          this.customer.updatedDateTime = data.updatedDateTime;    

          this.getDropDowns(data);
        }
      );
  }

  // detail combo boxes
  public getDropDowns(defaultValues: any) : void {
    this.customerService.getDropDowns();
    this.dropDownsSub = this.customerService.dropDownsObservable.subscribe(
      data => {
        let statuses = new ObservableArray();
        let civilStatuses = new ObservableArray();
        let genders = new ObservableArray();
        let idTypes = new ObservableArray();
        let employmentStatuses = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "CUSTOMER STATUS") {
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
            if (data[i].category == "ID TYPE") {
              idTypes.push({
                description: data[i].description,
                value: data[i].value
              });
            }
            if (data[i].category == "EMPLOYMENT STATUS") {
              employmentStatuses.push({
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }
        this.cmbStatusData = statuses;
        this.cmbCivilStatusData = civilStatuses;
        this.cmbGenderData = genders;
        this.cmbIDTypeData = idTypes;
        this.cmbEmploymentStatusData = employmentStatuses;

        setTimeout(() => { this.customer.status = defaultValues.status; }, 100);
        setTimeout(() => { this.customer.civilStatus = defaultValues.civilStatus; }, 100);
        setTimeout(() => { this.customer.gender = defaultValues.gender; }, 100);
        setTimeout(() => { this.customer.idType = defaultValues.idType; }, 100);
        setTimeout(() => { this.customer.employmentStatus = defaultValues.employmentStatus; }, 100);
      }
    );
  }
  
  // ======
  // events
  // ======

  // detail operations
  public btnSaveCustomerClick() : void {
    let btnSaveCustomer:Element = document.getElementById("btnSaveCustomer");

    btnSaveCustomer.setAttribute("disabled","disabled");
    btnSaveCustomer.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    
    this.customerService.saveCustomer(this.customer);
    this.customerSavedSub =  this.customerService.customerSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveCustomer.removeAttribute("disabled");
              btnSaveCustomer.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveCustomer.removeAttribute("disabled");
              btnSaveCustomer.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          }
      }
    );
  }
  public btnLockCustomerClick() : void {
    let btnLockCustomer:Element = document.getElementById("btnLockCustomer");

    btnLockCustomer.setAttribute("disabled","disabled");
    btnLockCustomer.innerHTML = "<i class='fa fa-plus fa-fw'></i> Locking...";

    this.customerService.lockCustomer(this.customer);
    this.customerLockedSub =  this.customerService.customerLockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Locking successful.");
              this.customer.isLocked = true;
              btnLockCustomer.removeAttribute("disabled");
              btnLockCustomer.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          } else if(data == 0) {
              this.toastr.error("Locking failed.");   
              btnLockCustomer.removeAttribute("disabled");
              btnLockCustomer.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          }
      }
    );
  } 
  public btnUnlockCustomerClick() : void {
    let btnUnlockCustomer:Element = document.getElementById("btnUnlockCustomer");

    btnUnlockCustomer.setAttribute("disabled","disabled");
    btnUnlockCustomer.innerHTML = "<i class='fa fa-plus fa-fw'></i> Unlocking...";

    this.customerService.unlockCustomer(this.customer);
    this.customerUnlockedSub = this.customerService.customerUnlockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Unlocking successful.");
              this.customer.isLocked = false;
              btnUnlockCustomer.removeAttribute("disabled");
              btnUnlockCustomer.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          } else if(data == 0) {
              this.toastr.error("Unlocking failed.");   
              btnUnlockCustomer.removeAttribute("disabled");
              btnUnlockCustomer.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          }
      }
    );
  }
  public btnPrintCustomerClick() : void {
    this.router.navigate(['/pdf', 'customer',this.customer.id]);   
  }
  public btnUploadPictureClick(e: Event) : void {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    if(target.files.length > 0) {
      this.customerService.uploadCustomerPicture(target.files[0],"CUSTOMER-" + this.customer.customerCode + "-" + Date.now());
      this.customerPictureSub = this.customerService.customerPictureObservable
          .subscribe( data => {
            this.customer.picture = data.fileUrl;
          });
    }
  }

  // detail tab event (for multiple detail number of fields)
  public tabDetail1Click(index: number) {
    for (var i = 0; i <= this.tabDetail1.length - 1; i++) {
      if(index==i) this.tabDetail1[i] = true;
      else this.tabDetail1[i] = false;
    }
  }

  //  full name events
  public txtFirstNameKeyup() : void {
    this.customer.fullName = this.customer.lastName + ", " + this.customer.firstName + " " + this.customer.middleName;
  }
  public txtMiddleNameKeyup() : void {
    this.customer.fullName = this.customer.lastName + ", " + this.customer.firstName + " " + this.customer.middleName;
  }
  public txtLastNameKeyup() : void {
    this.customer.fullName = this.customer.lastName + ", " + this.customer.firstName + " " + this.customer.middleName;
  }
  
}