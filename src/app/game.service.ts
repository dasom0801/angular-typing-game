import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { GET_PATH } from './actions'

import { WORDS } from './word-list';
import { Word } from "./word";
@Injectable({
  providedIn: 'root'
})

export class GameService {
  getPath(path: string): void{
    this.ngRedux.dispatch({type: GET_PATH, isPlay: path === '/play'})
  }

  getWords(): Observable<Word> {
    const index = Math.floor((Math.random()*WORDS.length));
    return of(WORDS[index]);
  }

  constructor(private ngRedux: NgRedux<IAppState>) { }
}
