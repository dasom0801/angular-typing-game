import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
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

  handlePoint(isPointUp: boolean, amount: number): void {
    let point: number, gameover: boolean;
    this.point$.subscribe(num => point = num);
    this.gameOver$.subscribe(bool => gameover = bool);
    if (point === 0 && !gameover) {
      this.ngRedux.dispatch({type: GAMEOVER, isOver: true})
    } else {
      this.ngRedux.dispatch({type: HANDLE_POINT, isPointUp, amount});
    }
  }

  removeWord(text: string, isPointUp: boolean, amount: number): void {
    let removeWord: (number|Word)[];
    this.words$.pipe(
      map(word => word.map((w, i) => [w, i])),
      first()
    ).subscribe(value => removeWord = value.filter(word => Object.values(word[0]).includes(text))[0])
    if(removeWord) {
      this.handlePoint(isPointUp, amount);
      this.ngRedux.dispatch({type: REMOVE_WORD, index: removeWord[1]});
    }
  }

  handleGameLevel(): void {
    let speed: number;
    this.playSpeed$.subscribe(playSpeed => speed = playSpeed);
    if (speed > 100) {
      this.ngRedux.dispatch({type: LEVEL_UP});
    }
  }

  handleTimeCount(): void {
    this.ngRedux.dispatch({type: COUNT_TIME})
  }

  setRankingList(user: string): void {
    const newRanking: Ranking = this.getNewRanking(user);
    const ranking: Ranking[] = this.getSortedRanking(newRanking);
    this.ngRedux.dispatch({type: SET_RANK, ranking});
  }

  getSortedRanking(newRanking: Ranking): Ranking[] {
    let ranking: Ranking[];
    this.ranking$.subscribe(value => ranking = value);
    ranking.push(newRanking);
    ranking = ranking.sort((a, b) => b.playTime - a.playTime);
    ranking = ranking.length > 5 ? ranking.splice(0, 5) : ranking;
    return ranking;
  }

  getNewRanking(user: string): Ranking {
    let timeRecord: number;
    this.playTime$.subscribe(playTime => timeRecord = playTime);
    const fometedDate = this.getFormatedDate();
    const displayTime = this.getDisplayTime(timeRecord);
    return { date: fometedDate, playTime: timeRecord, displayTime, user}
  }

  getFormatedDate(): string {
    const d: Date = new Date();
    const MM = d.getMonth() + 1;
    const DD = d.getDate();
    const h = d.getHours();
    const hh = String(h).length === 2 ? h : `0${h}`;
    const m = d.getMinutes();
    const mm = String(m).length === 2 ? m : `0${m}`;
    return `${MM}/${DD} ${hh}:${mm}`;
  }

  getDisplayTime(time: number): string {
    const second:number = time % 60;
    const minute:number = Math.floor(time / 60);
    const sec: string = String(second).length === 2 ? String(second) : "0" + second;
    const min: string = String(minute).length === 2 ? String(minute) : "0" + minute;
    const displayTime: string = `${min}:${sec}`;
    return displayTime;
  }

  constructor(private ngRedux: NgRedux<IAppState>) {
   }
}
