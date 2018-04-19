import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSelectModule, MatSidenavModule } from '@angular/material';
import { MenuComponent }  from './menu.component'
import { EventsComponent } from './events.component';
import { MapComponent } from './map.component';
import { NamePipe } from './name.pipe';


@NgModule({
  declarations: [
    AppComponent, 
    MenuComponent,
    EventsComponent,
    MapComponent, 
    NamePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule,
    MatSelectModule,
    MatSidenavModule
  ],
  providers: [HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
