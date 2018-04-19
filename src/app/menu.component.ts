import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent {
    @Input() severity: string;
    @Input() eventType: string;
    @Input() area: string;
    refresh: EventEmitter<any> = new EventEmitter();


    Refresh(type: string, value: string) {
        if(type){
            if(type == 'area'){
                this.area = value;
            }
            if(type == 'eventType'){
                this.area = value;
            }
            if(type == 'severity'){
                this.area = value;
            }
        }
        this.refresh.emit(this.addUrlOptions());
        console.log(this.addUrlOptions());
    }

    addUrlOptions() {
        let url = '';
        let temp = [];
        if (this.severity && this.severity.length > 0) {
            temp.push('severity=' + this.severity);
        }
        if (this.eventType && this.eventType.length > 0) {
            temp.push('event_type=' + this.eventType);
        }
        if (this.area && this.area.length > 0) {
            temp.push('area_id=' + this.area);
        }

        temp.forEach((value, index, array) => {
            url += '&' + value;
        });
        return url;
    }
}