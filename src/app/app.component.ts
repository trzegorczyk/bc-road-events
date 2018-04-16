import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/Rx';
import * as moment from 'moment';

import { DataService } from './data.service';
import { DataOptions } from './data.options';
import { MenuComponent } from './menu.component';
import { EventsComponent } from './events.component';
import { MapComponent } from './map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  @ViewChild(MenuComponent) menuComponent;
  @ViewChild(EventsComponent) eventsComponent;
  @ViewChild(MapComponent) mapComponent;
  options: DataOptions;
  title = 'BC Road Events';
  data: any;
  errorMessage: string;
  constructor(private _dataService: DataService) { }

  ngOnInit() {

    this._dataService.options = this.options;
    let stamp = JSON.parse(localStorage.getItem('BCRoadEventsTimeStamp')) as Date;
    if ((!stamp || !localStorage.getItem('BCRoadEvents')) || moment(Date.now()).isAfter(moment(stamp).add(30, 'minutes'))) {
        this._dataService.getEvents().subscribe((events: any[]) => {
            this.data = this.eventsComponent = this.mapComponent = events;
            localStorage.setItem('BCRoadEvents', JSON.stringify(this.data));
            localStorage.setItem('BCRoadEventsTimeStamp', JSON.stringify(Date.now()));
        }, error => this.errorMessage = <any>error);
    }
    else {
        this.data = JSON.parse(localStorage.getItem('BCRoadEvents'));
    }
  }
  
  refreshEvents(options: DataOptions){
    console.log('Refreshing');
    this.options = options;
    this._dataService.options = options;
    this._dataService.getEvents().subscribe((events: any[]) => {
    this.data = events;

      //localStorage.setItem('BCRoadEvents', JSON.stringify(this.data));
      //localStorage.setItem('BCRoadEventsTimeStamp', JSON.stringify(Date.now()));
  }, error => this.errorMessage = <any>error);
  }
}
