import { Component, Output, EventEmitter } from '@angular/core';
import { DataOptions } from './data.options';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent implements DataOptions {
    severity: string;
    eventType: string;
    eventSubType: string;
    road: string;
    area: string;
    @Output() refresh: EventEmitter<DataOptions> = new EventEmitter();

    
    Refresh(event){
        let newOptions = new DataOptions();
        newOptions.severity = this.severity;
        newOptions.eventType = this.eventType;
        newOptions.eventSubType = this.eventSubType;
        newOptions.road = this.road;
        newOptions.area = this.area;
        this.refresh.emit(newOptions);
    }
}