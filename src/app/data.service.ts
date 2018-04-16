import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Options } from './options';
import { DataOptions } from './data.options';

@Injectable()
export class DataService {
    options: DataOptions;

    eventsUrl: string = 'http://api.open511.gov.bc.ca/events?status=ACTIVE';
    areasUrl: string = 'http://api.open511.gov.bc.ca/areas';

    constructor(private _http: Http) { }

    getEvents(): Observable<any> {
        return this._http.get(this.addUrlOptions(this.eventsUrl))
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }


    addUrlOptions(url: string) {
        let temp = [];
        if(this.options){
            if (this.options.severity) {
                temp.push('severity=' + this.options.severity);
            }
            if (this.options.eventType) {
                temp.push('event_type=' + this.options.eventType);
            }
            if (this.options.eventSubType) {
                temp.push('event_subtype=' + this.options.eventSubType);
            }
            if (this.options.road) {
                temp.push('road_name=' + encodeURI(this.options.road));
            }
            if (this.options.area) {
                temp.push('area_id=' + this.options.area);
            }
        }

        temp.forEach((value, index, array) => {
            url += '&' + value;
        });
        return url;
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
