// Angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { CustomerService } from './customer.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstCustomer } from '../model/model.mst.customer';

@Component({
  templateUrl: './project.detail.html'
})

export class CustomerDetail {
  public title = 'Customer Detail';

  public customerStatusData : ObservableArray;

  private customerSub : any;
  private customerSavedSub : any;
  private customerLockedSub : any;
  private customerUnlockedSub : any;
  private customerStatusSub : any;

  public customer : MstCustomer = {
     id: 0,
    customerCode: "NA",
    lastName: "NA",
    firstName: "NA",
    middleName: "NA",
    civilStatus: "NA",
    gender: "NA",
    birthDate: "NA",
    tin: "NA",
    idType: "NA",
    idNumber: "NA",
    address: "NA",
    city: "NA",
    province: "NA",
    country: "NA",
    zipCode: "NA",
    emailAddress: "NA",
    telephoneNumber: "NA",
    mobileNumber: "NA",
    employer: "NA",
    employerIndustry: "NA",
    noOfYearsEmployed: "NA",
    position: "NA",
    employmentStatus: "OPEN",
    employerAddress: "NA",
    employerCity: "NA",
    employerProvince: "NA",
    employerCountry: "NA",
    employerZipCode: "NA",
    employerTelephoneNumber: "NA",
    employerMobileNumber: "NA",
    remarks: "NA",
    status: "OPEN",
    picture: "NA",
    isLocked: "false",
    createdBy: "",
    createdDateTime: "",
    updatedBy: "",
    updatedDateTime: ""
  };

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  public ngOnInit() {
    this.getDropDowns();
    this.getProject();
  }
  
  public ngOnDestroy() {
    if( this.projectSub != null) this.projectSub.unsubscribe();
    if( this.projectSavedSub != null) this.projectSavedSub.unsubscribe();
    if( this.projectStatusSub != null) this.projectStatusSub.unsubscribe();
    if( this.projectLockedSub != null) this.projectLockedSub.unsubscribe();
    if( this.projectUnlockedSub != null) this.projectUnlockedSub.unsubscribe();
  }

  public getIdParameter() {
    let id = 0;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  public getProject() {
    this.projectService.getProject(this.getIdParameter(), this.toastr);

    this.projectSub = this.projectService.projectObservable
      .subscribe(
        data => {
          this.project.id = data.id;
          this.project.projectCode = data.projectCode;
          this.project.project = data.project;
          this.project.address = data.address;
          this.project.status = data.status;
          this.project.isLocked = data.isLocked;
          this.project.createdBy = data.createdBy;
          this.project.createdDateTime = data.createdDateTime;
          this.project.updatedBy = data.updatedBy;
          this.project.updatedDateTime= data.updatedDateTime;
        }
      );
  }

  public getDropDowns() : void {
    this.projectService.getDropDowns(this.toastr);

    this.projectStatusSub = this.projectService.dropDownsObservable.subscribe(
      data => {
        let projectStatuses = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "PROJECT STATUS") {
              projectStatuses.push({
                id: data[i].id,
                category: data[i].category,
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }

        this.projectStatusData = projectStatuses;
      }
    );
  }

  public btnSaveProjectClick() : void {
    (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    
    this.projectService.saveProject(this.project);

    this.projectSavedSub =  this.projectService.projectSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = false;
              (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = true;
              (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          }
      }
    );
  }

  public btnLockProjectClick() : void {
    (<HTMLButtonElement>document.getElementById("btnLockProject")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnLockProject")).innerHTML = "<i class='fa fa-lock fa-fw'></i> Locking...";
    
    this.projectService.lockProject(this.project);

    this.projectLockedSub =  this.projectService.projectLockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Locking successful.");
              this.project.isLocked = true;
              (<HTMLButtonElement>document.getElementById("btnLockProject")).disabled = false;
              (<HTMLButtonElement>document.getElementById("btnLockProject")).innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          } else if(data == 0) {
              this.toastr.error("Locking failed.");   
              (<HTMLButtonElement>document.getElementById("btnLockProject")).disabled = false;
              (<HTMLButtonElement>document.getElementById("btnLockProject")).innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          }
      }
    );
  }

  public btnUnlockProjectClick() : void {
    (<HTMLButtonElement>document.getElementById("btnUnlockProject")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnUnlockProject")).innerHTML = "<i class='fa fa-unlock fa-fw'></i> Unlocking...";
    
    this.projectService.unlockProject(this.project);

    this.projectUnlockedSub = this.projectService.projectUnlockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Unlocking successful.");
              this.project.isLocked = false;
              (<HTMLButtonElement>document.getElementById("btnUnlockProject")).disabled = false;
              (<HTMLButtonElement>document.getElementById("btnUnlockProject")).innerHTML = "<i class='fa fa-unlock fa-fw'></i> Unlock";
          } else if(data == 0) {
              this.toastr.error("Unlocking failed.");   
              (<HTMLButtonElement>document.getElementById("btnUnlockProject")).disabled = false;
              (<HTMLButtonElement>document.getElementById("btnUnlockProject")).innerHTML = "<i class='fa fa-unlock fa-fw'></i> Unlock";
          }
      }
    );
  }




}