import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map, first } from 'rxjs/operators';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './store';
import { GET_PATH, GET_WORDS, INIT_PLAY, REMOVE_WORD, HANDLE_POINT, GAMEOVER, LEVEL_UP } from './actions'


import { WORDS } from './word-list';
import { Word } from "./word";
@Injectable({
  providedIn: 'root'
})

export class GameService {
  @select() words$: Observable<Word[]>;
  @select() point$: Observable<number>;
  @select() playSpeed$: Observable<number>;
  point: number;
  speed: number;

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
    if (this.speed > 100 && isPointUp && this.point % 5 === 4 ) {
      this.handleGameLevel();
    }
  }

  removeWord(text: string, isPointUp: boolean): void {
    let removeWord: (number|Word)[];
    this.words$.pipe(
      map(word => word.map((w, i) => [w, i])),
      first()
    ).subscribe(value => removeWord = value.filter(word => Object.values(word[0]).includes(text))[0])
    if(removeWord) {
      this.handlePoint(isPointUp);
      this.ngRedux.dispatch({type: REMOVE_WORD, index: removeWord[1]});
    }
  }

  handleGameLevel(): void {
    this.ngRedux.dispatch({type: LEVEL_UP});
  }

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.point$.subscribe(num => {
      this.point = num;
      num === 0 && this.ngRedux.dispatch({type: GAMEOVER, isOver: true})
    })
    this.playSpeed$.subscribe(speed => this.speed = speed);
   }
}
