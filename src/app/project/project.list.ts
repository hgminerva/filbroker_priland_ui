// Angular
import { Component,ViewContainerRef,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ProjectService } from './project.service';

// WijMo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';

// Beautification
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Model
import { MstProject } from '../model/model.mst.project';

@Component({
  templateUrl: './project.list.html'
})

export class ProjectList {
    public title = 'Project List';
    public filterProject : string;

    private currentDate = new Date();
    private currentDateString = [this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()].join('-');

    private projectsSub : any;
    private projectDeletedSub : any;

    @ViewChild('btnAddProject',{read: ElementRef}) 
    public btnAddProject: ElementRef;

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

    public projectData : ObservableArray;
    public projectCollection : CollectionView;

    constructor(
        private projectService : ProjectService,
        private toastr : ToastsManager,
        private viewContainer : ViewContainerRef,
        private router : Router
    ) {
        this.toastr.setRootViewContainerRef(viewContainer);
    }

    ngOnInit() {
        this.projectData = new ObservableArray();
        this.projectCollection = new CollectionView(this.projectData);

        this.getProjects();
    }
    
    ngOnDestroy() {
        if( this.projectDeletedSub != null) this.projectDeletedSub.unsubscribe();
        if( this.projectsSub != null) this.projectsSub.unsubscribe();
    }

    public getProjects() : void {
        let projects = new ObservableArray();

        this.projectService.getProjects();

        this.projectsSub = this.projectService.projectsObservable.subscribe(
          data => {
            if (data.length > 0) {
              this.projectData = data;
              this.projectCollection = new CollectionView(this.projectData);
              this.projectCollection.pageSize = 15;
              this.projectCollection.trackChanges = true;  
            }
          }
        );
    }

    public btnAddProjectClick() : void {
        let btnAddProject:Element = document.getElementById("btnAddProject");

        btnAddProject.setAttribute("disabled","true");
        btnAddProject.innerHTML = "<i class='fa fa-plus fa-fw'></i> Adding...";

        this.projectService.addProject(this.project, this.toastr);
    }

    public btnEditProjectClick() : void {
        let selectedProject = this.projectCollection.currentItem;
        this.router.navigate(['/project', selectedProject.id]);
    }
    
    public btnDeleteProjectClick() : void {
        (<HTMLButtonElement>document.getElementById("btnDeleteProject")).disabled = true;
        (<HTMLButtonElement>document.getElementById("btnDeleteCloseProject")).disabled = true;

        let selectedProject = this.projectCollection.currentItem;
        this.projectService.deleteProject(selectedProject.id);

        this.projectDeletedSub = this.projectService.projectDeletedObservable.subscribe(
            data => {
                if(data == 1) {
                    this.toastr.success("Delete successful.");
                    this.projectCollection.remove​(selectedProject);
                    (<HTMLButtonElement>document.getElementById("btnDeleteProject")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnDeleteCloseProject")).disabled = false;
                    document.getElementById("btnDeleteCloseProject").click();
                } else if(data == 0) {
                    this.toastr.error("Delete failed.");   
                    (<HTMLButtonElement>document.getElementById("btnDeleteProject")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnDeleteCloseProject")).disabled = false;
                }
            }
        );
    }


}