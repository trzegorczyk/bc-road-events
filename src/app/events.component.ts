import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css'],
})

export class EventsComponent {
    @Input() events: any[];
    @Output() showEvent: EventEmitter<any> = new EventEmitter();
    selectedEvent: string;

    onEventClick(event) {
        this.showEvent.emit(event);
        this.selectedEvent = event.id;
    }
}