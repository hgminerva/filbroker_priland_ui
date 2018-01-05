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
  public title = 'Broker List';
  public filterBroker: string;

  private currentDate = new Date();
  private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

  private brokerSub: any;
  private brokerDeletedSub: any;

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

  public brokerData: ObservableArray;
  public brokerCollection: CollectionView;

  constructor(
    private brokerService: BrokerService,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  public ngOnInit() {
    this.getBrokers();
  }

  public getBrokers(): void {
    this.brokerData = this.brokerService.getBrokers();
    this.brokerCollection = new CollectionView(this.brokerData);
    this.brokerCollection.pageSize = 15;
    this.brokerCollection.trackChanges = true;
  }

  public btnAddBrokerClick(): void {
    let btnAddBroker: Element = document.getElementById("btnAddBroker");

    btnAddBroker.setAttribute("disabled", "disabled");
    btnAddBroker.innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";

    this.brokerService.addBroker(this.broker, btnAddBroker);
  }

  public btnEditBrokerClick(): void {
    let selectedBroker = this.brokerCollection.currentItem;
    this.router.navigate(['/broker', selectedBroker.id]);
  }

  public btnDeleteBrokerClick(): void {
    let btnDeleteBroker: Element = document.getElementById("btnDeleteBroker");
    let btnDeleteCloseBroker: Element = document.getElementById("btnDeleteCloseBroker");

    let selectedBroker = this.brokerCollection.currentItem;
    this.brokerService.deleteBroker(selectedBroker.id);

    this.brokerDeletedSub = this.brokerService.brokerDeletedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Delete successful.");
          this.brokerCollection.remove​(selectedBroker);

          btnDeleteBroker.removeAttribute("disabled");
          btnDeleteCloseBroker.removeAttribute("disabled");

          document.getElementById("btnDeleteCloseBroker").click();
        } else if (data == 0) {
          this.toastr.error("Delete failed.");

          btnDeleteBroker.removeAttribute("disabled");
          btnDeleteCloseBroker.removeAttribute("disabled");
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.brokerDeletedSub != null) this.brokerDeletedSub.unsubscribe();
  }
}
