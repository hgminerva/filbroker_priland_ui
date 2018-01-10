// Angular
import { Component,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ProjectService } from './project.service';

// WijMo
import {ObservableArray, CollectionView} from 'wijmo/wijmo';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstProject } from '../model/model.mst.project';
import { MstHouseModel} from '../model/model.mst.houseModel';

@Component({
  templateUrl: './project.detail.html'
})
export class ProjectDetail {

  // private properties
  private projectSub : any;

  // detail operation
  private projectSavedSub : any;
  private projectLockedSub : any;
  private projectUnlockedSub : any;

  private projectStatusSub : any;

  private houseModelsSub : any;
  private houseModelSavedSub : any;
  private houseModelDeletedSub : any;

  // public properties
  public title = 'Project Detail';

  public project : MstProject = {
    id: 0,
    projectCode: "",
    project: "",
    address: "",
    status: "",
    isLocked: false,
    createdBy: 1,
    createdDateTime: "",
    updatedBy: 1,
    updatedDateTime: ""
  };
  public houseModel : MstHouseModel = {
    id: 0,
    houseModelCode: "",
    houseModel: "",
    projectId: 0,
    project: "",
    tfa: 0,
    price: 0,
    isLocked: true,
    createdBy: 0,
    createdDateTime: "",
    updatedBy: 0,
    updatedDateTime: ""
  };

  // combo boxes
  public cmbProjectStatusData : ObservableArray;

  // detail lines1 (house model) grid data source
  public fgdHouseModelsData : ObservableArray;
  public fgdHouseModelsCollection : CollectionView;

  public mdlHouseModelDeleteShow : boolean = false;
  public mdlHouseModelEditShow : boolean = false;

  // constructor
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  // ng
  ngOnInit() {
    this.fgdHouseModelsData = new ObservableArray();
    this.fgdHouseModelsCollection = new CollectionView(this.fgdHouseModelsData);

    this.getProject();
  }
  ngOnDestroy() {
    if( this.projectSub != null) this.projectSub.unsubscribe();

    if( this.projectSavedSub != null) this.projectSavedSub.unsubscribe();
    if( this.projectLockedSub != null) this.projectLockedSub.unsubscribe();
    if( this.projectUnlockedSub != null) this.projectUnlockedSub.unsubscribe();

    if( this.projectStatusSub != null) this.projectStatusSub.unsubscribe();

    if( this.houseModelsSub != null) this.houseModelsSub.unsubscribe();
    if( this.houseModelSavedSub != null) this.houseModelSavedSub.unsubscribe();
    if( this.houseModelDeletedSub != null) this.houseModelDeletedSub.unsubscribe();
  }

  // private methods
  private getIdParameter() : number {
    let id = 0;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  // public methods

  // detail
  public getProject() {
    this.projectService.getProject(this.getIdParameter());

    this.projectSub = this.projectService.projectObservable
      .subscribe(
        data => {
          this.project.id = data.id;
          this.project.projectCode = data.projectCode;
          this.project.project = data.project;
          this.project.address = data.address;
          this.project.status = data.status;
          this.project.isLocked = data.isLocked;
          this.project.createdBy = data.createdBy;
          this.project.createdDateTime = data.createdDateTime;
          this.project.updatedBy = data.updatedBy;
          this.project.updatedDateTime= data.updatedDateTime;

          this.getProjectStatus(data.status);
          this.getHouseModels();
        }
      );
  }
  public getHouseModels() {
    this.projectService.getHouseModelsPerProject(this.project.id);

    this.houseModelsSub = this.projectService.houseModelsObservable.subscribe(
      data => {
        this.fgdHouseModelsData = data;
        this.fgdHouseModelsCollection = new CollectionView(this.fgdHouseModelsData);
        this.fgdHouseModelsCollection.pageSize = 15;
        this.fgdHouseModelsCollection.trackChanges = true;  
      }
    );
  } 

  // combo boxes
  public getProjectStatus(defaultValue : string) : void {

    this.projectService.getDropDowns();
    this.projectStatusSub = this.projectService.dropDownsObservable.subscribe(
      data => {
        let projectStatuses = new ObservableArray();
        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            if (data[i].category == "PROJECT STATUS") {
              projectStatuses.push({
                id: data[i].id,
                category: data[i].category,
                description: data[i].description,
                value: data[i].value
              });
            }
          }
        }
        this.cmbProjectStatusData = projectStatuses;
        setTimeout(() => {
          this.project.status = defaultValue;
        }, 100);
      }
    );

  }

  // events

  // detail operation
  public btnSaveProjectClick() : void {
    let btnSaveProject:Element = document.getElementById("btnSaveProject");

    btnSaveProject.setAttribute("disabled","disabled");
    btnSaveProject.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    
    this.projectService.saveProject(this.project);
    this.projectSavedSub =  this.projectService.projectSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveProject.removeAttribute("disabled");
              btnSaveProject.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveProject.removeAttribute("disabled");
              btnSaveProject.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
          }
      }
    );
  }
  public btnLockProjectClick() : void {
    let btnLockProject:Element = document.getElementById("btnLockProject");

    btnLockProject.setAttribute("disabled","disabled");
    btnLockProject.innerHTML = "<i class='fa fa-plus fa-fw'></i> Locking...";

    this.projectService.lockProject(this.project);
    this.projectLockedSub =  this.projectService.projectLockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Locking successful.");
              this.project.isLocked = true;
              btnLockProject.removeAttribute("disabled");
              btnLockProject.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          } else if(data == 0) {
              this.toastr.error("Locking failed.");   
              btnLockProject.removeAttribute("disabled");
              btnLockProject.innerHTML = "<i class='fa fa-lock fa-fw'></i> Lock";
          }
      }
    );
  }
  public btnUnlockProjectClick() : void {
    let btnUnlockProject:Element = document.getElementById("btnUnlockProject");

    btnUnlockProject.setAttribute("disabled","disabled");
    btnUnlockProject.innerHTML = "<i class='fa fa-plus fa-fw'></i> Unlocking...";

    this.projectService.unlockProject(this.project);
    this.projectUnlockedSub = this.projectService.projectUnlockedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Unlocking successful.");
              this.project.isLocked = false;
              btnUnlockProject.removeAttribute("disabled");
              btnUnlockProject.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          } else if(data == 0) {
              this.toastr.error("Unlocking failed.");   
              btnUnlockProject.removeAttribute("disabled");
              btnUnlockProject.innerHTML = "<i class='fa fa-lock fa-fw'></i> Unlock";
          }
      }
    );
  }

  // detail lines1 (house models) operation
  public btnAddHouseModelsClick() : void {
    this.houseModel.id = 0;
    this.houseModel.houseModelCode = "";
    this.houseModel.houseModel = "";
    this.houseModel.projectId = this.project.id;
    this.houseModel.project = this.project.project;
    this.houseModel.tfa = 0;
    this.houseModel.price = 0;
    this.houseModel.isLocked = true;
    this.houseModel.createdBy = 0;
    this.houseModel.createdDateTime = "";
    this.houseModel.updatedBy = 0;
    this.houseModel.updatedDateTime = "";

    this.mdlHouseModelEditShow = true; 
  }
  public btnEditHouseModelsClick() : void {
    let selectedHouseModel = this.fgdHouseModelsCollection.currentItem;

    this.houseModel.id = selectedHouseModel.id;
    this.houseModel.houseModelCode = selectedHouseModel.houseModelCode;
    this.houseModel.houseModel = selectedHouseModel.houseModel;
    this.houseModel.projectId = selectedHouseModel.projectId;
    this.houseModel.project = selectedHouseModel.project;
    this.houseModel.tfa = selectedHouseModel.tfa;
    this.houseModel.price = selectedHouseModel.price;
    this.houseModel.isLocked = selectedHouseModel.isLocked;
    this.houseModel.createdBy = selectedHouseModel.createdBy;
    this.houseModel.createdDateTime = selectedHouseModel.createdDateTime;
    this.houseModel.updatedBy = selectedHouseModel.updatedBy;
    this.houseModel.updatedDateTime = selectedHouseModel.updatedDateTime;

    this.mdlHouseModelEditShow = true; 
  }
  public btnDeleteHouseModelsClick() : void {
    this.mdlHouseModelDeleteShow = true;
  }

  // detail lines1 (house models) delete modal operation
  public btnOkHouseModelDeleteModalClick() : void {
    let btnOkHouseModelDeleteModal: Element = document.getElementById("btnOkHouseModelDeleteModal");
    let btnCloseHouseModelDeleteModal: Element = document.getElementById("btnCloseHouseModelDeleteModal");

    btnOkHouseModelDeleteModal.setAttribute("disabled","disabled");
    btnCloseHouseModelDeleteModal.setAttribute("disabled","disabled");

    let selectedHouseModel = this.fgdHouseModelsCollection.currentItem;

    this.projectService.deleteHouseModel(selectedHouseModel.id);

    this.houseModelDeletedSub = this.projectService.houseModelDeletedObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Delete successful.");
          this.fgdHouseModelsCollection.remove​(selectedHouseModel);

          btnOkHouseModelDeleteModal.removeAttribute("disabled");
          btnCloseHouseModelDeleteModal.removeAttribute("disabled");

          this.mdlHouseModelDeleteShow = false; 
        } else if (data == 0) {
          this.toastr.error("Delete failed.");

          btnOkHouseModelDeleteModal.removeAttribute("disabled");
          btnCloseHouseModelDeleteModal.removeAttribute("disabled");
        }
      }
    );
  }
  public btnCloseHouseModelDeleteModalClick() : void {
    this.mdlHouseModelDeleteShow = false;
  }

  // detail lines (house models) edit modal operation
  public btnSaveHouseModelEditModalClick() : void {
    let btnSaveHouseModelEditModal:Element = document.getElementById("btnSaveHouseModelEditModal");
    let btnCloseHouseModelEditModal:Element = document.getElementById("btnCloseHouseModelEditModal");

    btnSaveHouseModelEditModal.setAttribute("disabled","disabled");
    btnSaveHouseModelEditModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Saving...";
    btnCloseHouseModelEditModal.setAttribute("disabled","disabled");

    this.projectService.saveHouseModel(this.houseModel);
    this.houseModelSavedSub =  this.projectService.houseModelSavedObservable.subscribe(
      data => {
          if(data == 1) {
              this.toastr.success("Saving successful.");
              btnSaveHouseModelEditModal.removeAttribute("disabled");
              btnSaveHouseModelEditModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
              btnCloseHouseModelEditModal.removeAttribute("disabled");

              this.mdlHouseModelEditShow = false;
              this.getHouseModels();
          } else if(data == 0) {
              this.toastr.error("Saving failed.");   
              btnSaveHouseModelEditModal.removeAttribute("disabled");
              btnSaveHouseModelEditModal.innerHTML = "<i class='fa fa-plus fa-fw'></i> Save";
              btnCloseHouseModelEditModal.removeAttribute("disabled");
          }
      }
    );
  }
  public btnCloseHouseModelEditModalClick() : void {
    this.mdlHouseModelEditShow = false;
  }

}