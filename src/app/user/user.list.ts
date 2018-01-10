// Angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UserService } from './user.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstUser } from '../model/model.mst.user';

@Component({
  templateUrl: './user.list.html'
})
export class UserList {

    // private properties
    private currentDate = new Date();
    private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

    private usersSub : any;

    // public properties
    public title = 'User List';
    public filterUser : string;

    public user : MstUser = {
        id: 0,
        username: "",
        fullName: "",
        password: "",
        status: "",
        aspNetId:""
    };

    public fgdUsersData : ObservableArray;
    public fgdUsersCollection : CollectionView;

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

    // public methods
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

    // events
    public btnEditUserClick() : void {
        let selectedUser = this.fgdUsersCollection.currentItem;
        this.router.navigate(['/user', selectedUser.id]);
    }

}