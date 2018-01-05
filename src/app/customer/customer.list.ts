// Angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { CustomerService } from './customer.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstCustomer } from '../model/model.mst.customer';

@Component({
  templateUrl: './customer.list.html'
})

export class CustomerList {
    public title = 'Customer List';
    public filterCustomer : string;

    private currentDate = new Date();
    private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

    private customerDeletedSub : any;

    public customer : MstCustomer = {
        id: 0,
        customerCode: "NA",
        lastName: "NA",
        firstName: "NA",
        middleName: "NA",
        fullName: "",
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
        createdBy: "1",
        createdDateTime: this.currentDateString,
        updatedBy: "1",
        updatedDateTime: this.currentDateString
    };

    public customerData : ObservableArray;
    public customerCollection : CollectionView;

    constructor(
        private customerService : CustomerService,
        private toastr : ToastsManager,
        private viewContainer : ViewContainerRef,
        private router : Router
    ) {
        this.toastr.setRootViewContainerRef(viewContainer);
    }

    public ngOnInit() {
        this.getCustomers();
    }

    public getCustomers() : void {
        this.customerData = this.customerService.getCustomers();
        this.customerCollection = new CollectionView(this.customerData);
        this.customerCollection.pageSize = 15;
        this.customerCollection.trackChanges = true;
    }

    public btnAddCustomerClick() : void {
        (<HTMLButtonElement>document.getElementById("btnAddCustomer")).disabled = true;
        (<HTMLButtonElement>document.getElementById("btnAddCustomer")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";
        
        this.customerService.addCustomer(this.customer, this.toastr);
    }

    public btnEditCustomerClick() : void {
        let selectedCustomer = this.customerCollection.currentItem;
        this.router.navigate(['/project', selectedCustomer.id]);
    }
    
    public btnDeleteCustomerClick() : void {
        (<HTMLButtonElement>document.getElementById("btnDeleteCustomer")).disabled = true;
        (<HTMLButtonElement>document.getElementById("btnDeleteCloseCustomer")).disabled = true;

        let selectedCustomer = this.customerCollection.currentItem;
        this.customerService.deleteCustomer(selectedCustomer.id);

        this.customerDeletedSub = this.customerService.CustomerDeletedObservable.subscribe(
            data => {
                if(data == 1) {
                    this.toastr.success("Customer Delete successful.");
                    this.customerCollection.remove​(selectedCustomer);
                    (<HTMLButtonElement>document.getElementById("btnCustomerProject")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnCustomerCloseProject")).disabled = false;
                    document.getElementById("btnDeleteCloseCustomer").click();
                } else if(data == 0) {
                    this.toastr.error("Customer Delete failed.");   
                    (<HTMLButtonElement>document.getElementById("btnDeleteCustomer")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnDeleteCloseCustomer")).disabled = false;
                }
            }
        );
    }

    ngOnDestroy() {
        if( this.customerDeletedSub != null) this.customerDeletedSub.unsubscribe();
    }
}