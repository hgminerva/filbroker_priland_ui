// angular
import { Component,ViewContainerRef,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// service(s)
import { ProjectService } from './project.service';

// wijmo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';

// message box
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// model(s)
import { MstProject } from '../model/model.mst.project';

@Component({
  templateUrl: './project.list.html'
})
export class ProjectList {

    // ==================
    // private properties
    // ==================

    private currentDate = new Date();
    private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

    private projectsSub : any;
    private projectDeletedSub : any;

    // =================
    // public properties
    // =================

    public title = 'Project List';
    public filterProject : string;

    public project : MstProject = {
        id: 0,
        projectCode: "NA",
        project: "NA",
        address: "NA",
        status: "OPEN",
        isLocked: false,
        createdBy: 1,
        createdDateTime: this.currentDateString,
        updatedBy: 1,
        updatedDateTime: this.currentDateString
    };

    public fgdProjectsData : ObservableArray;
    public fgdProjectsCollection : CollectionView;

    public mdlProjectDeleteShow : boolean = false;

    // =============
    // angular class
    // =============

    // constructor
    constructor(
        private projectService : ProjectService,
        private toastr : ToastsManager,
        private viewContainer : ViewContainerRef,
        private router : Router
    ) {
        this.toastr.setRootViewContainerRef(viewContainer);
    }

    // ng
    ngOnInit() {
        this.fgdProjectsData = new ObservableArray();
        this.fgdProjectsCollection = new CollectionView(this.fgdProjectsData);

        this.getProjects();
    }
    ngOnDestroy() {
        if( this.projectDeletedSub != null) this.projectDeletedSub.unsubscribe();
        if( this.projectsSub != null) this.projectsSub.unsubscribe();
    }

    // ==============
    // public methods
    // ==============

    // project list
    public getProjects() : void {
        let projects = new ObservableArray();

        this.projectService.getProjects();

        this.projectsSub = this.projectService.projectsObservable.subscribe(
          data => {
            if (data.length > 0) {
              this.fgdProjectsData = data;
              this.fgdProjectsCollection = new CollectionView(this.fgdProjectsData);
              this.fgdProjectsCollection.pageSize = 15;
              this.fgdProjectsCollection.trackChanges = true;  
            }
          }
        );
    }

    // ======
    // events
    // ======

    // project list operations
    public btnAddProjectClick() : void {
        let btnAddProject:Element = document.getElementById("btnAddProject");

        btnAddProject.setAttribute("disabled","true");
        btnAddProject.innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";

        this.projectService.addProject(this.project, btnAddProject);
    }
    public btnEditProjectClick() : void {
        let selectedProject = this.fgdProjectsCollection.currentItem;
        this.router.navigate(['/project', selectedProject.id]);
    }
    public btnDeleteProjectClick() : void {
        this.mdlProjectDeleteShow = true;
    }

    // project delete modal operations
    public btnOkProjectDeleteModalClick() : void {
        let btnOkProjectDeleteModal:Element = document.getElementById("btnOkProjectDeleteModal");
        let btnCloseProjectDeleteModal:Element = document.getElementById("btnCloseProjectDeleteModal");
    
        let selectedProject = this.fgdProjectsCollection.currentItem;
    
        btnOkProjectDeleteModal.setAttribute("disabled","disabled");
        btnCloseProjectDeleteModal.setAttribute("disabled","disabled");
    
        this.projectService.deleteProject(selectedProject.id,);
        this.projectDeletedSub = this.projectService.projectDeletedObservable.subscribe(
            data => {
                if(data == 1) {
                    this.toastr.success("Delete successful.");
                    this.fgdProjectsCollection.remove​(selectedProject);
    
                    btnOkProjectDeleteModal.removeAttribute("disabled");
                    btnCloseProjectDeleteModal.removeAttribute("disabled");
    
                    this.mdlProjectDeleteShow = false
                } else if(data == 0) {
                    this.toastr.error("Delete failed.");   
    
                    btnOkProjectDeleteModal.removeAttribute("disabled");
                    btnCloseProjectDeleteModal.removeAttribute("disabled");
                }
            }
        );
    }
    public btnCloseProjectDeleteModalClick() : void {
        this.mdlProjectDeleteShow = false;
    }
}