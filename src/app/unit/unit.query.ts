// angular
import { Component,ViewChild,ElementRef,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// services
import { UnitService } from './unit.service';

// wijmo
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';

// model(s)
import { MstUnit } from '../model/model.mst.unit';

@Component({
  selector: 'unit-query',
  templateUrl: './unit.query.html'
})
export class UnitQuery {

    @Input()
    public isShowing : boolean;

    @Output()
    public pickedUnit : EventEmitter<MstUnit> = new EventEmitter<MstUnit>();

    private projectsSub : any;
    private unitsSub : any;
    
    public cmbProjectsData : ObservableArray;

    @ViewChild("cmbProjects")
    public cmbProjects:ElementRef;

    public fgdUnitsData : ObservableArray;
    public fgdUnitsCollection : CollectionView;

    constructor(private unitService : UnitService) {
    }

    ngOnInit() {
        this.fgdUnitsData = new ObservableArray();
        this.fgdUnitsCollection = new CollectionView(this.fgdUnitsData);
    
        this.getProjects(); 
    }
    ngOnDestroy() {
        if( this.unitsSub != null) this.unitsSub.unsubscribe();
        if( this.projectsSub != null) this.projectsSub.unsubscribe();
    }
    ngOnChanges(changes: SimpleChanges) {
        this.getProjects();
     }

    // =======
    // methods
    // =======

    public openUnitQuery() : void {
    }
    private getProjects() : void {
        this.unitService.getProjects();

        this.projectsSub = this.unitService.projectsObservable.subscribe(
          data => {
            let projectStatuses = new ObservableArray();
            if (data.length > 0) {
                this.cmbProjectsData = data;
            }
          }
        );
    }
    private getUnitsPerProjectId(projectId: number) : void {
        let units = new ObservableArray();

        this.unitService.getUnitsPerProjectId(projectId);
    
        this.unitsSub = this.unitService.unitsObservable.subscribe(
          data => {
            var units = new ObservableArray();
            if (data.length > 0) {
                for (var i = 0; i <= data.length - 1; i++) {
                    if(data[i].status == "OPEN") {
                        units.push({
                            id: data[i].id,
                            unitCode: data[i].unitCode,
                            block: data[i].block,
                            lot: data[i].lot,
                            projectId: data[i].projectId,
                            project: data[i].project,
                            houseModelId: data[i].houseModelId,
                            houseModel: data[i].houseModel,
                            tla: data[i].tla,
                            tfa: data[i].tfa,
                            price: data[i].price,
                            status: data[i].status,
                            isLocked: data[i].isLocked,
                            createdBy: data[i].createdBy,
                            createdDateTime: data[i].createdDateTime,
                            updatedBy: data[i].updatedBy,
                            updatedDateTime: data[i].updatedDateTime,
                        });
                    }
                }
            }
            this.fgdUnitsData = units;
            this.fgdUnitsCollection = new CollectionView(this.fgdUnitsData);
            this.fgdUnitsCollection.pageSize = 7;
            this.fgdUnitsCollection.trackChanges = true;  
          }
        );
    }

    // ======
    // events
    // ======

    private btnPickUnitClick() : void {
        this.isShowing = false;

        let selectedUnit : MstUnit = this.fgdUnitsCollection.currentItem;
        this.pickedUnit.emit(selectedUnit);
    }
    public cmbProjectsChange() : void {
        let projectId = this.cmbProjectsData[this.cmbProjects["selectedIndex"]]["id"];
        let project = this.cmbProjectsData[this.cmbProjects["selectedIndex"]]["project"];

        this.getUnitsPerProjectId(projectId);
    }
    private btnCloseUnitQueryModalClick() : void {
        this.isShowing = false;
        this.pickedUnit.emit(new MstUnit());
    }
}