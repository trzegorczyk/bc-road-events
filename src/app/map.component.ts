import { Component, OnInit } from '@angular/core';
import * as ol from 'openlayers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent {
  map: any;
  layerLines: any;
  defaultZoom: number = 7;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([-123.3656, 48.4284]),
          zoom: this.defaultZoom
        })
      });
    }, 200);
  }

  drawFromCoords(type, coordinates) {
    if (coordinates && coordinates.length > 0) {
      if (this.layerLines) { this.map.removeLayer(this.layerLines); }

      this.layerLines = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [new ol.Feature({
            geometry: type === 'Point' ? new ol.geom.Circle(coordinates, 0.001).transform('EPSG:4326', 'EPSG:3857') : new ol.geom.LineString(coordinates).transform('EPSG:4326', 'EPSG:3857'),
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

}