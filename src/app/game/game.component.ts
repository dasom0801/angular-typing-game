import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameService } from '../game.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';

import { Word } from '../word';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @select() readonly isPlay$: Observable<boolean>
  point: number;
  gameOver: boolean;
  words: Word[];

  handlePoint(isPointUp: boolean): void {
    isPointUp ? ++this.point : --this.point;
    if(this.point === 0) {
      this.gameOver = true;
    }
  }

  handleInput(event: any): void {
    const value = event.target.value;
    const word = this.words.filter(word => Object.values(word).includes(value))[0];
    event.target.value = '';
    if(word) {
      this.removeWord(word);
      this.handlePoint(true);
    }
  }

  removeWord(word:Word): void {
    const index = this.words.indexOf(word);
    this.words.splice(index, 1);
  }

  constructor(
    private router: Router, 
    private gameService: GameService, 
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.gameService.getPath(this.router.url);
    this.point = 5;
    this.gameOver = false;
    this.words = [];
  }
}
