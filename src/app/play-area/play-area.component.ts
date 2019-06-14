import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { timer , Subscription } from 'rxjs';
import { PlayService} from '../play.service';
import { Word } from '../word';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.css']
})
export class PlayAreaComponent implements OnInit {
  @Input() point: number;
  @Input() gameOver: boolean;
  @Output() handlePoint =  new EventEmitter<boolean>();
  words: Word[];
  subscription: Subscription;

  getWords(): void {
    this.playService.getWords().subscribe(word => {
      if (this.gameOver) {
        this.subscription.unsubscribe();
      }
      if (this.words.indexOf(word) === -1) {
        word.left = Math.floor((Math.random()*650));
        word.top = 0;
        this.words.push(word);
      }
    });
  }

  removeWord(word:Word): void {
    const index = this.words.indexOf(word);
    this.words.splice(index, 1);
  }

  changePoint(isPointUp: boolean): void {
    this.handlePoint.emit(isPointUp);
  }

  constructor(private playService: PlayService) { }

  ngOnInit() {
    this.words = [];
    const newWordTime = timer(1000, 2000);
    this.subscription = newWordTime.subscribe(() => this.getWords());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
