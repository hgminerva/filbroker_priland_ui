// angular
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// wijmo
import { ObservableArray } from 'wijmo/wijmo';

// async
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// model(s)
import { SysDropDown } from '../model/model.sys.dropDown';
import { MstUser } from '../model/model.mst.user';
import { MstUserRight } from '../model/model.mst.user.right';

@Injectable()
export class UserService {

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

    // user list
    public usersSource = new Subject<ObservableArray>();
    public usersObservable = this.usersSource.asObservable();

    // user detail
    public userSource = new Subject<MstUser>();
    public userObservable = this.userSource.asObservable();

    // user detail operations
    public userSavedSource = new Subject<number>();
    public userSavedObservable = this.userSavedSource.asObservable();

    // detail line1 (user rights) list
    public userRightsSource = new Subject<ObservableArray>();
    public userRightsObservable = this.userRightsSource.asObservable();

    // detail line1 (user rights) 
    public userRightSource = new Subject<MstUserRight>();
    public userRightObservable = this.userRightSource.asObservable();

    // detail line1 (user rights) operations
    public userRightDeletedSource = new Subject<number>();
    public userRightDeletedObservable = this.userRightDeletedSource.asObservable();

    public userRightSavedSource = new Subject<number>();
    public userRightSavedObservable = this.userRightSavedSource.asObservable();

    // detail combo boxes
    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable();

    // detail line1 combo boxes
    public pagesSource = new Subject<ObservableArray>();
    public pagesObservable = this.pagesSource.asObservable();

    // =======
    // angular
    // =======

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // =================
    // public properties
    // =================

    // list
    public getUsers(): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUser/List";
        let users = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        users.push({
                            id: results[i].Id,
                            userName: results[i].Username,
                            fullname: results[i].FullName,
                            password: results[i].Password,
                            status: results[i].Status,
                            aspNet: results[i].AspNetId
                        });
                    }
                    this.usersSource.next(users);
                } else {
                    this.toastr.error("No users."); 
                }
            }
        );
    }

    // detail
    public getUser(id: number) {
        let user: MstUser;
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUser/Detail/" + id;
        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results != null) {
                    user = {
                        id: results.Id,
                        username: results.Username,
                        fullName: results.FullName,
                        password: results.Password,
                        status: results.Status,
                        aspNetId: results.AspNetId,
                    };
                    this.userSource.next(user);
                } else {
                    this.toastr.error("No data.");
                    setTimeout(() => {
                        this.router.navigate(["/user"]);
                    }, 1000);
                }
            }
        );
    }

    // detail operation(s)
    public saveUser(user: MstUser): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUser/Save";
        this.http.put(url, JSON.stringify(user), this.options).subscribe(
            response => {
                this.userSavedSource.next(1);
            },
            error => {
                this.userSavedSource.next(0);
            }
        )
    }

    // detail combo boxes
    public getDropDowns() {
        let dropDowns = new ObservableArray();
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysDropDown/List";
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        dropDowns.push({
                            id: results[i].Id,
                            category: results[i].Category,
                            description: results[i].Description,
                            value: results[i].Value
                        });
                    }
                    this.dropDownsSource.next(dropDowns);
                } else {
                    this.toastr.error("No data.");
                }
            }
        );

    }

    // detail line1 (user rights) list
    public getUserRightsPerUser(id: number): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUserRight/ListPerUser/" + id;
        let userRights = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        userRights.push({
                            id: results[i].Id,
                            userId: results[i].UserId,
                            pageId: results[i].PageId,
                            page: results[i].Page,
                            canEdit: results[i].CanEdit,
                            canSave: results[i].CanSave,
                            canLock: results[i].CanLock,
                            canUnlock: results[i].CanUnLock,
                            canPrint: results[i].CanPrint,
                            canDelete: results[i].CanDelete
                        });
                    }
                    this.userRightsSource.next(userRights);
                } else {
                    this.toastr.error("No user rights."); 
                }
            }
        );
    }

    // detail line1 (user rights) operations
    public saveUserRight(userRight: MstUserRight): void {
        if(userRight.id == 0) {
            let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUserRight/Add";
            this.http.post(url, JSON.stringify(userRight), this.options).subscribe(
                response => {
                    this.userRightSavedSource.next(1);
                },
                error => {
                    this.userRightSavedSource.next(0);
                }
            )
        } else {
            let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUserRight/Save";
            this.http.put(url, JSON.stringify(userRight), this.options).subscribe(
                response => {
                    this.userRightSavedSource.next(1);
                },
                error => {
                    this.userRightSavedSource.next(0);
                }
            )
        }
    }
    public deleteUserRight(id: number) {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUserRight/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.userRightDeletedSource.next(1);
            },
            error => {
                this.userRightDeletedSource.next(0);
            }
        )
    }

    // detail line1 combo boxes
    public getPages() {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/SysPage/List";
        let pages = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        pages.push({
                            id: results[i].Id,
                            page: results[i].Page,
                            url: results[i].Url
                        });
                    }
                    this.pagesSource.next(pages);
                } else {
                    this.toastr.error("No pages."); 
                }
            }
        );
    }

}