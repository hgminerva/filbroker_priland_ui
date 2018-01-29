// angular
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// wijmo
import { ObservableArray } from 'wijmo/wijmo';

// async
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PDFService {

    // ==================
    // private properties
    // ==================

    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // =================
    // public properties
    // =================

    public pdfCustomerSource = new Subject<Blob>();
    public pdfCustomerObservable = this.pdfCustomerSource.asObservable();

    public pdfBrokerSource = new Subject<Blob>();
    public pdfBrokerObservable = this.pdfBrokerSource.asObservable();

    public pdfChecklistSource = new Subject<Blob>();
    public pdfChecklistObservable = this.pdfChecklistSource.asObservable();

    public pdfSoldUnitProposalSource = new Subject<Blob>();
    public pdfSoldUnitProposalObservable = this.pdfSoldUnitProposalSource.asObservable();
    public pdfSoldUnitContractSource = new Subject<Blob>();
    public pdfSoldUnitContractObservable = this.pdfSoldUnitContractSource.asObservable();

    // =======
    // angular
    // =======

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // ==============
    // public methods
    // ==============

    public getPDFCustomer(id: number): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/PDF/Customer/" + id;
        
        console.log(url);

        this.http.get(url, { responseType: ResponseContentType.Blob }).subscribe((response) => {
            let pdf = new Blob([response.blob()], { type: 'application/pdf' });
            this.pdfCustomerSource.next(pdf);
        });
    }
    public getPDFBroker(id: number): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/PDF/Broker/" + id;
        
        console.log(url);

        this.http.get(url, { responseType: ResponseContentType.Blob }).subscribe((response) => {
            let pdf = new Blob([response.blob()], { type: 'application/pdf' });
            this.pdfBrokerSource.next(pdf);
        });
    }
    public getPDFChecklist(id: number): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/PDF/Checklist/" + id;
        
        console.log(url);

        this.http.get(url, { responseType: ResponseContentType.Blob }).subscribe((response) => {
            let pdf = new Blob([response.blob()], { type: 'application/pdf' });
            this.pdfChecklistSource.next(pdf);
        });
    }
    public getPDFSoldUnitProposal(id: number): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/PDF/SoldUnitProposal/" + id;
        
        console.log(url);

        this.http.get(url, { responseType: ResponseContentType.Blob }).subscribe((response) => {
            let pdf = new Blob([response.blob()], { type: 'application/pdf' });
            this.pdfSoldUnitProposalSource.next(pdf);
        });
    }
    public getPDFSoldUnitContract(id: number): void {
        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/PDF/SoldUnitContract/" + id;
        
        console.log(url);

        this.http.get(url, { responseType: ResponseContentType.Blob }).subscribe((response) => {
            let pdf = new Blob([response.blob()], { type: 'application/pdf' });
            this.pdfSoldUnitContractSource.next(pdf);
        });
    }
    
}