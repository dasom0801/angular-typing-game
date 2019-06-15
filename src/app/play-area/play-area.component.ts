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
  @select() readonly playSpeed$: Observable<number>;
  palySpeed: number;
  wordsSubscription: Subscription;
  speedSubscription: Subscription;
  gameOverSubscription: Subscription;
  timeSubscription: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.initPlay();
    this.speedSubscription = this.playSpeed$.subscribe(speed => this.palySpeed = speed);

    const newWordTime = timer(this.palySpeed, this.palySpeed);
    this.wordsSubscription = newWordTime.subscribe(() => this.gameService.getWords());

    const playTime = timer(1000, 1000);
    this.timeSubscription = playTime.subscribe(() => this.gameService.handleTme());

    this.gameOverSubscription = this.gameOver$.subscribe(gameover => {
      if(gameover) { 
        this.wordsSubscription.unsubscribe();
        this.timeSubscription.unsubscribe();
      }
    })
  }
  
  ngOnDestroy() {
    this.wordsSubscription.unsubscribe();
    this.speedSubscription.unsubscribe();
    this.gameOverSubscription.unsubscribe();
    this.timeSubscription.unsubscribe();
  }
}
