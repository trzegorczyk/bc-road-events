import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent {
    form
    @Output() refresh: EventEmitter<any> = new EventEmitter();

    constructor(private fb: FormBuilder){
        this.form = fb.group({
            severity: [''],
            eventType: [''],
            area: ['']
        })
    }

    updateList(){

    }

    onFormSubmit() {
        console.log(this.form.value);
        var options = this.addUrlOptions(this.form.value);
        this.refresh.emit(options);
    }

    addUrlOptions(options) {
        let url = '';
        let temp = [];
        if (options.severity && options.severity !== undefined && options.severity.length > 0) {
            temp.push('severity=' + options.severity);
        }
        if (options.eventType && options.eventType !== undefined && options.eventType.length > 0) {
            temp.push('event_type=' + options.eventType);
        }
        if (options.area && options.area !== undefined && options.area.length > 0) {
            temp.push('area_id=' + options.area);
        }

        temp.forEach((value, index, array) => {
            url += '&' + value;
        });
        return url;
    }
}