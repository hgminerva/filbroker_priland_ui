// Angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UserService } from './user.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstUser } from '../model/model.mst.user';

@Component({
  templateUrl: './user.list.html'
})

export class UserList {
    public title = 'User List';
    public filterUser : string;

    private currentDate = new Date();
    private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

    private userDeletedSub : any;

    public user : MstUser = {
        id: 0,
        username: "NA",
        fullName: "NA",
        password: "NA",
        status: "OPEN",
        aspNetId:""
    };

    public userData : ObservableArray;
    public userCollection : CollectionView;

    constructor(
        private userService : UserService,
        private toastr : ToastsManager,
        private viewContainer : ViewContainerRef,
        private router : Router
    ) {
        this.toastr.setRootViewContainerRef(viewContainer);
    }

    public ngOnInit() {
        this.getUsers();
    }

    public getUsers() : void {
        this.userData = this.userService.getUsers();
        this.userCollection = new CollectionView(this.userData);
        this.userCollection.pageSize = 15;
        this.userCollection.trackChanges = true;
    }

    public btnAddUserClick() : void {
        (<HTMLButtonElement>document.getElementById("btnAddUser")).disabled = true;
        (<HTMLButtonElement>document.getElementById("btnAddUser")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";
        
        this.userService.addUser(this.user, this.toastr);
    }

    public btnEditUserClick() : void {
        let selectedUser = this.userCollection.currentItem;
        this.router.navigate(['/user', selectedUser.id]);
    }
    
    public btnDeleteUserClick() : void {
        (<HTMLButtonElement>document.getElementById("btnDeleteUser")).disabled = true;
        (<HTMLButtonElement>document.getElementById("btnDeleteCloseUser")).disabled = true;

        let selectedUser = this.userCollection.currentItem;
        this.userService.deleteUser(selectedUser.id);

        this.userDeletedSub = this.userService.userDeletedObservable.subscribe(
            data => {
                if(data == 1) {
                    this.toastr.success("Delete successful.");
                    this.userCollection.remove​(selectedUser);
                    (<HTMLButtonElement>document.getElementById("btnDeleteUser")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnDeleteCloseUser")).disabled = false;
                    document.getElementById("btnDeleteCloseUser").click();
                } else if(data == 0) {
                    this.toastr.error("Delete failed.");   
                    (<HTMLButtonElement>document.getElementById("btnDeleteUser")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnDeleteCloseUser")).disabled = false;
                }
            }
        );
    }

    ngOnDestroy() {
        if( this.userDeletedSub != null) this.userDeletedSub.unsubscribe();
    }
}