import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { timer , Subscription } from 'rxjs';
import { PlayService} from '../play.service';

import { Word } from "../word";

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  @Input() word: Word
  @Output() removeWord =  new EventEmitter<Word>();
  @Output() changePoint =  new EventEmitter<boolean>();
  
  subscription: Subscription;
  constructor(private playService: PlayService) { }

  ngOnInit() {
    const newWordTime = timer(1000, 1000);
    this.subscription = newWordTime.subscribe(() =>{ 
      if(this.word.top < 450) {
        this.word.top = this.word.top + 15
      } else {
        this.removeWord.emit(this.word);
        this.changePoint.emit(false);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
