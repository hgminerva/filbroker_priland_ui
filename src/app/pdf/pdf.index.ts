// angular
import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// services
import { PDFService } from './pdf.service';

@Component({
  templateUrl: './pdf.index.html'
})
export class PDFIndex {

  // ==================
  // private properties
  // ==================
  private pdfCustomerSub : any;
  private pdfBrokerSub : any;
  private pdfChecklistSub : any;
  private pdfSoldUnitProposalSub : any;
  private pdfSoldUnitContractSub : any;

  public title: string = "PDF";
  public report: string = "";
  public id: number = 0;

  public pdfUrl: string;

  // =======
  // angular
  // =======

  constructor(
    private pdfService: PDFService,
    private activatedRoute: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.report = params['report'];
      this.id = params['id'];

      if(this.report == "customer") this.getPDFCustomer(this.id);
      if(this.report == "broker") this.getPDFBroker(this.id);
      if(this.report == "checklist") this.getPDFChecklist(this.id);
      if(this.report == "soldunitproposal") this.getPDFSoldUnitProposal(this.id);
      if(this.report == "soldunitcontract") this.getPDFSoldUnitContract(this.id);
    });
  }
  ngOnDestroy() {
    if( this.pdfCustomerSub != null) this.pdfCustomerSub.unsubscribe();
    if( this.pdfBrokerSub != null) this.pdfBrokerSub.unsubscribe();
    if( this.pdfChecklistSub != null) this.pdfChecklistSub.unsubscribe();
    if( this.pdfSoldUnitProposalSub != null) this.pdfSoldUnitProposalSub.unsubscribe();
    if( this.pdfSoldUnitContractSub != null) this.pdfSoldUnitContractSub.unsubscribe();
  }

  // ==============
  // public methods
  // ==============

  public getPDFCustomer(id: number) : void {
    this.pdfService.getPDFCustomer(id);
    this.pdfCustomerSub = this.pdfService.pdfCustomerObservable.subscribe(
      data => {
        this.pdfUrl = URL.createObjectURL(data);

        let printPDF: Element = document.getElementById("printPDF");
        printPDF.setAttribute("src",this.pdfUrl);
      }
    );
  }
  public getPDFBroker(id: number) : void {
    this.pdfService.getPDFBroker(id);
    this.pdfBrokerSub = this.pdfService.pdfBrokerObservable.subscribe(
      data => {
        this.pdfUrl = URL.createObjectURL(data);

        let printPDF: Element = document.getElementById("printPDF");
        printPDF.setAttribute("src",this.pdfUrl);
      }
    );
  }
  public getPDFChecklist(id: number) : void {
    this.pdfService.getPDFChecklist(id);
    this.pdfChecklistSub = this.pdfService.pdfChecklistObservable.subscribe(
      data => {
        this.pdfUrl = URL.createObjectURL(data);

        let printPDF: Element = document.getElementById("printPDF");
        printPDF.setAttribute("src",this.pdfUrl);
      }
    );
  }
  public getPDFSoldUnitProposal(id: number) : void {
    this.pdfService.getPDFSoldUnitProposal(id);
    this.pdfSoldUnitProposalSub = this.pdfService.pdfSoldUnitProposalObservable.subscribe(
      data => {
        this.pdfUrl = URL.createObjectURL(data);

        let printPDF: Element = document.getElementById("printPDF");
        printPDF.setAttribute("src",this.pdfUrl);
      }
    );
  }
  public getPDFSoldUnitContract(id: number) : void {
    this.pdfService.getPDFSoldUnitContract(id);
    this.pdfSoldUnitContractSub = this.pdfService.pdfSoldUnitContractObservable.subscribe(
      data => {
        this.pdfUrl = URL.createObjectURL(data);

        let printPDF: Element = document.getElementById("printPDF");
        printPDF.setAttribute("src",this.pdfUrl);
      }
    );
  }

  // ======
  // events
  // ======

  public btnPrintPDFClick(): void {
    window.frames["printPDF"].focus();
    window.frames["printPDF"].print();
  }
  public btnClosePDFClick(): void {
    this.location.back();
  }
  
}