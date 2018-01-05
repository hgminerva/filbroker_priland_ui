// Angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { UserService } from './user.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstUser } from '../model/model.mst.user';
import { MstUserRight } from '../model/model.mst.user.right';

@Component({
  templateUrl: './user.detail.html'
})

export class UserDetail {

  // for the user Rights
  public titleUserRights='User Rights';

  // user details
  public title = 'User Detail';

  public userStatusData : ObservableArray;
  public userRightStatusData: ObservableArray;

  private userSub : any;
  private userSavedSub : any;
  private userStatusSub : any;
  // private mdlSampleIsOpen : boolean = false;

  public user : MstUser = {
    id: 0,
    username: "",
    fullName: "",
    password: "",
    status: "",
    aspNetId: ""
  };


  public userRights: MstUserRight ={
    id:  0, 
    userId:  0,
    user: "",
    pageId: 0,
    page:  "",
    canEdit: false,
    canSave: false,
    canLock: false,
    canUnlock:false,
    canPrint: false,  
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  public userRightData : ObservableArray;
  public userRightCollection : CollectionView;


  public ngOnInit() {
    this.getDropDowns();
    this.getUser();
    //this.getUsersRights();
  }
  
  public ngOnDestroy() {
    if( this.userSub != null) this.userSub.unsubscribe();
    if( this.userSavedSub != null) this.userSavedSub.unsubscribe();
    if( this.userStatusSub != null) this.userStatusSub.unsubscribe();
  }

//   private openModal(open : boolean) : void {
//     this.mdlSampleIsOpen = open;
// }

  public getIdParameter() {
    let id = 0;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

//   public getUsersRights() : void {
//     this.userRightData = this.userService.getUsersRight();
//     this.userRightCollection = new CollectionView(this.userRightData);
//     this.userRightCollection.pageSize = 15;
//     this.userRightCollection.trackChanges = true;
// }

// Kulang pa wala na human
// public getUsersRights() {
//   this.userService.getUser(this.getIdParameter(), this.toastr);

//   this.userSub = this.userService.userObservable
//     .subscribe(
//       data => {
//         this.userRights.id= data.id;
//         this.userRights.username = data.username;
//         this.userRights.userId = data.fullName;
//         this.user.password = data.password;
//         this.user.status = data.status;
//         this.user.aspNetId= data.aspNetId;
//       }
//     );
// }

  public getUser() {
    this.userService.getUser(this.getIdParameter(), this.toastr);

    this.userSub = this.userService.userObservable
      .subscribe(
        data => {
          this.user.id= data.id;
          this.user.username = data.username;
          this.user.fullName = data.fullName;
          this.user.password = data.password;
          this.user.status = data.status;
          this.user.aspNetId= data.aspNetId;
        }
      );
  }

  // Dropdown for the User Details
  public getDropDowns() : void {
    this.userService.getDropDowns(this.toastr);

    this.userStatusSub = this.userService.dropDownsObservable.subscribe(
      data => {
        let userStatuses = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "USER STATUS") {
              userStatuses.push({
                id: data[i].id,
                category: data[i].category,
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }

        this.userStatusData = userStatuses;
      }
    );
  }

  // Drop down for UserRights modal
  public getPageDropDowns() : void {
    this.userService.getDropDowns(this.toastr);

    this.userStatusSub = this.userService.dropDownsObservable.subscribe(
      data => {
        let userRightStatuses = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "USER STATUS") {
              userRightStatuses.push({
                id: data[i].id,
                category: data[i].category,
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }

        this.userRightStatusData = userRightStatuses;
      }
    );
  }


  // button for the  User Details
  public btnSaveUserClick() : void {
    (<HTMLButtonElement>document.getElementById("btnSaveUser")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnSaveUser")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    
    this.userService.saveUser(this.user);

    this.userSavedSub =  this.userService.userSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              (<HTMLButtonElement>document.getElementById("btnSaveUser")).disabled = false;
              (<HTMLButtonElement>document.getElementById("btnSaveUser")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              (<HTMLButtonElement>document.getElementById("btnSaveUser")).disabled = true;
              (<HTMLButtonElement>document.getElementById("btnSaveUser")).innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          }
      }
    );
  }

  // public btnLockUserClick() : void {
  //   (<HTMLButtonElement>document.getElementById("btnLockProject")).disabled = true;
  //   (<HTMLButtonElement>document.getElementById("btnLockProject")).innerHTML = "<i class='fa fa-lock fa-fw'></i> Locking...";
    
  //   this.projectService.lockProject(this.project);

  //   this.projectLockedSub =  this.projectService.projectLockedObservable.subscribe(
  //     data => {
  //         if(data == 1) {
  //             this.toastr.success("Locking successful.");
  //             this.project.isLocked = true;
  //             (<HTMLButtonElement>document.getElementById("btnLockProject")).disabled = false;
  //             (<HTMLButtonElement>document.getElementById("btnLockProject")).innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
  //         } else if(data == 0) {
  //             this.toastr.error("Locking failed.");   
  //             (<HTMLButtonElement>document.getElementById("btnLockProject")).disabled = false;
  //             (<HTMLButtonElement>document.getElementById("btnLockProject")).innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
  //         }
  //     }
  //   );
  // }

  // public btnUnlockProjectClick() : void {
  //   (<HTMLButtonElement>document.getElementById("btnUnlockProject")).disabled = true;
  //   (<HTMLButtonElement>document.getElementById("btnUnlockProject")).innerHTML = "<i class='fa fa-unlock fa-fw'></i> Unlocking...";
    
  //   this.projectService.unlockProject(this.project);

  //   this.projectUnlockedSub = this.projectService.projectUnlockedObservable.subscribe(
  //     data => {
  //         if(data == 1) {
  //             this.toastr.success("Unlocking successful.");
  //             this.project.isLocked = false;
  //             (<HTMLButtonElement>document.getElementById("btnUnlockProject")).disabled = false;
  //             (<HTMLButtonElement>document.getElementById("btnUnlockProject")).innerHTML = "<i class='fa fa-unlock fa-fw'></i> Unlock";
  //         } else if(data == 0) {
  //             this.toastr.error("Unlocking failed.");   
  //             (<HTMLButtonElement>document.getElementById("btnUnlockProject")).disabled = false;
  //             (<HTMLButtonElement>document.getElementById("btnUnlockProject")).innerHTML = "<i class='fa fa-unlock fa-fw'></i> Unlock";
  //         }
  //     }
  //   );
  // }







}