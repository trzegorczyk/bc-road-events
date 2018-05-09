import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[weather-host]',
})
export class WeatherDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}