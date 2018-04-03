// angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// wijmo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// service(s)
import { CustomerService } from './customer.service';
import { SecurityService } from '../security/security.service';

// model(s)
import { MstCustomer } from '../model/model.mst.customer';

@Component({
  templateUrl: './customer.list.html'
})
export class CustomerList {
    
    // ==================
    // private properties
    // ==================

    private currentDate = new Date();
    private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

    // list
    private customersSub : any;

    // list operations
    private customersDeletedSub : any;

    // =================
    // public properties
    // =================

    public title: string = 'Customer List';
    public filterCustomer: string;

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
        birthDate: this.currentDateString,
        citizen: "FILIPINO",
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
        spouseCitizen : "",
        spouseEmployer : "",
        spouseTIN : "",
        remarks: "",
        status: "ACTIVE",
        picture: "",
        isLocked: false,
        createdBy: 0,
        createdDateTime: this.currentDateString,
        updatedBy: 0,
        updatedDateTime: this.currentDateString
    };

    // list data source
    public fgdCustomersData : ObservableArray;
    public fgdCustomersCollection : CollectionView;

    // modals
    public mdlCustomerDeleteShow : boolean = false;

    // =======
    // angular
    // =======

    //constructor
    constructor(
        private customerService : CustomerService,
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
        this.fgdCustomersData = new ObservableArray();
        this.fgdCustomersCollection = new CollectionView(this.fgdCustomersData);

        if(this.securityService.openPage("CUSTOMER LIST") == true) {
            this.getCustomers();
        } else {
            this.toastr.error("No rights to open page.")
            setTimeout(() => { this.location.back(); }, 1000);  
        }
    }
    ngOnDestroy() {
        if( this.customersSub != null) this.customersSub.unsubscribe();
        if( this.customersDeletedSub != null) this.customersDeletedSub.unsubscribe();
    }

    // ==============
    // public methods
    // ==============

    // customer list
    public getCustomers() : void {
        let customers = new ObservableArray();

        this.customerService.getCustomers();

        this.customersSub = this.customerService.customersObservable.subscribe(
          data => {
            if (data.length > 0) {
              this.fgdCustomersData = data;
              this.fgdCustomersCollection = new CollectionView(this.fgdCustomersData);
              this.fgdCustomersCollection.pageSize = 15;
              this.fgdCustomersCollection.trackChanges = true;  
            }
          }
        );
    }

    // ======
    // events
    // ======

    // customer list operations
    public btnAddCustomerClick() : void {
        let btnAddCustomer:Element = document.getElementById("btnAddCustomer");

        btnAddCustomer.setAttribute("disabled","true");
        btnAddCustomer.innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";

        this.customerService.addCustomer(this.customer, btnAddCustomer);
    }
    public btnEditCustomerClick() : void {
        let selectedCustomer = this.fgdCustomersCollection.currentItem;
        this.router.navigate(['/customer', selectedCustomer.id]);
    }
    public btnDeleteCustomerClick() : void {
        this.mdlCustomerDeleteShow = true;
    }

    // customer delete modal operations
    public btnOkCustomerDeleteModalClick() : void {
        let btnOkCustomerDeleteModal:Element = document.getElementById("btnOkCustomerDeleteModal");
        let btnCloseCustomerDeleteModal:Element = document.getElementById("btnCloseCustomerDeleteModal");
    
        let selectedCustomer = this.fgdCustomersCollection.currentItem;
    
        btnOkCustomerDeleteModal.setAttribute("disabled","disabled");
        btnCloseCustomerDeleteModal.setAttribute("disabled","disabled");
    
        this.customerService.deleteCustomer(selectedCustomer.id,);
        this.customersDeletedSub = this.customerService.customerDeletedObservable.subscribe(
            data => {
                if(data == 1) {
                    this.toastr.success("Delete successful.");
                    this.fgdCustomersCollection.remove​(selectedCustomer);
    
                    btnOkCustomerDeleteModal.removeAttribute("disabled");
                    btnCloseCustomerDeleteModal.removeAttribute("disabled");
    
                    this.mdlCustomerDeleteShow = false
                } else if(data == 0) {
                    this.toastr.error("Delete failed.");   
    
                    btnOkCustomerDeleteModal.removeAttribute("disabled");
                    btnCloseCustomerDeleteModal.removeAttribute("disabled");
                }
            }
        );
    }
    public btnCloseCustomerDeleteModalClick() : void {
        this.mdlCustomerDeleteShow = false;
    }
}