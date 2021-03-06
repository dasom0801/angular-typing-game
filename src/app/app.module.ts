import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayAreaComponent } from './play-area/play-area.component';
import { PlayInfoComponent } from './play-info/play-info.component';
import { GameComponent } from './game/game.component';
import { WordComponent } from './word/word.component';
import { GameRankingComponent } from './game-ranking/game-ranking.component';
import { GameoverComponent } from './gameover/gameover.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayAreaComponent,
    PlayInfoComponent,
    GameComponent,
    WordComponent,
    GameRankingComponent,
    GameoverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (ngRedux: NgRedux<IAppState>, private devTools: DevToolsExtension) {
    let enhancers = [];
    if (devTools.isEnabled()) {
      enhancers = [devTools.enhancer()];
    }
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}
