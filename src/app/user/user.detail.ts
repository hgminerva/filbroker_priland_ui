// angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// wijmo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// service(s)
import { UserService } from './user.service';

// model(s)
import { MstUser } from '../model/model.mst.user';
import { MstUserRight } from '../model/model.mst.user.right';

@Component({
  templateUrl: './user.detail.html'
})
export class UserDetail {

  // ==================
  // private properties
  // ==================

  // detail
  private userSub : any;

  // detail operations
  private userSavedSub : any;

  // detail combo boxes
  private userStatusesSub : any;

  // detail line1 (user rights)
  private userRightsSub : any;

  // detail line1 (user rights) operations
  private userRightDeletedSub : any;
  private userRightPagesSub : any;

  // =================
  // public properties
  // =================

  public title: string = 'User Detail';

  // combo boxes data
  public cmbUserStatusData : ObservableArray;
  public cmbUserRightPagesData: ObservableArray;

  // model(s)
  public user : MstUser = {
    id: 0,
    username: "",
    fullName: "",
    password: "",
    status: "",
    aspNetId: ""
  };
  public userRight: MstUserRight = {
    id:  0, 
    userId:  0,
    user: "",
    pageId: 0,
    page:  "",
    canEdit: false,
    canSave: false,
    canLock: false,
    canUnlock: false,
    canPrint: false,  
    canDelete: false
  };

  // detail line1 (user rights) list
  public fgdUserRightsData : ObservableArray;
  public fgdUserRightsCollection : CollectionView;

  // modal(s)
  public mdlUserRightDeleteShow : boolean = false;
  public mdlUserRightEditShow : boolean = false;
  public mdlUserRightCopyShow : boolean = false;

  // variable use to copy user rights
  public copyUserRights : string;

  // =======
  // angular
  // =======

  // constructor
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.fgdUserRightsData = new ObservableArray();
    this.fgdUserRightsCollection = new CollectionView(this.fgdUserRightsData);

    this.getUser();
  }
  ngOnDestroy() {
    if( this.userSub != null) this.userSub.unsubscribe();
    if( this.userSavedSub != null) this.userSavedSub.unsubscribe();
    if( this.userStatusesSub != null) this.userStatusesSub.unsubscribe();
    if( this.userRightsSub != null) this.userRightsSub.unsubscribe();
    if( this.userRightDeletedSub != null) this.userRightDeletedSub.unsubscribe();
    if( this.userRightPagesSub != null) this.userRightPagesSub.unsubscribe();
  }

  // ===============
  // private methods
  // ===============

  private getIdParameter() : number {
    let id = 0;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  // ==============
  // public methods
  // ==============

  // detail
  public getUser() {
    this.userService.getUser(this.getIdParameter());
    this.userSub = this.userService.userObservable
      .subscribe(
          data => {
            this.user.id= data.id;
            this.user.username = data.username;
            this.user.fullName = data.fullName;
            this.user.password = data.password;
            this.user.status = data.status;
            this.user.aspNetId= data.aspNetId;

            this.getUserStatuses(data);
            this.getUserRights();
          }
      );
  }
  
  // detail comboxes
  public getUserStatuses(detail : any) : void {
    this.userService.getDropDowns();
    this.userStatusesSub = this.userService.dropDownsObservable.subscribe(
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
        this.cmbUserStatusData = userStatuses;
        setTimeout(() => {
          this.user.status = detail.status;
        }, 100);
      }
    );
  }

  // detail line1 (user rights)
  public getUserRights() : void {
    this.userService.getUserRightsPerUser(this.user.id);

    this.userRightsSub = this.userService.userRightsObservable.subscribe(
      data => {
        this.fgdUserRightsData = data;
        this.fgdUserRightsCollection = new CollectionView(this.fgdUserRightsData);
        this.fgdUserRightsCollection.pageSize = 15;
        this.fgdUserRightsCollection.trackChanges = true;  
      }
    );
  }

  // detail line1 (user rights) combo boxes
  public getUserRightPages() : void {
    this.userService.getPages();
    this.userRightPagesSub = this.userService.pagesObservable.subscribe(
      data => {
        let userRightPages = new ObservableArray();
        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            userRightPages.push({
              id: data[i].id,
              page: data[i].page,
              url: data[i].url
            });
          }
        }
        this.cmbUserRightPagesData = userRightPages;
        setTimeout(() => {
          let selectedUserRight = this.fgdUserRightsCollection.currentItem;
          this.userRight.pageId = selectedUserRight.pageId;
        }, 100);
      }
    );    
  }

  // ======
  // events
  // ======

  // detail operations
  public btnSaveUserClick() : void {
    let btnSaveUser:Element = document.getElementById("btnSaveUser");

    btnSaveUser.setAttribute("disabled","disabled");
    btnSaveUser.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    
    this.userService.saveUser(this.user);
    this.userSub =  this.userService.userSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveUser.removeAttribute("disabled");
              btnSaveUser.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveUser.removeAttribute("disabled");
              btnSaveUser.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          }
      }
    );
  }

  // detail line1 (user rights) list operations
  public btnAddUserRightsClick() : void {
    this.userRight.id = 0; 
    this.userRight.userId = this.user.id;
    this.userRight.user = this.user.username;
    this.userRight.pageId = 0;
    this.userRight.page = "";
    this.userRight.canEdit = false;
    this.userRight.canSave = false;
    this.userRight.canLock = false;
    this.userRight.canUnlock = false;
    this.userRight.canPrint = false;
    this.userRight.canDelete = false;

    this.mdlUserRightEditShow = true

    this.getUserRightPages();
  }
  public btnCopyUserRightsClick() : void {
    this.mdlUserRightCopyShow = true;    
  }
  public btnEditUserRightsClick() : void {
    let selectedUserRight = this.fgdUserRightsCollection.currentItem;

    this.userRight.id = selectedUserRight.id;
    this.userRight.userId = selectedUserRight.userId;
    this.userRight.user = selectedUserRight.user;
    this.userRight.pageId = selectedUserRight.pageId;
    this.userRight.page = selectedUserRight.page;
    this.userRight.canEdit = selectedUserRight.canEdit;
    this.userRight.canSave = selectedUserRight.canSave;
    this.userRight.canLock = selectedUserRight.canLock;
    this.userRight.canUnlock = selectedUserRight.canUnlock;
    this.userRight.canPrint = selectedUserRight.canPrint;  
    this.userRight.canDelete = selectedUserRight.canDelete;

    this.mdlUserRightEditShow = true

    this.getUserRightPages();
  }
  public btnDeleteUserRightsClick() : void {
    this.mdlUserRightDeleteShow = true;
  }

  // detail line1 (user rights) delete modal operations
  public btnOkUserRightDeleteModalClick() : void {
    let btnOkUserRightDeleteModal: Element = document.getElementById("btnOkUserRightDeleteModal");
    let btnCloseUserRightDeleteModal: Element = document.getElementById("btnCloseUserRightDeleteModal");

    btnOkUserRightDeleteModal.setAttribute("disabled","disabled");
    btnCloseUserRightDeleteModal.setAttribute("disabled","disabled");

    let selectedUserRight = this.fgdUserRightsCollection.currentItem;

    this.userService.deleteUserRight(selectedUserRight.id);

    this.userRightDeletedSub = this.userService.userRightDeletedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Delete successful.");
          this.fgdUserRightsCollection.remove​(selectedUserRight);

          btnOkUserRightDeleteModal.removeAttribute("disabled");
          btnCloseUserRightDeleteModal.removeAttribute("disabled");

          this.mdlUserRightDeleteShow = false; 
        } else if (data == 0) {
          this.toastr.error("Delete failed.");

          btnOkUserRightDeleteModal.removeAttribute("disabled");
          btnCloseUserRightDeleteModal.removeAttribute("disabled");
        }
      }
    );
  }
  public btnCloseUserRightDeleteModalClick() : void {
    this.mdlUserRightDeleteShow = false;
  }

  // detail line1 (user rights) copy modal operations
  public btnOkUserRightCopyModalClick() : void {
    // TO BE IMPLEMENTED!!!!!!!!
    this.mdlUserRightCopyShow = false;    
  }
  public btnCloseUserRightCopyModalClick() : void {
    this.mdlUserRightCopyShow = false;
  }

  // detail line1 (user rights) edit modal operations
  public btnSaveUserRightEditClick() : void {
    let btnSaveUserRightEdit:Element = document.getElementById("btnSaveUserRightEdit");
    let btnCloseUserRightEdit:Element = document.getElementById("btnCloseUserRightEdit");

    btnSaveUserRightEdit.setAttribute("disabled","disabled");
    btnSaveUserRightEdit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    btnCloseUserRightEdit.setAttribute("disabled","disabled");

    this.userService.saveUserRight(this.userRight);
    this.userSub =  this.userService.userRightSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveUserRightEdit.removeAttribute("disabled");
              btnSaveUserRightEdit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
              btnCloseUserRightEdit.removeAttribute("disabled");

              this.mdlUserRightEditShow = false;
              this.getUserRights();
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveUserRightEdit.removeAttribute("disabled");
              btnSaveUserRightEdit.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
              btnCloseUserRightEdit.removeAttribute("disabled");
          }
      }
    );
  }
  public btnCloseUserRightEditClick() : void {
    this.mdlUserRightEditShow = false;
  }
}