import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayAreaComponent } from './play-area/play-area.component';
import { PlayInfoComponent } from './play-info/play-info.component';
import { GameComponent } from './game/game.component';
import { WordComponent } from './word/word.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayAreaComponent,
    PlayInfoComponent,
    GameComponent,
    WordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
