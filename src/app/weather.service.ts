import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WeatherService {
    apiUrl: string = 'http://localhost:56736/api/weather/{{latitude}},{{longtitude}}?exclude=minutely,hourly,daily,alerts';

    constructor(private _http: Http) { }

    getEvents(latitude: string, longtitude: string): Observable<any> {
        var url = this.apiUrl.replace('{{latitude}}', latitude).replace('{{longtitude}}', longtitude);
        return this._http.get(url)
            .map((response: Response) => <any[]>response.json() || {})
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
