import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { timer , Subscription, Observable } from 'rxjs';
import { select } from '@angular-redux/store';

import { GameService } from '../game.service';

import { Word } from '../word';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.css']
})
export class PlayAreaComponent implements OnInit {
  @Input() point: number;
  @Input() gameOver: boolean;
  @select() readonly words$: Observable<Word[]>;
  @Output() handlePoint =  new EventEmitter<boolean>();
  @Output() removeWord =  new EventEmitter<Word>()
  wordsSubscription: Subscription;

  changePoint(isPointUp: boolean): void {
    this.handlePoint.emit(isPointUp);
  }

  handleRemoveWord(word: Word): void {
    this.removeWord.emit(word);
  }

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.initPlay();
    const newWordTime = timer(1000, 2000);
    this.wordsSubscription = newWordTime.subscribe(() => this.gameService.getWords());
  }
  
  ngOnDestroy() {
    this.wordsSubscription.unsubscribe();
  }

}
