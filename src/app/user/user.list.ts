// angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

// wijmo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// service(s)
import { UserService } from './user.service';

// model(s)
import { MstUser } from '../model/model.mst.user';

@Component({
  templateUrl: './user.list.html'
})
export class UserList {

    // ==================
    // private properties
    // ==================

    private currentDate = new Date();
    private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

    // list
    private usersSub : any;

    // =================
    // public properties
    // =================

    public title: string = 'User List';
    public filterUser : string;

    // model(s)
    public user : MstUser = {
        id: 0,
        username: "",
        fullName: "",
        password: "",
        status: "",
        aspNetId:""
    };

    // list data source
    public fgdUsersData : ObservableArray;
    public fgdUsersCollection : CollectionView;

    // =======
    // angular
    // =======

    // constructor
    constructor(
        private userService : UserService,
        private toastr : ToastsManager,
        private viewContainer : ViewContainerRef,
        private router : Router
    ) {
        this.toastr.setRootViewContainerRef(viewContainer);
    }

    // ng
    ngOnInit() {
        this.fgdUsersData = new ObservableArray();
        this.fgdUsersCollection = new CollectionView(this.fgdUsersData);
    
        this.getUsers();
    }
    ngOnDestroy() {
        if( this.usersSub != null) this.usersSub.unsubscribe();
    }

    // ==============
    // public methods
    // ==============

    // list
    public getUsers() : void {
        this.userService.getUsers();

        this.usersSub = this.userService.usersObservable.subscribe(
          data => {
            this.fgdUsersData = data;
            this.fgdUsersCollection = new CollectionView(this.fgdUsersData);
            this.fgdUsersCollection.pageSize = 15;
            this.fgdUsersCollection.trackChanges = true;  
          }
        );
    }

    // ======
    // events
    // ======

    // list opertaions
    public btnEditUserClick() : void {
        let selectedUser = this.fgdUsersCollection.currentItem;
        this.router.navigate(['/user', selectedUser.id]);
    }

}