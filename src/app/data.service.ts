import { Injectable, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataService {
    eventsUrl: string = 'http://api.open511.gov.bc.ca/events?status=ACTIVE&area_id=drivebc.ca/2';
    areasUrl: string = 'http://api.open511.gov.bc.ca/areas';
    severity: string;
    eventType: string;
    eventSubType: string;
    road: string;
    area: string;

    constructor(private _http: Http) { }

    getEvents(options: string): Observable<any> {
        console.log(options);
        return this._http.get(this.eventsUrl + options)
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
