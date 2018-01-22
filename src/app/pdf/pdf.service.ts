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

    // customer
    public pdfCustomerSource = new Subject<Blob>();
    public pdfCustomerObservable = this.pdfCustomerSource.asObservable();

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
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/PDF/Customer/" + id;
        
        console.log(url);

        this.http.get(url, { responseType: ResponseContentType.Blob }).subscribe((response) => {
            let pdf = new Blob([response.blob()], { type: 'application/pdf' });
            this.pdfCustomerSource.next(pdf);
        });
    }

}