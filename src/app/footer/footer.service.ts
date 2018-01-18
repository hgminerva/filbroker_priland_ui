// Angular
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

// Wijmo
import { ObservableArray } from 'wijmo/wijmo';

// Async
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FooterService {
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });

    private options = new RequestOptions({ headers: this.headers });

    public usersSource = new Subject<ObservableArray>();
    public usersObservable = this.usersSource.asObservable();    

    constructor(
        private router: Router,
        private http: Http
    ) { }

    public getUsers() : void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUser/List";
        let users = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        users.push({
                            id: results[i].Id,
                            fullName: results[i].FullName
                        });
                    }
                    this.usersSource.next(users);
                } 
            }
        );
    }
}