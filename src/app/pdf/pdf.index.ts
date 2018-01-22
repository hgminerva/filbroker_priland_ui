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
    });
  }
  ngOnDestroy() {
    if( this.pdfCustomerSub != null) this.pdfCustomerSub.unsubscribe();
  }

  // ==============
  // public methods
  // ==============

  public getPDFCustomer(id: number) : void {
    this.pdfService.getPDFCustomer(id);
    console.log(id);
    this.pdfCustomerSub = this.pdfService.pdfCustomerObservable.subscribe(
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