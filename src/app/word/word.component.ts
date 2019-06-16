import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { timer , Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

import { GameService } from '../game.service';

import { Word } from "../word";

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  @Input() word: Word;
  @Input() speed: number;
  @select() readonly gameOver$: Observable<boolean>;
  gameOver: boolean;
  newWordSubscription: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    const newWordTime = timer(this.speed, this.speed/2);
    this.gameOver$.subscribe(value => this.gameOver = value);
    this.newWordSubscription = newWordTime.subscribe(() =>{ 
      if(this.gameOver) {
        this.newWordSubscription.unsubscribe();
      }
      if(this.word.top < 500) {
        this.word.top = this.word.top + 25
      } else {
        this.gameService.removeWord(this.word.text, false, 1);
      }
    });
  }

  ngOnDestroy() {
    this.newWordSubscription.unsubscribe();
  }
}
