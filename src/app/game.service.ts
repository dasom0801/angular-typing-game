import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { GET_PATH, GET_WORDS, INIT_PLAY, REMOVE_WORD, HANDLE_POINT } from './actions'

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

  handlePoint(isPointUp: boolean): void {
    this.ngRedux.dispatch({type: HANDLE_POINT, isPointUp})
  }

  removeWord(index: number): void {
    this.ngRedux.dispatch({type: REMOVE_WORD, index});
  }

  constructor(private ngRedux: NgRedux<IAppState>) { }
}
