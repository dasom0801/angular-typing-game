import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map, first } from 'rxjs/operators';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './store';
import { GET_PATH, GET_WORDS, INIT_PLAY, REMOVE_WORD, HANDLE_POINT, GAMEOVER, LEVEL_UP, COUNT_TIME, SET_RANK } from './actions'

import { WORDS } from './word-list';
import { Word } from './word';
import { Ranking } from './ranking';
@Injectable({
  providedIn: 'root'
})

export class GameService {
  @select() words$: Observable<Word[]>;
  @select() point$: Observable<number>;
  @select() playSpeed$: Observable<number>;
  @select() ranking$: Observable<Ranking[]>;
  @select() playTime$: Observable<number>;
  @select() gameOver$: Observable<boolean>;

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
    let point: number, speed: number, gameover: boolean;
    this.point$.subscribe(num => point = num);
    this.playSpeed$.subscribe(playSpeed => speed = playSpeed);
    this.gameOver$.subscribe(bool => gameover = bool);
    if (point === 0 && !gameover) {
      this.ngRedux.dispatch({type: GAMEOVER, isOver: true})
      this.setRank();
    }
    point !== 0 && this.ngRedux.dispatch({type: HANDLE_POINT, isPointUp});
    if (speed > 100 && isPointUp && point % 5 === 4 ) {
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

  handleTme(): void {
    this.ngRedux.dispatch({type: COUNT_TIME})
  }

  setRank(): void {
    const newRanking: Ranking = this.setNewRanking();
    let ranking: Ranking[];
    this.ranking$.subscribe(value => ranking = value);
    ranking.push(newRanking);
    ranking = ranking.sort((a, b) => b.playTime - a.playTime);
    ranking = ranking.length > 5 ? ranking.splice(0, 5) : ranking;
    this.ngRedux.dispatch({type: SET_RANK, ranking});
  }

  setNewRanking(): Ranking {
    let timeRecord: number;
    let displayTime: string;
    let d: Date = new Date();
    const MM = d.getMonth() + 1;
    const DD = d.getDate();
    const h = d.getHours();
    const hh = String(h).length === 2 ? h : `0${h}`;
    const m = d.getMinutes();
    const mm = String(m).length === 2 ? m : `0${m}`;
    this.playTime$.subscribe(playTime => timeRecord = playTime);

    const second = timeRecord % 60;
    const minute = Math.floor(timeRecord / 60);
    const sec = String(second).length === 2 ? String(second) : "0" + second;
    const min = String(minute).length === 2 ? String(minute) : "0" + minute;
    displayTime = `${min}:${sec}`;
    return { date:`${MM}/${DD} ${hh}:${mm}`, playTime: timeRecord, displayTime}
  }

  constructor(private ngRedux: NgRedux<IAppState>) {
   }
}
