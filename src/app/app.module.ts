import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PlayComponent } from './play/play.component';
import { PlayAreaComponent } from './play-area/play-area.component';
import { PlayInfoComponent } from './play-info/play-info.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlayComponent,
    PlayAreaComponent,
    PlayInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
