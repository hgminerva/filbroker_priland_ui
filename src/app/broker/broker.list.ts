// Angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { BrokerService } from './broker.service';

// WijMo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstBroker } from '../model/model.mst.broker';

@Component({
  templateUrl: './broker.list.html'
})
export class BrokerList {

  // private properties
  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  private brokersSub: any;
  private brokerDeletedSub: any;

  // public properties
  public title = 'Broker List';
  public filterBroker: string;

  public broker: MstBroker = {
    id: 0,
    brokerCode: "NA",
    lastName: "NA",
    firstName: "NA",
    middleName: "NA",
    fullName: "",
    licenseNumber: "NA",
    birthDate: this.currentDateString,
    civilStatus: "NA",
    gender: "NA",
    address: "NA",
    telephoneNumber: "NA",
    mobileNumber: "NA",
    religion: "NA",
    emailAddress: "NA",
    facebook: "NA",
    tin: "NA",
    realtyFirm: "NA",
    realtyFirmAddress: "NA",
    realtyFirmTelephoneNumber: "NA",
    realtyFirmMobileNumber: "NA",
    realtyFirmFaxNumber: "NA",
    realtyFirmEmailAddress: "NA",
    realtyFirmWebsite: "NA",
    realtyFirmTIN: "NA",
    organization: "NA",
    remarks: "NA",
    picture: "NA",
    status: "NA",
    isLocked: false,
    createdBy: 1,
    createdDateTime: this.currentDateString,
    updatedBy: 1,
    updatedDateTime: this.currentDateString,
  };

  // fgdBroker recordsource
  public fgdBrokerData: ObservableArray;
  public fgdBrokerCollection: CollectionView;

  // modal show flags
  public mdlBrokerDeleteShow : boolean = false;

  // constructor
  constructor(
    private brokerService: BrokerService,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.fgdBrokerData = new ObservableArray();
    this.fgdBrokerCollection = new CollectionView(this.fgdBrokerData);

    this.getBrokers();
  }
  ngOnDestroy() {
    if( this.brokersSub != null) this.brokersSub.unsubscribe();
    if( this.brokerDeletedSub != null) this.brokerDeletedSub.unsubscribe();
  }

  // fill the grid with broker data
  public getBrokers(): void {
    this.brokerService.getBrokers();

    this.brokersSub = this.brokerService.brokersObservable.subscribe(
      data => {
        this.fgdBrokerData = data;
        this.fgdBrokerCollection = new CollectionView(this.fgdBrokerData);
        this.fgdBrokerCollection.pageSize = 15;
        this.fgdBrokerCollection.trackChanges = true;  
      }
    );
  }

  // events
  public btnAddBrokerClick(): void {
    let btnAddBroker: Element = document.getElementById("btnAddBroker");

    btnAddBroker.setAttribute("disabled", "disabled");
    btnAddBroker.innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";

    this.brokerService.addBroker(this.broker);
  }
  public btnEditBrokerClick(): void {
    let selectedBroker = this.fgdBrokerCollection.currentItem;
    this.router.navigate(['/broker', selectedBroker.id]);
  }
  public btnDeleteBrokerClick(): void {
    this.mdlBrokerDeleteShow = true;
  }
  public btnOkBrokerDeleteModalClick():  void {
    let btnOkBrokerDeleteModal: Element = document.getElementById("btnOkBrokerDeleteModal");
    let btnCloseBrokerDeleteModal: Element = document.getElementById("btnCloseBrokerDeleteModal");

    btnOkBrokerDeleteModal.setAttribute("disabled","disabled");
    btnCloseBrokerDeleteModal.setAttribute("disabled","disabled");

    let selectedBroker = this.fgdBrokerCollection.currentItem;

    this.brokerService.deleteBroker(selectedBroker.id);

    this.brokerDeletedSub = this.brokerService.brokerDeletedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Delete successful.");
          this.fgdBrokerCollection.remove​(selectedBroker);

          btnOkBrokerDeleteModal.removeAttribute("disabled");
          btnCloseBrokerDeleteModal.removeAttribute("disabled");

          this.mdlBrokerDeleteShow = false;
        } else if (data == 0) {
          this.toastr.error("Delete failed.");

          btnOkBrokerDeleteModal.removeAttribute("disabled");
          btnCloseBrokerDeleteModal.removeAttribute("disabled");
        }
      }
    );
  }
  public btnCloseBrokerDeleteModalClick(): void {
    this.mdlBrokerDeleteShow = false;
  }
}
