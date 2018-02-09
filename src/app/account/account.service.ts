import { Injectable } from "@angular/core";

import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { User } from './account.user';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { parseHttpResponse } from "selenium-webdriver/http";

import { ObservableArray } from 'wijmo/wijmo';
import { pureObjectDef } from "@angular/core/src/view/pure_expression";

@Injectable()
export class AccountService {
    // ==================
    // private properties
    // ==================
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // =================
    // public properties
    // =================
    public loginSource = new Subject<number>();
    public loginObservable = this.loginSource.asObservable();

    public registerSource = new Subject<number>();
    public registerObservable = this.registerSource.asObservable();

    public registerErrorMessageSource = new Subject<ObservableArray>();
    public registerErrorMessageObservable = this.registerErrorMessageSource.asObservable();

    public user: User = {
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        token: ""
    };

    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager) {
    }

    public login(username: string, password: string): void {
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

                this.getUserRights(response.json().userName);
                this.loginSource.next(1);
            },
            error => {
                this.loginSource.next(0);
            }
        )
    }

    public getUserRights(username: string): void {
        let url = 'https://filbrokerwebsite-priland.azurewebsites.net/api/MstUserRight/ListPerUserByUsername/' + username;
        let headers = new Headers({
                                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                'Content-Type': 'application/json'
                            });
        let options = new RequestOptions({ headers: headers })
        let userRights = new Array();
        this.http.get(url, options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        userRights.push({
                            id: results[i].Id,
                            userId: results[i].UserId,
                            user: username,
                            pageId: results[i].PageId,
                            page: results[i].Page,
                            pageUrl: results[i].PageURL, 
                            canEdit: results[i].CanEdit,
                            canSave: results[i].CanSave,
                            canLock: results[i].CanLock,
                            canUnlock: results[i].CanUnLock,
                            canPrint: results[i].CanPrint,
                            canDelete: results[i].CanDelete
                        });
                    }
                    localStorage.setItem('userRights', JSON.stringify(userRights));
                } 
            }
        );
    }

    public register(user: User): void {
        let regObj = {
            FullName: user.fullname,
            UserName: user.username,
            Email: user.username,
            Password: user.password,
            ConfirmPassword: user.confirmPassword
        }

        var registerMessageObservableArray = new ObservableArray();
        var successMessageArray = new ObservableArray();
        var mainErrorMessageArray = new ObservableArray();
        var fullnameErrorMessageArray = new ObservableArray();
        var usernameErrorMessageArray = new ObservableArray();
        var passwordErrorMessageArray = new ObservableArray();
        var confirmPasswordErrorMessageArray = new ObservableArray();

        let url = "https://filbrokerwebsite-priland.azurewebsites.net/api/account/register";
        this.http.post(url, JSON.stringify(regObj), this.options).subscribe(
            response => {
                if (response != null) {
                    successMessageArray.push({
                        message: "Register Successful"
                    });

                    registerMessageObservableArray.push({
                        successMessageArray: successMessageArray,
                        mainErrorMessageArray: null,
                        fullnameErrorMessageArray: null,
                        usernameErrorMessageArray: null,
                        passwordErrorMessageArray: null,
                        confirmPasswordErrorMessageArray: null
                    });

                    this.registerErrorMessageSource.next(registerMessageObservableArray);
                    this.registerSource.next(1);
                }
            },
            error => {
                var errMessage = error.json();
                if (errMessage != null) {
                    if (error.json().ModelState[""] != null) {
                        let mainErrorMessageLength = error.json().ModelState[""].length;
                        for (var i = 0; i < mainErrorMessageLength; i++) {
                            mainErrorMessageArray.push({
                                message: error.json().ModelState[""][i]
                            });
                        }
                    }

                    if (error.json().ModelState["model.FullName"] != null) {
                        let fullnameErrorMessageLength = error.json().ModelState["model.FullName"].length;
                        for (var i = 0; i < fullnameErrorMessageLength; i++) {
                            fullnameErrorMessageArray.push({
                                message: error.json().ModelState["model.FullName"][i]
                            });
                        }
                    }

                    if (error.json().ModelState["model.UserName"] != null) {
                        let usernameErrorMessageLength = error.json().ModelState["model.UserName"].length;
                        for (var i = 0; i < usernameErrorMessageLength; i++) {
                            usernameErrorMessageArray.push({
                                message: error.json().ModelState["model.UserName"][i]
                            });
                        }
                    }

                    if (error.json().ModelState["model.Password"] != null) {
                        let passwordErrorMessageLength = error.json().ModelState["model.Password"].length;
                        for (var i = 0; i < passwordErrorMessageLength; i++) {
                            passwordErrorMessageArray.push({
                                message: error.json().ModelState["model.Password"][i]
                            });
                        }
                    }

                    if (error.json().ModelState["model.ConfirmPassword"] != null) {
                        let confirmPasswordErrorMessageLength = error.json().ModelState["model.ConfirmPassword"].length;
                        for (var i = 0; i < confirmPasswordErrorMessageLength; i++) {
                            confirmPasswordErrorMessageArray.push({
                                message: error.json().ModelState["model.ConfirmPassword"][i]
                            });
                        }
                    }

                    registerMessageObservableArray.push({
                        successMessageArray: null,
                        mainErrorMessageArray: mainErrorMessageArray,
                        fullnameErrorMessageArray: fullnameErrorMessageArray,
                        usernameErrorMessageArray: usernameErrorMessageArray,
                        passwordErrorMessageArray: passwordErrorMessageArray,
                        confirmPasswordErrorMessageArray: confirmPasswordErrorMessageArray
                    });

                    this.registerErrorMessageSource.next(registerMessageObservableArray);
                    this.registerSource.next(0);
                }
            }
        )
    }
}


