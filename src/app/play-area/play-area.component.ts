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
  @select() readonly words$: Observable<Word[]>;
  @select() readonly gameOver$: Observable<boolean>;
  wordsSubscription: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.initPlay();
    const newWordTime = timer(1000, 2000);
    this.wordsSubscription = newWordTime.subscribe(() => this.gameService.getWords());
    this.gameOver$.subscribe(gameover => {
      if(gameover) {
        this.wordsSubscription.unsubscribe();
      }
    })
  }
  
  ngOnDestroy() {
    this.wordsSubscription.unsubscribe();
  }

}
