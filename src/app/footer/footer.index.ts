// Angular
import { Component, Input } from '@angular/core';

@Component({
    selector: "app-footer",
    templateUrl: './footer.index.html',
    styleUrls: ['./footer.style.css']
})
export class FooterIndex {
    public company: string = "Priland";
    public version: string = "Filbroker v1.0";
    public support: string = "Innosoft Solutions +63 917 812 3982 (support@innosoft.ph)";
    
    public createdBy: string = "";
    public createdDateTime: string = "";
    public updatedBy: string = "";
    public updatedDateTime: string = "";

    @Input()
    public data: any;
}