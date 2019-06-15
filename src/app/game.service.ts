import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { GET_PATH, GET_WORDS, INIT_PLAY } from './actions'

import { WORDS } from './word-list';
import { Word } from "./word";
@Injectable({
  providedIn: 'root'
})

export class GameService {
  initPlay(): void {
    this.ngRedux.dispatch({type: INIT_PLAY});
  }
  getPath(path: string): void{
    this.ngRedux.dispatch({type: GET_PATH, isPlay: path === '/play'});
  }

  getWords(): void{
    const index = Math.floor((Math.random()*WORDS.length));
    const word: Word = JSON.parse(JSON.stringify(WORDS[index]));
    word.left =   Math.floor((Math.random()*650));
    this.ngRedux.dispatch({type: GET_WORDS, word: word});
  }

  constructor(private ngRedux: NgRedux<IAppState>) { }
}
