import { Injectable } from "@angular/core";

import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { User } from './account.user';

@Injectable()
export class AccountService {
    public loginSource = new Subject<number>();
    public loginObservable = this.loginSource.asObservable();   

    public user: User = {
        username: "",
        password: "",
        token: ""
      };

    constructor ( 
        private router: Router, 
        private http: Http) {
    }

    public login(username: string, password: string): void 
    {
        let url = 'https://filbrokerwebsite-priland.azurewebsites.net/token';
        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers })
    
        this.http.post(url, body, options).subscribe(
            response => {
                localStorage.setItem('access_token', response.json().access_token);
                localStorage.setItem('expires_in', response.json().expires_in);
                localStorage.setItem('token_type', response.json().token_type);
                localStorage.setItem('username', response.json().userName);

                this.loginSource.next(1);
            },
            error => {
                this.loginSource.next(0);
            }
        )
    }
}


