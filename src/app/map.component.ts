import { Component, OnInit } from '@angular/core';
import * as ol from 'openlayers';
import { WeatherService } from './weather.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [WeatherService]
})

export class MapComponent {
  map: any;
  lat = -123.3656;
  lng = 48.4284;
  layerLines: any;
  defaultZoom = 7;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
     });
    }
    
    setTimeout(() => {
      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([this.lng, this.lat]),
          zoom: this.defaultZoom
        })
      });
    }, 500);
  }

  drawFromCoords(event) {
    let type = event.geography.type;
    let coordinates = event.geography.coordinates;
    let overlay = new ol.Overlay({
      element: document.getElementById('popup-container'),
      positioning: 'bottom-center',
      offset: [8, -20]
    });

    if (coordinates && coordinates.length > 0) {
      if (this.layerLines) { this.map.removeLayer(this.layerLines); }
      let point = new ol.geom.Circle(coordinates, 0.001).transform('EPSG:4326', 'EPSG:3857');
      let line = new ol.geom.LineString(coordinates).transform('EPSG:4326', 'EPSG:3857');
      this.layerLines = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [new ol.Feature({
            geometry: type === 'Point' ? point : line,
            name: 'Line'
          })]
        }),
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'red',
            width: 5
          }),
          fill: new ol.style.Fill({
            color: 'red'
          })
        })
      });

      this.map.addOverlay(overlay);   
      overlay.setPosition(undefined);
      let overlayCoordinates = type === 'Point' ? point.getCenter() : line.getCoordinateAt(0.5);
      let popup = event.severity + ' ' + event.headline.replace('_', ' ');
      overlay.getElement().innerHTML = popup;
      overlay.setPosition(overlayCoordinates);   


      this.map.addLayer(this.layerLines);
      if (this.map.getView().getZoom() !== this.defaultZoom) {
        this.map.getView().animate({ zoom: this.defaultZoom });
        setTimeout(() => {
          this.moveToCoordinates(type, coordinates);
        }, 1000);
      }
      else {
        this.moveToCoordinates(type, coordinates);
      } 
      this._weatherService.getEvents(coordinates[0][1], coordinates[0][0]).subscribe((data: any) => {
        console.log(data);
        overlay.getElement().innerHTML += '<br/>' + data.currently.summary
         + '<br/>Temperature: ' + data.currently.temperature + '&deg;C'
         + '<br/>Pressure: ' + data.currently.pressure + 'hPa'
         + '<br/>Wind: ' + data.currently.windSpeed + 'km/h';
      });
    }
  }

  moveToCoordinates(type, coordinates) {
    this.map.getView().fit(
      type === 'Point'
        ? new ol.geom.Point(coordinates).transform('EPSG:4326', 'EPSG:3857')
        : new ol.geom.LineString(coordinates).transform('EPSG:4326', 'EPSG:3857'),
      {
        size: this.map.getSize(),
        maxZoom: 12,
        duration: 2000,
        easing: ol.easing.easeOut
      });
  }

  transformHeadline(value: string): string {
    let valueArr: string[];
    valueArr = value.split('_');
    valueArr.forEach((value, index, array) => {
        value.toLocaleLowerCase().charAt(0).toUpperCase();
    });
    return valueArr.join(' ');
  }
}