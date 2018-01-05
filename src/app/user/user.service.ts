// Angular
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

// Message
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Wijmo
import { ObservableArray } from 'wijmo/wijmo';

// Async
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// Model
//import { MstProject } from '../model/model.mst.project';
import { SysDropDown } from '../model/model.sys.dropDown';
import { MstUser } from '../model/model.mst.user';
import { MstUserRight } from '../model/model.mst.user.right';


@Injectable()
export class UserService {

    public userSource = new Subject<MstUser>();
    public userObservable = this.userSource.asObservable();

    public userRightsSource = new Subject<MstUserRight>();
    public userRightsObservable = this.userSource.asObservable();

    public userDeletedSource = new Subject<number>();
    public userDeletedObservable = this.userDeletedSource.asObservable();

    public userRightsDeletedSource = new Subject<number>();
    public userRightDeletedObservable = this.userDeletedSource.asObservable();

    public userSavedSource = new Subject<number>();
    public userSavedObservable = this.userSavedSource.asObservable();

    public userRightsSavedSource = new Subject<number>();
    public userRightsSavedObservable = this.userSavedSource.asObservable();

    public userLockedSource = new Subject<number>();
    public userLockedObservable = this.userLockedSource.asObservable();

    public userUnlockedSource = new Subject<number>();
    public userUnlockedObservable = this.userUnlockedSource.asObservable();

    public dropDownsSource = new Subject<ObservableArray>();
    public dropDownsObservable = this.dropDownsSource.asObservable();

    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });

    private options = new RequestOptions({ headers: this.headers });

    public getUsers(): ObservableArray {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUser/List";
        let userObservableArray = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        userObservableArray.push({
                            id: results[i].Id,
                            userName: results[i].Username,
                            fullname: results[i].FullName,
                            password: results[i].Password,
                            status: results[i].Status,
                            aspNet: results[i].AspNetId,

                        });
                    }
                }
            }
        );
        return userObservableArray;
    }

    public addUser(user: MstUser, toastr: ToastsManager): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUser/Add";
        this.http.post(url, JSON.stringify(user), this.options).subscribe(
            response => {
                var id = response.json();
                if (id > 0) {
                    this.toastr.success("Add successful.");
                    setTimeout(() => {
                        this.router.navigate(['/user', id]);
                    }, 1000);
                } else {
                    this.toastr.error("Add failed.");
                    (<HTMLButtonElement>document.getElementById("btnAddUser")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnAddUser")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error => {
                this.toastr.error("Server error.");
            }
        )
    }

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

    public getUser(id: number, toastr: ToastsManager) {
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

    public getDropDowns(toastr: ToastsManager) {
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

    public deleteUser(id: number) {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUser/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.userDeletedSource.next(1);
            },
            error => {
                this.userDeletedSource.next(0);
            }
        )
    }

    public getUnits(): ObservableArray {
        let unitObservableArray = new ObservableArray();
        return unitObservableArray;
    }

    public getHouseModels(): ObservableArray {
        let houseModelObservableArray = new ObservableArray();
        return houseModelObservableArray;
    }

    public getUsersRight(): ObservableArray {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUserRight/List";
        let userRightsObservableArray = new ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        userRightsObservableArray.push({
                            id: results[i].Id,
                            userId: results[i].UserID,
                            pageId: results[i].PageID,
                            page: results[i].Page,
                            canEdit: results[i].CanEdit,
                            canSave: results[i].CanSave,
                            canLock: results[i].CanLock,
                            canUnlock: results[i].CanUnLock,
                            canPrint: results[i].CanPrint,

                        });
                    }
                }
            }
        );
        return userRightsObservableArray;
    }




    public getUserRight(id: number, toastr: ToastsManager) {
        let user: MstUserRight;
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUserRight/Detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results != null) {
                    user = {
                        id: results.Id,
                        userId: results.UserId,
                        user: results.User,
                        pageId: results.PageId,
                        page: results.Page,
                        canEdit: results.CanEdit,
                        canSave: results.CanSave,
                        canLock: results.CanLock,
                        canUnlock: results.CanUnLock,
                        canPrint: results.CanPrint,
                    };
                    this.userRightsSource.next(user);
                } else {
                    this.toastr.error("No data.");
                    setTimeout(() => {
                        this.router.navigate(["/user"]);
                    }, 1000);
                }
            }
        );
    }

    public addUserRight(user: MstUser, toastr: ToastsManager): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUserRight/Add";
        this.http.post(url, JSON.stringify(user), this.options).subscribe(
            response => {
                var id = response.json();
                if (id > 0) {
                    this.toastr.success("Add successful.");
                    setTimeout(() => {
                        this.router.navigate(['/user', id]);
                    }, 1000);
                } else {
                    this.toastr.error("Add failed.");
                    (<HTMLButtonElement>document.getElementById("btnAddUserRights")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnAddUserRights")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Add";
                }
            },
            error => {
                this.toastr.error("Server error.");
            }
        )
    }

    public updateUserRight(user: MstUser): void {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUserRight/Update";
        this.http.put(url, JSON.stringify(user), this.options).subscribe(
            response => {
                this.userRightsSavedSource.next(1);
            },
            error => {
                this.userRightsSavedSource.next(0);
            }
        )
    }

    public deleteUserRight(id: number) {
        let url = "http://filbrokerwebsite-priland.azurewebsites.net/api/MstUserRight/Delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.userRightsDeletedSource.next(1);
            },
            error => {
                this.userRightsDeletedSource.next(0);
            }
        )
    }


}